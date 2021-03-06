# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

# Ruby version
ruby 2.7.2p137

# System dependencies
FFmpeg - Tool used to combine the video files - https://www.ffmpeg.org/download.html

# Configuration
Update config/initializers/constants.rb - The VINEHALLA_PATH constant needs to be set for your local file system. 

# Database creation
Be sure to run the migrations, but also use the seed file. It is designed to search through the file system designated in VINEHALLA_PATH to look for vine files and create initial database entries for each video. 

# File System: 
The app expects a local file system in the form of 
- root = folder indicated in the VINEHALLA_PATH constant
- root/Output = folder where vine compilation files will be deposited 
- root/Tools = folder where the FFmpeg tool should be
- root/Vines = parent folder for vine videos
- root/Vines/Unknown = folder for vines where author is unknown
- root/Vines/.... = vines with known authors should be stored in folders named after the author. The seed.rb file will use the folder names to set the author field in the database entries
- IMPORTANT: Each author folder, including the "Unknown" folder (if it exists), needs a vineDetails.csv file. 

# vineDetails.csv:
Each author folder needs a vineDetails.csv file. This file contains three columns: File, Title, Tags, and Dialogue. The seeds file will use these csv files to add title, tag, and dialogue data to each vine found in that author's folder. The value of the File column should be the filename of the matching vine (including the file extension). The Tags column should be a semi-colon-delimited list of tags for the related vine, and the Dialogue column should contain text indicating the spoken words of the vine. 

NOTE: CSV files created in Excel are usually encoded in ISO-8859-1 instead of UTF-8. These files will FAIL the CSV parsing as written. Ensure the vineDetails.csv files are encoded as UTF-8.

# Database updating: 
Currently the app doesn't offer a way to edit the vine database. To add tags/dialogue to the database, you will need to modify the entries manually. I recommend the SQLite DB Browser. https://sqlitebrowser.org/


