class CreateUserVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :user_votes do |t|
      t.integer :user_id
      t.integer :project_id
      t.integer :vote_action
    end
  end
end
