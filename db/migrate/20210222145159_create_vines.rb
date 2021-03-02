class CreateVines < ActiveRecord::Migration[6.1]
  def change
    create_table :vines do |t|
      t.string :name
      t.string :author
      t.text :path

      t.timestamps
    end
  end
end
