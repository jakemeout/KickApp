class Api::V1::UserSavedProjectsController < ApplicationController
    before_action :authorized
    
    def create
        saved_project = UserSavedProject.create(project_id: params[:project_id], user_id: params[:user_id])
        if saved_project.valid?
          render json: { savedProjects: UserSavedProject.all}, status: :created
        else
          render json: { error: 'failed to create saved_project' }, status: :not_acceptable
        end
    end
    
    def show
     
      saved_projects = UserSavedProject.where(user_id: params[:id])
    
      render json: {savedProjects: saved_projects}, status: :accepted
    end

    def delete
      savedProject = UserSavedProject.find(params[:id])
      savedProject.destroy
      render json: {savedProjects: UserSavedProject.all}
    end
    

    private
    def user_saved_projects_params
        params.require(:user_saved_projects).permit(:project_id, :user_id)
    end
end