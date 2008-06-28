# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => '553f2db4acaba7713f6ee860a418120d'

  include AuthenticatedSystem

  # this is kind of crappy, it should be using states rather than lame-o booleans I added to the model
  def is_korps?
    luser = current_user
    if luser.nil?
      flash[:error] = "Snooping as usual, I see!  (you need to be logged in to see this page)"
      access_denied
      return
    end
    if not luser.state == "active"
      flash[:error] = "Your account has not been activated yet.  Check your email."
    end
    if not luser.is_korps
      flash[:error] = "Your account hasn't been approved yet."
      access_denied
    end
  end

  # TODO is_admin? as well, that checks both is_admin and is_korps
end
