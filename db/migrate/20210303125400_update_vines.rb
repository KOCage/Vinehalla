class UpdateVines < ActiveRecord::Migration[6.1]
    def change
        add_column :vines, :image_path, :string
        add_column :vines, :tags, :text
        add_column :vines, :dialogue, :text
    end
  end
  