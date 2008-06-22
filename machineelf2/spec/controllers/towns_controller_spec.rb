require File.dirname(__FILE__) + '/../spec_helper'

describe TownsController do
  describe "handling GET /towns" do

    before(:each) do
      @town = mock_model(Town)
      Town.stub!(:find).and_return([@town])
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

    it "should find all towns" do
      Town.should_receive(:find).with(:all).and_return([@town])
      do_get
    end

    it "should assign the found towns for the view" do
      do_get
      assigns[:towns].should == [@town]
    end
  end

  describe "handling GET /towns.xml" do

    before(:each) do
      @town = mock_model(Town, :to_xml => "XML")
      Town.stub!(:find).and_return(@town)
    end

    def do_get
      @request.env["HTTP_ACCEPT"] = "application/xml"
      get :index
    end

    it "should be successful" do
      do_get
      response.should be_success
    end

    it "should find all towns" do
      Town.should_receive(:find).with(:all).and_return([@town])
      do_get
    end

    it "should render the found towns as xml" do
      @town.should_receive(:to_xml).and_return("XML")
      do_get
      response.body.should == "XML"
    end
  end

  describe "handling GET /towns.json" do

    before(:each) do
      @town = mock_model(Town, :to_js => "loljson")
      Town.stub!(:find).and_return(@town)
    end

    def do_get
      @request.env["HTTP_ACCEPT"] = "application/javascript"
      get :index
    end

    it "should be successful" do
      do_get
      response.should be_success
    end

    it "should find all towns" do
      Town.should_receive(:find).with(:all).and_return([@town])
      do_get
    end

    it "should render the found towns as json" do
      @town.should_receive(:to_json).and_return("loljson")
      do_get
      if response.body == @town
        print "WTFFFF"
      end
      response.body.methods.sort.each do |uiop|
#        print "#{uiop}\n"
      end
      "loljson".should == response.body
    end
  end

  describe "handling GET /towns/1" do

    before(:each) do
      @town = mock_model(Town)
      Town.stub!(:find).and_return(@town)
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

    it "should find the town requested" do
      Town.should_receive(:find).with("1").and_return(@town)
      do_get
    end

    it "should assign the found town for the view" do
      do_get
      assigns[:town].should equal(@town)
    end
  end

  describe "handling GET /towns/1.xml" do

    before(:each) do
      @town = mock_model(Town, :to_xml => "XML")
      Town.stub!(:find).and_return(@town)
    end

    def do_get
      @request.env["HTTP_ACCEPT"] = "application/xml"
      get :show, :id => "1"
    end

    it "should be successful" do
      do_get
      response.should be_success
    end

    it "should find the town requested" do
      Town.should_receive(:find).with("1").and_return(@town)
      do_get
    end

    it "should render the found town as xml" do
      @town.should_receive(:to_xml).and_return("XML")
      do_get
      response.body.should == "XML"
    end
  end

  describe "handling GET /towns/new" do

    before(:each) do
      @town = mock_model(Town)
      Town.stub!(:new).and_return(@town)
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

    it "should create an new town" do
      Town.should_receive(:new).and_return(@town)
      do_get
    end

    it "should not save the new town" do
      @town.should_not_receive(:save)
      do_get
    end

    it "should assign the new town for the view" do
      do_get
      assigns[:town].should equal(@town)
    end
  end

  describe "handling GET /towns/1/edit" do

    before(:each) do
      @town = mock_model(Town)
      Town.stub!(:find).and_return(@town)
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

    it "should find the town requested" do
      Town.should_receive(:find).and_return(@town)
      do_get
    end

    it "should assign the found Town for the view" do
      do_get
      assigns[:town].should equal(@town)
    end
  end

  describe "handling POST /towns" do

    before(:each) do
      @town = mock_model(Town, :to_param => "1")
      Town.stub!(:new).and_return(@town)
    end

    describe "with successful save" do

      def do_post
        @town.should_receive(:save).and_return(true)
        post :create, :town => {}
      end

      it "should create a new town" do
        Town.should_receive(:new).with({}).and_return(@town)
        do_post
      end

      it "should redirect to the new town" do
        do_post
        response.should redirect_to(town_url("1"))
      end

    end

    describe "with failed save" do

      def do_post
        @town.should_receive(:save).and_return(false)
        post :create, :town => {}
      end

      it "should re-render 'new'" do
        do_post
        response.should render_template('new')
      end

    end
  end

  describe "handling PUT /towns/1" do

    before(:each) do
      @town = mock_model(Town, :to_param => "1")
      Town.stub!(:find).and_return(@town)
    end

    describe "with successful update" do

      def do_put
        @town.should_receive(:update_attributes).and_return(true)
        put :update, :id => "1"
      end

      it "should find the town requested" do
        Town.should_receive(:find).with("1").and_return(@town)
        do_put
      end

      it "should update the found town" do
        do_put
        assigns(:town).should equal(@town)
      end

      it "should assign the found town for the view" do
        do_put
        assigns(:town).should equal(@town)
      end

      it "should redirect to the town" do
        do_put
        response.should redirect_to(town_url("1"))
      end

    end

    describe "with failed update" do

      def do_put
        @town.should_receive(:update_attributes).and_return(false)
        put :update, :id => "1"
      end

      it "should re-render 'edit'" do
        do_put
        response.should render_template('edit')
      end

    end
  end

  describe "handling DELETE /towns/1" do

    before(:each) do
      @town = mock_model(Town, :destroy => true)
      Town.stub!(:find).and_return(@town)
    end

    def do_delete
      delete :destroy, :id => "1"
    end

    it "should find the town requested" do
      Town.should_receive(:find).with("1").and_return(@town)
      do_delete
    end

    it "should call destroy on the found town" do
      @town.should_receive(:destroy)
      do_delete
    end

    it "should redirect to the towns list" do
      do_delete
      response.should redirect_to(towns_url)
    end
  end
end
