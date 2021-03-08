module VinesHelper
    # Get the selected vines array that is stored in the session
    def get_selected_vines
        @selected_vines = session[:selected_vines] ||= []
    end

    # If the selected vine isn't already in the selected vines array, add it and update the session
    def select_vine(v)
        get_selected_vines
        if @selected_vines.include? v.id
        else
            @selected_vines.push v.id
            session[:selected_vines] = @selected_vines
        end
    end

    # The params hash contains a bunch of check boxes. For any that are true, we need to remove that vine from the selected vines array
    def remove_vines(params)
        get_selected_vines
        params.each_pair do |k,v|
            if (k.include? "_check_box") && (v == "1")
                @vid = k.dup
                @vid["_check_box"] = ""
                @selected_vines.delete(@vid.to_i)
            end
        end
        session[:selected_vines] = @selected_vines
    end

    # Reset the selected vines array
    def clear_all_vines
        session[:selected_vines] = []
    end

    # Determine which "Move Up" button was pressed. Find the related vine in the selected vines array, and then move it to one index lower
    # and if the index was 0, move it to the end of the array
    def move_up(params)
        get_moved_id(params)
        get_selected_vines
        currentIndex = @selected_vines.find_index @vid
        if currentIndex == 0
            newIndex = @selected_vines.count - 1
        else
            newIndex = currentIndex - 1
        end
        @selected_vines = @selected_vines.insert(newIndex, @selected_vines.delete_at(currentIndex))
        session[:selected_vines] = @selected_vines
    end

    # Determine which "Move Down" button was pressed. Find the related vine in the selected vines array, and then move it to one index higher
    # and if the index was the the last item, move it to the start of the array
    def move_down(params)
        get_moved_id(params)
        get_selected_vines
        currentIndex = @selected_vines.find_index @vid
        if currentIndex == @selected_vines.count - 1
            newIndex = 0
        else
            newIndex = currentIndex + 1
        end
        @selected_vines = @selected_vines.insert(newIndex, @selected_vines.delete_at(currentIndex))
        session[:selected_vines] = @selected_vines
    end

    # Loop through the params hash to find the commit key. For even key that isn't commit, we know it is a check box. Get the vine
    # id from the check box's key and store it. 
    # When we find the commit key, then we know the key of the previous checkbox has the correct vine id that we need. 
    def get_moved_id(params)
        params.each_pair do |k,v|
            if k == "commit"
                break;
            else
                @vid = k.dup
                @vid["_check_box"] = ""
                @vid = @vid.to_i
            end
        end
    end

    # Meat of the code. We need to:
    # go through the selected vines array
    # query the database to get each of the filepaths for those vines (maintaining the order)
    # pass this new array of file paths to a function that will handle the compilation generation using ffmpeg
    def generate_compilation
        puts "Generating compilation"
        get_selected_vines
        pathArray = [];
        @selected_vines.each do |vid|
            vine = Vine.find(vid)
            pathArray.push vine.path
        end
        if pathArray.count > 0
            return outputFile = execute_ffmpeg(pathArray)
        end
    end

    def generate_requested_compilation(vineIds)
        puts "Generating requested compilation"
        pathArray = [];
        vineIds.each do |vId|
            vine = Vine.find(vId)
            pathArray.push vine.path
        end
        if pathArray.count > 0
            return outputFile = execute_ffmpeg(pathArray)
        end
    end

    #ffmpeg -i "path1" -i "path2" -i "path3" -i "pathN" -filter_complex "concat=n=#{COUNT}:v=1:a=1 [v] [a]" -map "[v]" -map "[a]" OUTPUTPATH
    def execute_ffmpeg(pathArray)
        ffmpegPath = VINEHALLA_PATH + "tools\\ffmpeg.exe"
        commandText = ffmpegPath
        optionsText = " -filter_complex \"concat=n=#{pathArray.count}:v=1:a=1 [v] [a]\" -map \"[v]\" -map \"[a]\" "
        dt = Time.now
        dtStamp = dt.strftime("%m-%d-%Y-%k-%M-%S")
        outputFile = VINEHALLA_PATH + "Output\\VC#{dtStamp}.mp4"
        if outputFile.include? " "
            outputFile[" "] = ""
        end
        pathArray.each do |v|
            commandText += ' -i "' + v + '"'
        end
        commandText += optionsText + outputFile
        result = %x{#{commandText}}
        return outputFile
    end

end
