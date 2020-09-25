import React from "react";
import {connect} from "react-redux"
import {postStartProject} from "../redux/actions";

class ClaimedIdeas extends React.Component {
  state = {
    hover: false,
  };

  setHover = (val) => {
    this.setState({ hover: val });
  }

handleStartProject = () => {
  const { project, postStartProject} = this.props;
  console.log(project.project.id)
  postStartProject(project.project)
}

  render() {
    const { project } = this.props.project;

    return (
      <React.Fragment>
        <div className="saved-ideas-mini-cards">
          <h5>
            Submitter:{" "}
            {`${project?.project_submitter?.first_name} ${project?.project_submitter?.last_name}`}{" "}
          </h5>
          <h5>Idea name: {project?.project_name}</h5>
          <h5>Idea Summary: {project?.project_idea_summary}</h5>
          <br/>
          <button
            
            onMouseEnter={() => this.setHover(true)}
            onMouseLeave={() => this.setHover(false)}
            onClick={() => this.handleStartProject()}
            className="start-project"
          >
            {project?.project_started ? "Project started" : "Start Project"}
          </button>
          {this.state.hover && <div className="tooltip"><span className="tooltip-text">Warning, there's no UNDO at this point. Please Commit!</span></div>}
          <br/>
          <h5>
            <a href={`mailto:${project?.project_submitter?.email}`}>
              Contact Submitter
            </a>
          </h5>
        </div>
      </React.Fragment>
    );
  }
}

const mdp = (dispatch) => {
  return {
    postStartProject: (project) => dispatch(postStartProject(project)),
  };
};

function msp(state) {
  return {
    userInfo: state.userInfo,
    projectInfo: state.projectInfo,
  };
}
export default connect(msp,mdp)(ClaimedIdeas);
