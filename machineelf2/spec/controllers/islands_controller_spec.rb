require File.dirname(__FILE__) + '/../spec_helper'

describe IslandsController do
  describe "handling GET /islands" do

    before(:each) do
      @island = mock_model(Island)
      Island.stub!(:find).and_return([@island])
    end
  
    def do_get
      get :index
    end
  
    it "should be successful" do
      do_get
      response.should be_success
    end

    it "should render index template" do
      do_get
      response.should render_template('index')
    end
  
    it "should find all islands" do
      Island.should_receive(:find).with(:all).and_return([@island])
      do_get
    end
  
    it "should assign the found islands for the view" do
      do_get
      assigns[:islands].should == [@island]
    end
  end

  describe "handling GET /islands.xml" do

    before(:each) do
      @island = mock_model(Island, :to_xml => "XML")
      Island.stub!(:find).and_return(@island)
    end
  
    def do_get
      @request.env["HTTP_ACCEPT"] = "application/xml"
      get :index
    end
  
    it "should be successful" do
      do_get
      response.should be_success
    end

    it "should find all islands" do
      Island.should_receive(:find).with(:all).and_return([@island])
      do_get
    end
  
    it "should render the found islands as xml" do
      @island.should_receive(:to_xml).and_return("XML")
      do_get
      response.body.should == "XML"
    end
  end

  describe "handling GET /islands/1" do

    before(:each) do
      @island = mock_model(Island)
      Island.stub!(:find).and_return(@island)
    end
  
    def do_get
      get :show, :id => "1"
    end

    it "should be successful" do
      do_get
      response.should be_success
    end
  
    it "should render show template" do
      do_get
      response.should render_template('show')
    end
  
    it "should find the island requested" do
      Island.should_receive(:find).with("1").and_return(@island)
      do_get
    end
  
    it "should assign the found island for the view" do
      do_get
      assigns[:island].should equal(@island)
    end
  end

  describe "handling GET /islands/1.xml" do

    before(:each) do
      @island = mock_model(Island, :to_xml => "XML")
      Island.stub!(:find).and_return(@island)
    end
  
    def do_get
      @request.env["HTTP_ACCEPT"] = "application/xml"
      get :show, :id => "1"
    end

    it "should be successful" do
      do_get
      response.should be_success
    end
  
    it "should find the island requested" do
      Island.should_receive(:find).with("1").and_return(@island)
      do_get
    end
  
    it "should render the found island as xml" do
      @island.should_receive(:to_xml).and_return("XML")
      do_get
      response.body.should == "XML"
    end
  end

  describe "handling GET /islands/new" do

    before(:each) do
      @island = mock_model(Island)
      Island.stub!(:new).and_return(@island)
    end
  
    def do_get
      get :new
    end

    it "should be successful" do
      do_get
      response.should be_success
    end
  
    it "should render new template" do
      do_get
      response.should render_template('new')
    end
  
    it "should create an new island" do
      Island.should_receive(:new).and_return(@island)
      do_get
    end
  
    it "should not save the new island" do
      @island.should_not_receive(:save)
      do_get
    end
  
    it "should assign the new island for the view" do
      do_get
      assigns[:island].should equal(@island)
    end
  end

  describe "handling GET /islands/1/edit" do

    before(:each) do
      @island = mock_model(Island)
      Island.stub!(:find).and_return(@island)
    end
  
    def do_get
      get :edit, :id => "1"
    end

    it "should be successful" do
      do_get
      response.should be_success
    end
  
    it "should render edit template" do
      do_get
      response.should render_template('edit')
    end
  
    it "should find the island requested" do
      Island.should_receive(:find).and_return(@island)
      do_get
    end
  
    it "should assign the found Island for the view" do
      do_get
      assigns[:island].should equal(@island)
    end
  end

  describe "handling POST /islands" do

    before(:each) do
      @island = mock_model(Island, :to_param => "1")
      Island.stub!(:new).and_return(@island)
    end
    
    describe "with successful save" do
  
      def do_post
        @island.should_receive(:save).and_return(true)
        post :create, :island => {}
      end
  
      it "should create a new island" do
        Island.should_receive(:new).with({}).and_return(@island)
        do_post
      end

      it "should redirect to the new island" do
        do_post
        response.should redirect_to(island_url("1"))
      end
      
    end
    
    describe "with failed save" do

      def do_post
        @island.should_receive(:save).and_return(false)
        post :create, :island => {}
      end
  
      it "should re-render 'new'" do
        do_post
        response.should render_template('new')
      end
      
    end
  end

  describe "handling PUT /islands/1" do

    before(:each) do
      @island = mock_model(Island, :to_param => "1")
      Island.stub!(:find).and_return(@island)
    end
    
    describe "with successful update" do

      def do_put
        @island.should_receive(:update_attributes).and_return(true)
        put :update, :id => "1"
      end

      it "should find the island requested" do
        Island.should_receive(:find).with("1").and_return(@island)
        do_put
      end

      it "should update the found island" do
        do_put
        assigns(:island).should equal(@island)
      end

      it "should assign the found island for the view" do
        do_put
        assigns(:island).should equal(@island)
      end

      it "should redirect to the island" do
        do_put
        response.should redirect_to(island_url("1"))
      end

    end
    
    describe "with failed update" do

      def do_put
        @island.should_receive(:update_attributes).and_return(false)
        put :update, :id => "1"
      end

      it "should re-render 'edit'" do
        do_put
        response.should render_template('edit')
      end

    end
  end

  describe "handling DELETE /islands/1" do

    before(:each) do
      @island = mock_model(Island, :destroy => true)
      Island.stub!(:find).and_return(@island)
    end
  
    def do_delete
      delete :destroy, :id => "1"
    end

    it "should find the island requested" do
      Island.should_receive(:find).with("1").and_return(@island)
      do_delete
    end
  
    it "should call destroy on the found island" do
      @island.should_receive(:destroy)
      do_delete
    end
  
    it "should redirect to the islands list" do
      do_delete
      response.should redirect_to(islands_url)
    end
  end
end