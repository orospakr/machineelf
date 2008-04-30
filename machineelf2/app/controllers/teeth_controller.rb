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
    lol = Hpricot(params[:ikariam_page])
    t = Town.by_ikariam_id(find_arg_by_name(:id))
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
    
    # @scary = url_args.to_s
    
#    url_args.each do |arg|
#      spl = 
#      n = spl[0]
#      val = spl[1]
#      if n == "view":
#        parse_view_city(val.intern)
#      end
#    end
  
    
    # pp lol
    
    
    @scary = params[:ikariam_url]
    
    
  end
end
