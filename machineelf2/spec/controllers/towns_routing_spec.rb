require File.dirname(__FILE__) + '/../spec_helper'

describe TownsController do
  describe "route generation" do

    it "should map { :controller => 'towns', :action => 'index' } to /towns" do
      route_for(:controller => "towns", :action => "index").should == "/towns"
    end
  
    it "should map { :controller => 'towns', :action => 'new' } to /towns/new" do
      route_for(:controller => "towns", :action => "new").should == "/towns/new"
    end
  
    it "should map { :controller => 'towns', :action => 'show', :id => 1 } to /towns/1" do
      route_for(:controller => "towns", :action => "show", :id => 1).should == "/towns/1"
    end
  
    it "should map { :controller => 'towns', :action => 'edit', :id => 1 } to /towns/1/edit" do
      route_for(:controller => "towns", :action => "edit", :id => 1).should == "/towns/1/edit"
    end
  
    it "should map { :controller => 'towns', :action => 'update', :id => 1} to /towns/1" do
      route_for(:controller => "towns", :action => "update", :id => 1).should == "/towns/1"
    end
  
    it "should map { :controller => 'towns', :action => 'destroy', :id => 1} to /towns/1" do
      route_for(:controller => "towns", :action => "destroy", :id => 1).should == "/towns/1"
    end
  end

  describe "route recognition" do

    it "should generate params { :controller => 'towns', action => 'index' } from GET /towns" do
      params_from(:get, "/towns").should == {:controller => "towns", :action => "index"}
    end
  
    it "should generate params { :controller => 'towns', action => 'new' } from GET /towns/new" do
      params_from(:get, "/towns/new").should == {:controller => "towns", :action => "new"}
    end
  
    it "should generate params { :controller => 'towns', action => 'create' } from POST /towns" do
      params_from(:post, "/towns").should == {:controller => "towns", :action => "create"}
    end
  
    it "should generate params { :controller => 'towns', action => 'show', id => '1' } from GET /towns/1" do
      params_from(:get, "/towns/1").should == {:controller => "towns", :action => "show", :id => "1"}
    end
  
    it "should generate params { :controller => 'towns', action => 'edit', id => '1' } from GET /towns/1;edit" do
      params_from(:get, "/towns/1/edit").should == {:controller => "towns", :action => "edit", :id => "1"}
    end
  
    it "should generate params { :controller => 'towns', action => 'update', id => '1' } from PUT /towns/1" do
      params_from(:put, "/towns/1").should == {:controller => "towns", :action => "update", :id => "1"}
    end
  
    it "should generate params { :controller => 'towns', action => 'destroy', id => '1' } from DELETE /towns/1" do
      params_from(:delete, "/towns/1").should == {:controller => "towns", :action => "destroy", :id => "1"}
    end
  end
end