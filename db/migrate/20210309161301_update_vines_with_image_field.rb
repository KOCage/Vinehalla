class UpdateVinesWithImageField < ActiveRecord::Migration[6.1]
  def change
    add_column :vines, :image_source, :text
  end
end
