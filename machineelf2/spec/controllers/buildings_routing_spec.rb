require File.dirname(__FILE__) + '/../spec_helper'

describe BuildingsController do
  describe "route generation" do

    it "should map { :controller => 'buildings', :action => 'index' } to /buildings" do
      route_for(:controller => "buildings", :action => "index").should == "/buildings"
    end
  
    it "should map { :controller => 'buildings', :action => 'new' } to /buildings/new" do
      route_for(:controller => "buildings", :action => "new").should == "/buildings/new"
    end
  
    it "should map { :controller => 'buildings', :action => 'show', :id => 1 } to /buildings/1" do
      route_for(:controller => "buildings", :action => "show", :id => 1).should == "/buildings/1"
    end
  
    it "should map { :controller => 'buildings', :action => 'edit', :id => 1 } to /buildings/1/edit" do
      route_for(:controller => "buildings", :action => "edit", :id => 1).should == "/buildings/1/edit"
    end
  
    it "should map { :controller => 'buildings', :action => 'update', :id => 1} to /buildings/1" do
      route_for(:controller => "buildings", :action => "update", :id => 1).should == "/buildings/1"
    end
  
    it "should map { :controller => 'buildings', :action => 'destroy', :id => 1} to /buildings/1" do
      route_for(:controller => "buildings", :action => "destroy", :id => 1).should == "/buildings/1"
    end
  end

  describe "route recognition" do

    it "should generate params { :controller => 'buildings', action => 'index' } from GET /buildings" do
      params_from(:get, "/buildings").should == {:controller => "buildings", :action => "index"}
    end
  
    it "should generate params { :controller => 'buildings', action => 'new' } from GET /buildings/new" do
      params_from(:get, "/buildings/new").should == {:controller => "buildings", :action => "new"}
    end
  
    it "should generate params { :controller => 'buildings', action => 'create' } from POST /buildings" do
      params_from(:post, "/buildings").should == {:controller => "buildings", :action => "create"}
    end
  
    it "should generate params { :controller => 'buildings', action => 'show', id => '1' } from GET /buildings/1" do
      params_from(:get, "/buildings/1").should == {:controller => "buildings", :action => "show", :id => "1"}
    end
  
    it "should generate params { :controller => 'buildings', action => 'edit', id => '1' } from GET /buildings/1;edit" do
      params_from(:get, "/buildings/1/edit").should == {:controller => "buildings", :action => "edit", :id => "1"}
    end
  
    it "should generate params { :controller => 'buildings', action => 'update', id => '1' } from PUT /buildings/1" do
      params_from(:put, "/buildings/1").should == {:controller => "buildings", :action => "update", :id => "1"}
    end
  
    it "should generate params { :controller => 'buildings', action => 'destroy', id => '1' } from DELETE /buildings/1" do
      params_from(:delete, "/buildings/1").should == {:controller => "buildings", :action => "destroy", :id => "1"}
    end
  end
end