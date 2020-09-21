# class ProjectSerializer < ActiveModel::Serializer
#   attributes :project_submitter_id, :project_developer_id, :project_name, :project_problem_statement, :project_idea_summary, :is_claimed, :project_start_date, :project_end_date, :project_started, :in_progress, :completed, :abandoned, :abandoned_date, :archived, :archived_date, :num_up_votes, :num_down_votes, :sponsor_amount

#   belongs_to :project_submitter
#   # def project_submitter
#   #   {project_submitter_id: self.object.project_submitter.id, 
#   #     project_submitter_first_name: self.object.project_submitter.first_name
#   #     project_submitter_last_name: self.object.project_submitter.last_name
#   #   }
#   end
# end
