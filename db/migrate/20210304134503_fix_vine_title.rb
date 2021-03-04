class FixVineTitle < ActiveRecord::Migration[6.1]
  def self.up
      rename_column :vines, :name, :title
  end
end
