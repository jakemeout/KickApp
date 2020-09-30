class Project < ApplicationRecord
        belongs_to :project_submitter, class_name: :User, optional: true
        belongs_to :project_developer, class_name: :User, optional: true

        has_many :user_saved_projects
        has_many :users, through: :user_saved_projects
        
        has_many :project_tags
        has_many :tags, through: :project_tags
        
        has_many :user_votes
        has_many :users, through: :user_votes
end
