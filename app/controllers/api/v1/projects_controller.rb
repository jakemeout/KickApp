class Api::V1::ProjectsController < ApplicationController
    before_action :authorized
    
    def create
        @project = Project.create(project_params)
        if @project.valid?
          render json: { projects: @project}, status: :created
        else
          render json: { error: 'failed to create project' }, status: :not_acceptable
        end
    end
    
    def index
        @projects = Project.all
        render json: { projects: @projects }, status: :accepted
    end
    
    private
      
    def project_params
        params.require(:project).permit(
            :project_submitter_id,
            :project_developer_id, 
            :project_name, 
            :project_problem_statement, 
            :project_idea_summary, 
            :is_claimed, 
            :project_start_date, 
            :project_end_date, 
            :project_started, 
            :in_progress,
            :completed,
            :abandoned,
            :abandoned_date,
            :archived,
            :archived_date,
            :num_up_votes,
            :num_down_votes,
            :sponsor_amount)
    end
end
