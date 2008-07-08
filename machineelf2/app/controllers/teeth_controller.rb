require 'hpricot'

require 'uri'

class TeethController < ApplicationController
  protect_from_forgery :except => [:scree]

  before_filter :is_korps?

  def parse_number(num)
    magnitude = 1
    if num[-1].chr == 'k'
      magnitude = 1000
    end
    stripped = num.gsub(/\,/, '')
    stripped = num.gsub(/ /, '')
    stripped = num.split(",").join("")
    return stripped.to_i * magnitude
  end

  def find_arg_by_name(arg_name)
    raise ArgumentError.new if params[:ikariam_url].index('?').nil?
    url_argstring = params[:ikariam_url].split('?')[1]
    url_args = url_argstring.split('&')
    url_args.each do |param|
      p "Processing &-delimited args list\n"
      spl = param.split('=')
      name = spl[0]
      val = spl[1]
      if name == arg_name.to_s
        p "Processing one with arg_name #{arg_name}\n"
        return val
      end
    end
    raise ArgumentError.new
  end

  def parse_view(view_type)
    if view_type == :city
      parse_city()
    end
  end

  def get_server
    return Server.by_hostname(URI.parse(params[:ikariam_url]).host)
  end

  def parse_city
    parsed_contents = Hpricot(params[:ikariam_page])

    breadcrumbs = parsed_contents.at('div#breadcrumbs')
    the_as = breadcrumbs/('a')
    a_with_island_id = the_as[1]
    island_name_and_coordinates = a_with_island_id.inner_html
    island_name = island_name_and_coordinates.split('[')[0]
    island_url = a_with_island_id['href']
    pos = island_url.index('id=')
    island_id = island_url[pos+3..-1].to_i

    print island_url
    s = get_server

    i = Island.by_ikariam_id(island_id)
    i.name = island_name
    i.server = s
    i.save!

    b = parsed_contents.at('body#city')
    city = b.at("//span[@class='city']")

    t = Town.by_ikariam_id(find_arg_by_name(:id).to_i)
    t.island = i
    t.server = s
    t.name = city.inner_html
    t.save!

    # we can safely assume here that the owner displayed on this page is also
    # the one logged in, since no other player can look at someone else's
    # view_city page.  WRONG -- if you spy out a town, this isn't true

#    owner = t.player
    login_name = parsed_contents.at("//li[@class='owner']").inner_html.split()[-1].split('>')[-1]
    owner = Player.by_ikariam_login(s, login_name)

    # broken window!  there is no unit test for the nil case.
    if not owner.nil?
      owner.server = s
      owner.save!
    end

    # OK, now that we've ensured that the Town and Island
    # records are up to date, we can now create a TownEvent
    # and an IslandEvent to represent the temporal data we
    # have here.

    building_names = Building.building_types

    t_event = TownEvent.new
    t_event.town = t

    locations_list = parsed_contents.at('ul#locations')
#    building_elems = locations_list/'a'
    building_elems = locations_list/'li'
#    pp building_elems
    building_elems.each do |aref|
      b = aref.at 'a'
      title_string = b['title']
      bits = title_string.split(' ')
      level_number = (bits[-1]).to_i

      building_name = ''
      bits[0..-3].each do |word|
        building_name += word + ' '
      end

      building_sym = building_names[building_name[0..-2]] # slice is to get rid of extra space
      if building_sym.nil?
        next
      end

     # print "BUILDING: #{building_sym}\n"
     # next

      #t_event.send("#{building.to_s}=", level_number)
      building = t.building_by_flavour(building_sym.to_s)
      time_elem = aref.at("//div[@class='timetofinish']")
      if !time_elem.nil?
        upgrade_finish_time = Town.remaining_finished_at(time_elem.at('#cityCountdown').inner_html)
        building.ready_at = upgrade_finish_time
      end

      building.save!
      building.write_event(level_number)
    end
    t_event.save!
  end

  def scree
    if params[:ikariam_url].nil? or params[:ikariam_page].nil?
      return
    end
    scree_contents
    scree_menu
  end

  def scree_contents
    begin
      view_type = find_arg_by_name(:view)
      parse_view(view_type.intern)
     rescue ArgumentError => detail
       logger.error "missing arguments: #{detail.to_s}"
     end
    @scary = params[:ikariam_url]
  end

  def scree_menu
    my_town = nil
    server = get_server
    page = Hpricot(params[:ikariam_page])
    city_select = page.at('#citySelect')
    if city_select.nil?
      return
    end
    city_options = city_select/"option.avatarCities"
    for city in city_options
      if (city['selected'] == 'selected')
        my_town = Town.by_ikariam_id(city['value'].to_i)
        island_coordinates = city.inner_html.split(']')[0]
        town_name = city.inner_html.split(']')[1][1..-1]
        if !my_town.island.nil?
          my_town.island.x = island_coordinates.split('[')[1].split(':')[0].to_i
          my_town.island.y = island_coordinates.split('[')[1].split(':')[1].split(']')[0].to_i
          my_town.island.save!
        end
        my_town.name = town_name
      end
    end

    owner = my_town.player

    # this is also a broken window, as it does not have the nil case checked
    if !owner.nil?
      owner.server = server
      owner.save!

      owner_event = PlayerEvent.new
      owner_event.player = owner
      owner_event.available_ships = parse_number(page.at('span#value_transAvail').inner_html)
      owner_event.ships = parse_number(page.at('span#value_transSum').inner_html.split('(')[1].split(')')[0])
      owner_event.gold = parse_number(page.at('span#value_gold').inner_html)
      owner_event.save!
    end

    my_town.server = server

    tevent = TownEvent.new
    tevent.town = my_town

    # the standard resources...
    [:wood, :wine, :marble, :crystal, :sulphur].each do |rez|
      field_name = rez
      if field_name == :sulphur
        field_name = :sulfur # durr, the Ikariam devs can't spell!
      end
      val = parse_number(page.at("span#value_#{field_name.to_s}").inner_html)
      tevent.send(rez.to_s + '=', val)
    end

    # the population field...
    pop_field = page.at("span#value_inhabitants").inner_html
    pop_fields = pop_field.split('(')
    tevent.available_mans = parse_number(pop_fields[0])
    tevent.population = parse_number(pop_fields[1].split(')')[0])
    tevent.save!
  end
end
