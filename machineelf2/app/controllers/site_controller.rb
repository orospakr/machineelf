class SiteController < ApplicationController

  layout 'standard'

  def welcome
    is_korps?
  end

  def am_i_logged_in
    user = current_user
    if user.nil?
      render :text => "NO"
    elsif user.is_korps and user.state == "active"
      render :text => "YES #{user.id}"
    elsif user.state == "pending"
      render :text => "ACTIVATION PENDING"
    elsif
      render :text => "NOT APPROVED"
    end
  end

  def who_am_i
    user = current_user
  end
end
