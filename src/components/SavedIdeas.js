import React from "react";

class SavedIdeas extends React.Component {
  
  
  
    render() {
        const {project} = this.props.project;

    return (
      <React.Fragment>
      
      <div className="saved-ideas-mini-cards">
      <h5>Submitter: {`${project?.project_submitter.first_name} ${project?.project_submitter.last_name}`} </h5>
      <h5>Idea name: {project?.project_name}</h5>
      <h5>Idea Summary: {project?.project_idea_summary}</h5>
      </div>
      </React.Fragment>
    );
  }
}

export default SavedIdeas;
