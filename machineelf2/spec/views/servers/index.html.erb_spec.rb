require File.dirname(__FILE__) + '/../../spec_helper'

describe "/servers/index.html.erb" do
  include ServersHelper
  
  before(:each) do
    server_98 = mock_model(Server)
    server_98.should_receive(:hostname).and_return("MyString")
    server_99 = mock_model(Server)
    server_99.should_receive(:hostname).and_return("MyString")

    assigns[:servers] = [server_98, server_99]
  end

  it "should render list of servers" do
    render "/servers/index.html.erb"
    response.should have_tag("tr>td", "MyString", 2)
  end
end

