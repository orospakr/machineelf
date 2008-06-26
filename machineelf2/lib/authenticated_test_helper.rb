module AuthenticatedTestHelper
  # Sets the current user in the session from the user fixtures.
  def login_as(user)
    @request.session[:user_id] = user ? users(user).id : nil
  end

  def authorize_as(user)
    @request.env["HTTP_AUTHORIZATION"] = user ? ActionController::HttpAuthentication::Basic.encode_credentials(users(user).login, 'test') : nil
  end

  def korps_person_logged_in
    current_user = mock_model User
    current_user.stub!(:is_korps).and_return(true)
    current_user.stub!(:state).and_return('active')
    controller.should_receive(:current_user).once.and_return(current_user)
  end
end
