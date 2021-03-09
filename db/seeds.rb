# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# File structure necessary for seed script to work: 
# File structure expected to be VINEHALLA_PATH (declared in config/initializers/constants.rb):
# folders: Output, Tools, Vines --- files: none
# File structure expected inside Vines:
# folders: one folder for each vine author, one folder called "Unknown" for vines without known authors --- files: none
# File structure expected inside each author and "Unknown" folder:
# files: video files that will be considered vines. 
#
# Database build logic: 
# Get all children of the VINEHALLA_PATH\\Vines\\ folder
# 
# for each folder, set the author name equal to the folder name
#    Get all children of that folder
#        for each video file (currently expecting mp4, though may expand this in the future)
#            see if there is a matching jpg screenshot file (will be the same name but jpg instead of mp4)
#                IF THERE IS NOT: use ffmpeg to create a screenshot from 3 seconds in to the video
#                create a vine entry in the database with title: (filename - extension)
#                                                         author: the author set by the folder name     
#                                                         path: the path to the video file
#                                                         image_path: the path of the image file, if it was found
require 'csv'

vinesPath = VINEHALLA_PATH + "Vines\\"

# Get all children of the VINEHALLA_PATH\\Vines\\ folder
vinesChildren = Dir.children(vinesPath)

# for each folder, set the author name equal to the folder name
vinesChildren.each do |authorFolder|

#   seems a little unneccessary, I think this variable will make the later code more readable
    author = authorFolder

    author_path = vinesPath + authorFolder + "\\"

    vineDetails_path = author_path + "vineDetails.csv"

#   read in the vineDetails csv as a CSV Table. 
    vineDetails = nil
    if (File.exist?(vineDetails_path))
        vineDetails = CSV.parse(File.read(vineDetails_path), headers: true)
    end

#   Get all children of that folder
    authorChildren = Dir.children(author_path)

#   for each video file (currently expecting mp4, though may expand this in the future)
    authorChildren.each do |file|
        if !file.include? ".mp4"
            # don't work any non video file
            next
        end

#       store the path of the file and pull the title out
        file_path = author_path + file
        title = file.clone

#       Default the title to be the file name excluding extension
        title[".mp4"] = ""

#       Default tags and dialogue to empty strings
        tags = ""
        dialogue = ""

#       If the vineDetails file was found, search the vineDetails CSV Table for a row with the same title
        if (!vineDetails.nil?)
            vineDetailsRow = vineDetails.find { |r|
                r["File"] == file
            }

#           if the returned row exists, update the title, tags, and dialogue variables 
#           If the value in the row is not nil, update the variables. 
            if (!vineDetailsRow.nil?)
                puts vineDetailsRow
                if (!vineDetailsRow["Title"].nil?)
                    title = vineDetailsRow["Title"]
                end
                if (!vineDetailsRow["Tags"].nil?)
                    tags = vineDetailsRow["Tags"]
                end
                if (!vineDetailsRow["Dialogue"].nil?)
                    dialogue = vineDetailsRow["Dialogue"]
                end
            end
        end

#       There should be a screenshot with the same filename but as a jpg. 
        image_file = (title + ".jpg")
        image_path = author_path + image_file
#       If there isn't a screenshot, create one using ffmpeg.
#       ffmpeg -ss 00:00:03 -i "INPUTPATH" -vframes 1 -q:v 2 "OUTPUTPATH"
        if !authorChildren.include? image_file
            ffmpegCommand = VINEHALLA_PATH + "Tools\\ffmpeg.exe -ss 00:00:03 -i \"[INPUTFILE]\" -vframes 1 -q:v 2 \"[OUTPUTFILE]\""
            ffmpegCommand["[INPUTFILE]"] = file_path
            ffmpegCommand["[OUTPUTFILE]"] = image_path
            result = %x{#{ffmpegCommand}}
        end
#       create a vine entry in the database with title: (filename - extension)
#                                                author: the author set by the folder name     
#                                                path: the path to the video file
#                                                image_path: the path of the image file
#                                                tags: found in the vineDetails csv file, or is empty string
#                                                Dialogue: found in the vineDetails csv file, or is empty string
        puts "title: #{title}, author: #{author}, path: #{file_path}, image_path: #{image_path}, tags: #{tags}, dialogue: #{dialogue}"
        Vine.create(title: title, author: author, path: file_path, image_path: image_path, tags: tags, dialogue: dialogue)
    end
end