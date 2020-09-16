class CreateUserSavedProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :user_saved_projects do |t|
      t.integer :project_id
      t.integer :user_id

      t.timestamps
    end
  end
end
