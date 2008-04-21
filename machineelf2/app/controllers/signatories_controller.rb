class SignatoriesController < ApplicationController
  # GET /signatories
  # GET /signatories.xml
  def index
    @signatories = Signatory.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @signatories }
    end
  end

  # GET /signatories/1
  # GET /signatories/1.xml
  def show
    @signatory = Signatory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @signatory }
    end
  end

  # GET /signatories/new
  # GET /signatories/new.xml
  def new
    @signatory = Signatory.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @signatory }
    end
  end

  # GET /signatories/1/edit
  def edit
    @signatory = Signatory.find(params[:id])
  end

  # POST /signatories
  # POST /signatories.xml
  def create
    @signatory = Signatory.new(params[:signatory])

    respond_to do |format|
      if @signatory.save
        flash[:notice] = 'Signatory was successfully created.'
        format.html { redirect_to(@signatory) }
        format.xml  { render :xml => @signatory, :status => :created, :location => @signatory }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @signatory.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /signatories/1
  # PUT /signatories/1.xml
  def update
    @signatory = Signatory.find(params[:id])

    respond_to do |format|
      if @signatory.update_attributes(params[:signatory])
        flash[:notice] = 'Signatory was successfully updated.'
        format.html { redirect_to(@signatory) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @signatory.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /signatories/1
  # DELETE /signatories/1.xml
  def destroy
    @signatory = Signatory.find(params[:id])
    @signatory.destroy

    respond_to do |format|
      format.html { redirect_to(signatories_url) }
      format.xml  { head :ok }
    end
  end
end
