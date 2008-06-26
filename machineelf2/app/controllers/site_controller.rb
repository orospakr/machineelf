class SiteController < ApplicationController

  layout 'standard'

  def welcome
    is_korps?
  end
end
