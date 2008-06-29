require File.dirname(__FILE__) + '/../spec_helper'

describe SiteController do

  #Delete this example and add some real ones
  it "should use SiteController" do
    controller.should be_an_instance_of(SiteController)
  end

  describe "should answer am_i_logged_in with" do
    def do_get
      get :am_i_logged_in
    end

    it "YES when logged in" do
      korps_person_logged_in
      do_get
      response.body.should == "YES #{@current_user.id}"
    end

    it "NO when not logged in" do
      do_get
      response.body.should == "NO"
    end

    it "NOT APPROVED when not korps" do
      current_user = mock_model User
      current_user.should_receive(:is_korps).and_return(false)
      current_user.stub!(:state).and_return('active')
      controller.should_receive(:current_user).once.and_return(current_user)
      do_get
      response.body.should == "NOT APPROVED"
    end

    it "ACTIVATION PENDING" do
      current_user = mock_model User
      current_user.should_receive(:is_korps).and_return(true)
      current_user.stub!(:state).and_return('pending')
      controller.should_receive(:current_user).once.and_return(current_user)
      do_get
      response.body.should == "ACTIVATION PENDING"
    end
  end
end
