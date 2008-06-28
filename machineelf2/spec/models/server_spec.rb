require File.dirname(__FILE__) + '/../spec_helper'

describe Server do
  before(:each) do
    @server = Server.new
  end

  it "should not be valid" do
    @server.should_not be_valid
  end

  it "should be valid if it has a name" do
    @server.hostname = "s3.ikariam.org"
    @server.name = "Gamma"
    @server.should be_valid
  end

  # I don't ever create new ones here.  That's left up to admin intervention (so they can program
  # in the friendly human name, etc.)
  # also, I'm doing this one with mocks rather than fixtures (it seems to be the new best way
  # to do things)
  it "should find a server by hostname, but not return a new one if there is none available" do
    my_hostname = "s1.ikariam.org"
    server = mock_model(Server)
    Server.should_receive(:find).with(:first, :conditions => ['hostname = ?', my_hostname]).and_return(server)
    Server.by_hostname(my_hostname)
  end
end
