class Vine < ApplicationRecord

    def self.search(query)
        if query
            self.where("name like ? or author like ?", "%#{query}%", "%#{query}%")
        else
            return
        end
    end
end
