  def get_bzr_revno
    f = File.new(RAILS_ROOT + "/public/toolbars/CURRENT_TOOLBAR_REVNO", "r")
    revno = f.read.strip
  end


class SiteController < ApplicationController

  layout 'standard'

  def welcome
    is_korps?
  end

  def toolbar_version
    is_korps?
    render :text => get_bzr_revno
  end

  def toolbar_updates
    render :text => "BUTT\n\n\n\n"
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
