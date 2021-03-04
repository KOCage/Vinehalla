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
#                create a vine entry in the database with title: (filename - extension)
#                                                         author: the author set by the folder name     
#                                                         path: the path to the video file
#                                                         image_path: the path of the image file, if it was found

vinesPath = VINEHALLA_PATH + "Vines\\"
# Get all children of the VINEHALLA_PATH\\Vines\\ folder
vinesChildren = Dir.children(vinesPath)
# for each folder, set the author name equal to the folder name
vinesChildren.each do |authorFolder|

    # seems a little unneccessary, I think this variable will make the later code more readable
    author = authorFolder

    author_path = vinesPath + authorFolder + "\\"
#    Get all children of that folder
    authorChildren = Dir.children(author_path)
#        for each video file (currently expecting mp4, though may expand this in the future)
    authorChildren.each do |file|
        if !file.include? ".mp4"
            # don't work any non video file
            next
        end
        file_path = author_path + file
        title = file
        title[".mp4"] = ""
#       see if there is a matching jpg screenshot file (will be the same name but jpg instead of mp4)
        image_file = (title + ".jpg")
        if authorChildren.include? image_file
            image_path = author_path + image_file
        else
            image_path = ""
        end
#                create a vine entry in the database with title: (filename - extension)
#                                                         author: the author set by the folder name     
#                                                         path: the path to the video file
#                                                         image_path: the path of the image file, if it was found
            puts "title: #{title}, author: #{author}, path: #{file_path}, image_path: #{image_path}"
            Vine.create(title: title, author: author, path: file_path, image_path: image_path)
    end
end