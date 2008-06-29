require File.dirname(__FILE__) + '/../../spec_helper'

describe "/servers/new.html.erb" do
  include ServersHelper

  before(:each) do
    @server = mock_model(Server)
    @server.stub!(:new_record?).and_return(true)
    @server.stub!(:hostname).and_return("MyString")
    @server.stub!(:name).and_return("MyString")
    assigns[:server] = @server
  end

  it "should render new form" do
    render "/servers/new.html.erb"

    response.should have_tag("form[action=?][method=post]", servers_path) do
      with_tag("input#server_hostname[name=?]", "server[hostname]")
    end
  end
end


