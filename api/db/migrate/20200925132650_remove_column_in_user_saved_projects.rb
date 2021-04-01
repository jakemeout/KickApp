class RemoveColumnInUserSavedProjects < ActiveRecord::Migration[6.0]
  def change
    remove_column :user_saved_projects, :boolean
  end
end
