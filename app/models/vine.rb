class Vine < ApplicationRecord

    def self.search(title, author, tags, dialogue)
        if (title ||
            author ||
            tags ||
            dialogue)
            puts "Searching database for title: #{title}, author: #{author}, tags: #{tags}, dialogue: #{dialogue}"
            @query = ""
            @arguments = []
            if (title)
                @query += "title like ? "
                @arguments << "%#{title}%"
            end
            if (author)
                if (@query != "")
                    @query += "AND "
                end
                @query += "author like ? "
                @arguments << "%#{author}%"
            end
            if (tags)
                @tagsArray = tags.split(";")
                @tagsArray.each do |tag|
                    if (@query != "")
                        @query += "AND "
                    end
                    @query += "tags like ? "
                    @arguments << "%#{tag}%"
                end
            end
            if (dialogue)
                if (@query != "")
                    @query += "AND "
                end
                @query += "dialogue like ? "
                @arguments << "%#{dialogue}%"
            end
            puts "where: #{@query}"
            puts *@arguments
            self.where(@query, *@arguments)
        else
            return
        end
    end
end
