class Api::V1::UserVotesController < ApplicationController
    before_action :authorized
    
    def create
        
        if (user_voted = UserVote.where(project_id: params[:project_id], user_id: params[:user_id])).length > 0
            user_voted.update(vote_action: params[:vote_action])
            project = Project.find_by(id: params[:project_id]) 
        else
            user_voted = UserVote.create(project_id: params[:project_id], user_id: params[:user_id], vote_action: params[:vote_action])
            project = Project.where(id: params[:project_id]) 
        end
    
        project = Project.find_by(id: params[:project_id])
        
        if project.num_up_votes == nil && project.num_down_votes == nil 
            project.num_up_votes = 0
            project.num_down_votes = 0 
        elsif project.num_up_votes == nil && project.num_down_votes != nil
            project.num_up_votes = 0
        elsif project.num_down_votes == nil && project.num_up_votes != nil
        project.num_down_votes = 0 
        end

        if params[:vote_action] == -1  
            project.num_down_votes -= 1
            project.save
        elsif params[:vote_action] == 1
            project.num_up_votes += 1 
            project.save      
        end
        projects = Project.all
        sorted_projects = projects.sort_by { |a| [a.num_up_votes ? 1 : 0, a.num_up_votes] }.reverse!
        render json: {projects: sorted_projects}, include: [:project_submitter, :project_developer, :tags, :user_votes], status: :accepted
    end
end
