class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.integer :project_submitter_id
      t.integer :project_developer_id
      t.string :project_name
      t.string :project_problem_statement
      t.string :project_idea_summary
      t.boolean :is_claimed, null: false, default: false
      t.string :project_start_date
      t.string :project_end_date
      t.boolean :project_started, null: false, default: false
      t.boolean :in_progress, null: false, default: false
      t.boolean :completed, null: false, default: false
      t.boolean :abandoned, null: false, default: false
      t.string :abandoned_date
      t.boolean :archived, null: false, default: false
      t.string :archived_date
      t.integer :num_up_votes
      t.integer :num_down_votes
      t.string :sponsor_amount

      t.timestamps
    end
  end
end
