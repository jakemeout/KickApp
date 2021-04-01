class CreateUserSavedProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :user_saved_projects do |t|
      t.integer :project_id
      t.integer :user_id
      t.integer :claimed_by_id, foreign_key: {to_table: 'users'}
      t.boolean :claimed, :boolean,  null: false, default: false
      t.timestamps
    end
  end
end
