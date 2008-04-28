require 'hpricot'

class TeethController < ApplicationController
  protect_from_forgery :except => [:scree]
  
  def scree
    t = Town.by_ikariam_id(1)
    lol = Hpricot(params[:ikariam_page])
    pp lol
    @scary = lol
    t.name = "Knothole"
  end
end
