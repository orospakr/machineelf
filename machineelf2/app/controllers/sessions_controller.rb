# This controller handles the login/logout function of the site.
class SessionsController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
#  include AuthenticatedSystem

  layout 'standard'

  # render new.rhtml
  def new
  end

  def create
    self.current_user = User.authenticate(params[:login], params[:password])
    if logged_in?
      if params[:remember_me] == "1"
        current_user.remember_me unless current_user.remember_token?
        cookies[:auth_token] = { :value => self.current_user.remember_token , :expires => self.current_user.remember_token_expires_at }
      end
      redirect_back_or_default('/')
      flash[:notice] = "Logged in successfully"
    else
      render :action => 'new'
    end
  end

  def destroy
    self.current_user.forget_me if logged_in?
    cookies.delete :auth_token
    reset_session
    flash[:notice] = "You have been logged out."
    redirect_back_or_default('/')
  end

  # displays players that the ogged in player looks at, along with the associated towns

#  @towns.to_json({ :methods => [:current_stats, :url, :public_url]}) }

  def subscriptions
    respond_to do |format|
      format.json { render :json => self.current_user.players.to_json({ :include => { :towns => { :methods => [:current_stats, :url, :public_url]}  } })}
      format.xml { render :xml => self.current_user.players.to_xml({ :include => :towns }) }
    end
  end
end
