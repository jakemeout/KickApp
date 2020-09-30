class User < ApplicationRecord
    has_secure_password
    validates :username, uniqueness: { case_sensitive: false }
    #has_many projects returns the projects that a user submitted
    has_many :developed_projects, class_name: :Project, foreign_key: :project_developer_id
    has_many :submitted_projects, class_name: :Project, foreign_key: :project_submitter_id
    has_many :user_saved_projects
    has_many :claimed_projects, class_name: :UserSavedProject, foreign_key: :claimed_by_id
    has_many :projects, through: :user_saved_projects
    has_many :project_comments
    has_many :user_votes
    has_many :projects, through: :user_votes
    # has_many :submitter
end
