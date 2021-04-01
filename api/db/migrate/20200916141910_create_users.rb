class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :string
      t.string :username
      t.string :password_digest
      t.string :github
      t.string :website
      t.string :other_links
      t.boolean :is_developer, null: false, default: false
      t.boolean :is_sponser, null: false, default: false

      t.timestamps
    end
  end
end
