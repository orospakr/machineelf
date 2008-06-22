require File.dirname(__FILE__) + '/../spec_helper'

describe IslandsController do
  describe "route generation" do

    it "should map { :controller => 'islands', :action => 'index' } to /islands" do
      route_for(:controller => "islands", :action => "index").should == "/islands"
    end
  
    it "should map { :controller => 'islands', :action => 'new' } to /islands/new" do
      route_for(:controller => "islands", :action => "new").should == "/islands/new"
    end
  
    it "should map { :controller => 'islands', :action => 'show', :id => 1 } to /islands/1" do
      route_for(:controller => "islands", :action => "show", :id => 1).should == "/islands/1"
    end
  
    it "should map { :controller => 'islands', :action => 'edit', :id => 1 } to /islands/1/edit" do
      route_for(:controller => "islands", :action => "edit", :id => 1).should == "/islands/1/edit"
    end
  
    it "should map { :controller => 'islands', :action => 'update', :id => 1} to /islands/1" do
      route_for(:controller => "islands", :action => "update", :id => 1).should == "/islands/1"
    end
  
    it "should map { :controller => 'islands', :action => 'destroy', :id => 1} to /islands/1" do
      route_for(:controller => "islands", :action => "destroy", :id => 1).should == "/islands/1"
    end
  end

  describe "route recognition" do

    it "should generate params { :controller => 'islands', action => 'index' } from GET /islands" do
      params_from(:get, "/islands").should == {:controller => "islands", :action => "index"}
    end
  
    it "should generate params { :controller => 'islands', action => 'new' } from GET /islands/new" do
      params_from(:get, "/islands/new").should == {:controller => "islands", :action => "new"}
    end
  
    it "should generate params { :controller => 'islands', action => 'create' } from POST /islands" do
      params_from(:post, "/islands").should == {:controller => "islands", :action => "create"}
    end
  
    it "should generate params { :controller => 'islands', action => 'show', id => '1' } from GET /islands/1" do
      params_from(:get, "/islands/1").should == {:controller => "islands", :action => "show", :id => "1"}
    end
  
    it "should generate params { :controller => 'islands', action => 'edit', id => '1' } from GET /islands/1;edit" do
      params_from(:get, "/islands/1/edit").should == {:controller => "islands", :action => "edit", :id => "1"}
    end
  
    it "should generate params { :controller => 'islands', action => 'update', id => '1' } from PUT /islands/1" do
      params_from(:put, "/islands/1").should == {:controller => "islands", :action => "update", :id => "1"}
    end
  
    it "should generate params { :controller => 'islands', action => 'destroy', id => '1' } from DELETE /islands/1" do
      params_from(:delete, "/islands/1").should == {:controller => "islands", :action => "destroy", :id => "1"}
    end
  end
end