require File.dirname(__FILE__) + '/../../spec_helper'

describe "/servers/show.html.erb" do
  include ServersHelper
  
  before(:each) do
    @server = mock_model(Server)
    @server.stub!(:hostname).and_return("MyString")

    assigns[:server] = @server
  end

  it "should render attributes in <p>" do
    render "/servers/show.html.erb"
    response.should have_text(/MyString/)
  end
end

