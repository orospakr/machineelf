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
end
