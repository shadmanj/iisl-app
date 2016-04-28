class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :image
      t.string :damage

      t.timestamps null: false
    end
  end
end
