class VinesController < ApplicationController

  def create
  end

  def edit
    if session[:current_vine]
      @currentVine = Vine.find(session[:current_vine])
    end
  end

  def update 
  end

  def search
    if (params[:title] ||
        params[:author] ||
        params[:tags] ||
        params[:dialogue]) 
      @vines = Vine.search(params[:title], params[:author], params[:tags], params[:dialogue])
      respond_to do |format|
        format.html { render json: @vines.to_json }
      end
    end
  end

  def add 
  end

  def view
    if params[:query].blank?
      redirect_to "/vines/search"
      return
    end
    @vines = Vine.search(params[:query])
  end

  def selection 
    case params[:commit]
    when "Remove Checked"
      helpers.remove_vines(params)
      redirect_to "/vines/search"
    when "Remove ALL"
      helpers.clear_all_vines
      redirect_to "/vines/search"
    when "Generate Compilation"
      outputFile = helpers.generate_compilation()
      if outputFile
        puts outputFile
        send_file outputFile
      end
    when "Move Up"
      helpers.move_up(params)
      redirect_to "/vines/search"
    when "Move Down"
      helpers.move_down(params)
      redirect_to "/vines/search"
    end
  end
  
  def vines_params
    params.permit(:query, :id, :title, :author, :tags, :dialogue, :commit)
  end
end
