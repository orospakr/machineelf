class IslandsController < ApplicationController
  # GET /islands
  # GET /islands.xml

  layout 'standard'

  def index
    @islands = Island.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @islands }
      format.json { render :json => @islands.to_json }
    end
  end

  # GET /islands/1
  # GET /islands/1.xml
  def show
    @island = Island.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @island }
    end
  end

  # GET /islands/new
  # GET /islands/new.xml
  def new
    @island = Island.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @island }
    end
  end

  # GET /islands/1/edit
  def edit
    @island = Island.find(params[:id])
  end

  # POST /islands
  # POST /islands.xml
  def create
    @island = Island.new(params[:island])

    respond_to do |format|
      if @island.save
        flash[:notice] = 'Island was successfully created.'
        format.html { redirect_to(@island) }
        format.xml  { render :xml => @island, :status => :created, :location => @island }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @island.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /islands/1
  # PUT /islands/1.xml
  def update
    @island = Island.find(params[:id])

    respond_to do |format|
      if @island.update_attributes(params[:island])
        flash[:notice] = 'Island was successfully updated.'
        format.html { redirect_to(@island) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @island.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /islands/1
  # DELETE /islands/1.xml
  def destroy
    @island = Island.find(params[:id])
    @island.destroy

    respond_to do |format|
      format.html { redirect_to(islands_url) }
      format.xml  { head :ok }
    end
  end
end
