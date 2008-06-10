require 'hpricot'

class TeethController < ApplicationController
  protect_from_forgery :except => [:scree]

  def parse_number(num)
      stripped = num.gsub(/\,/, '')
      stripped = num.gsub(/ /, '')
      stripped = num.split(",").join("")
      return stripped.to_i
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

    i = Island.by_ikariam_id(island_id)
    i.name = island_name
    i.save!

    b = parsed_contents.at('body#city')
    city = b.at("//span[@class='city'")

    t = Town.by_ikariam_id(find_arg_by_name(:id).to_i)
    t.island = i
    t.name = city.inner_html
    t.save!

    # OK, now that we've ensured that the Town and Island
    # records are up to date, we can now create a TownEvent
    # and an IslandEvent to represent the temporarl data we
    # have here.

  end

  def scree
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
    page = Hpricot(params[:ikariam_page])
    city_select = page.at('#citySelect')
    if city_select.nil?
      return
    end
    city_options = city_select/"option.avatarCities"
    for city in city_options
      if (city['selected'] == 'selected')
        my_town = Town.by_ikariam_id(city['value'].to_i)
        my_town.name = city.innerHTML
      end
    end

    tevent = TownEvent.new
    tevent.town = my_town

#    tevent.wood = parse_number(parsed_contents.at('span#value_wood').inner_html)
#    tevent.wine = parse_number(parsed)
    [:wood, :wine, :marble, :crystal, :sulphur].each do |rez|
      field_name = rez
      if field_name == :sulphur
        field_name = :sulfur # durr, the Ikariam devs can't spell!
      end
      val = parse_number(page.at("span#value_#{field_name.to_s}").inner_html)
      tevent.send(rez.to_s + '=', val)
    end

    tevent.save!
  end
end
