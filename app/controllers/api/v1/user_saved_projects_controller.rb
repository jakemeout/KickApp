class Api::V1::UserSavedProjectsController < ApplicationController
    before_action :authorized
    
    def create
        saved_project = UserSavedProject.create(project_id: params[:project_id], user_id: params[:user_id])
        if saved_project.valid?
          render json: { savedProjects: UserSavedProject.all.select { |a| a.user_id == params[:user_id]}}, status: :created
        else
          render json: { error: 'failed to create saved_project' }, status: :not_acceptable
        end
    end
    
    def claim
      claimed_project = UserSavedProject.create(project_id: params[:project_id],  claimed_by_id: params[:user_id])
      project = Project.find_by(id: params[:project_id])
      project.is_claimed = true
      project.project_developer_id = params[:user_id]
      project.save
      claimed_project.claimed = true
      claimed_project.save
        if claimed_project.valid?
          render json: { claimedProjects: UserSavedProject.where(claimed_by_id: params[:user_id])}, status: :created
        else
          render json: { error: 'failed to create saved_project' }, status: :not_acceptable
        end
    end

    def all_claimed
      all_claimed_projects = UserSavedProject.where(claimed: true)
      render json: {AllClaimedProjects: all_claimed_projects}, include: :claimed_by, status: :created
    end

    def unclaim
      claimed_project = UserSavedProject.find(params[:id])
      claimed_project.claimed_by_id = nil
      claimed_project.claimed = false
      claimed_project.save 
      project = Project.find_by(id: claimed_project.project_id)
      project.is_claimed = false
      project.project_developer_id = nil
      project.save
      render json: {claimedProjects: UserSavedProject.where(claimed_by_id: current_user.id)}
    end


    def show
      saved_projects = UserSavedProject.where(user_id: params[:id])
    
      render json: {savedProjects: saved_projects }, include: {project: {include: :project_submitter}}, status: :accepted
    end

    def claimed
      claimed_projects = UserSavedProject.where(claimed_by_id: params[:id])
    
      render json: {claimedProjects: claimed_projects }, include: {project: {include: :project_submitter}}, status: :accepted
    end
    def delete
      savedProject = UserSavedProject.find(params[:id])
      savedProject.destroy
      render json: {savedProjects: UserSavedProject.all.select { |a| a.user_id == current_user.id}}
    end
    

    private
    def user_saved_projects_params
        params.require(:user_saved_projects).permit(:project_id, :user_id, :claimed_by_id, :is_claimed )
    end
end