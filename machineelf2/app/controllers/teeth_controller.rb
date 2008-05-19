require 'hpricot'

class TeethController < ApplicationController
  protect_from_forgery :except => [:scree]

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
    logger.error("Am I here at least?")
    #print(params[:ikariam_page])
    lol = Hpricot(params[:ikariam_page])
    t = Town.by_ikariam_id(find_arg_by_name(:id).to_i)

    #island_url = lol.at("//a[@class='island'")['href']
    breadcrumbs = lol.at('div#breadcrumbs')


    the_as = breadcrumbs/('a')
    a_with_island_id = the_as[1]

    island_name_and_coordinates = a_with_island_id.inner_html
    island_name = island_name_and_coordinates.split('[')[0]
    island_url = a_with_island_id['href']

    pos = island_url.index('id=')
    island_id = island_url[pos+3..-1].to_i
    # load island props
    i = Island.by_ikariam_id(island_id)
    i.name = island_name

    #i.name = "Issayos"
    i.save!

    # load town props
    t.island = i

    b = lol.at('body#city')
    city = b.at("//span[@class='city'")
    t.name = city.inner_html
    t.save!
  end

  def scree
    begin
      view_type = find_arg_by_name(:view)
      parse_view(view_type.intern)
     rescue ArgumentError => detail
       logger.error "missing arguments: #{detail.to_s}"
     end

    @scary = params[:ikariam_url]
  end
end
