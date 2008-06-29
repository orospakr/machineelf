require File.dirname(__FILE__) + '/../../spec_helper'

describe "/servers/edit.html.erb" do
  include ServersHelper

  before do
    @server = mock_model(Server)
    @server.stub!(:hostname).and_return("MyString")
    @server.stub!(:name).and_return("MyString")
    assigns[:server] = @server
  end

  it "should render edit form" do
    render "/servers/edit.html.erb"

    response.should have_tag("form[action=#{server_path(@server)}][method=post]") do
      with_tag('input#server_hostname[name=?]', "server[hostname]")
    end
  end
end


