class VinesController < ApplicationController
  @vinePath = "E:\\Vinehalla\\"

  def create
  end

  def edit
    if session[:current_vine]
      @currentVine = Vine.find(session[:current_vine])
    end
  end

  def update 
    @currentVine = Vine.find(session[:current_vine])
    if @currentVine
      @currentVine.update(name: params["vine"][:name], 
                         author: params["vine"][:author], 
                         path: "#{@vinePath}#{params["vine"][:name]}.mp4")
    end
    redirect_to "/vines/edit"
  end

  def search
  end

  def add 
    newVine = Vine.create(name: params[:name], 
                          author: params[:author], 
                          path: "#{@vinePath}#{params[:name]}.mp4")
    if newVine
      session[:current_vine] = newVine.id
      redirect_to "/vines/edit"
    else
      redirect_to "/vines/create"
    end 
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
    params.permit(:query, :id, :name, :author, :commit)
  end
end
