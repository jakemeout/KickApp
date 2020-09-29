import React from "react";
import { connect } from "react-redux";
import { postStartProject } from "../redux/actions";
import { StatefulCalendar } from "baseui/datepicker";
import { postCompleteProject } from "../redux/actions";
import { postAbandonProject } from "../redux/actions";

class ClaimedIdeas extends React.Component {
  state = {
    hover: false,
  };

  setHover = (val) => {
    this.setState({ hover: val });
  };

  handleStartProject = () => {
    const { project, postStartProject } = this.props;
    postStartProject(project.project);
  };
  handleCompleteProject = () => {
    const { project, postCompleteProject } = this.props;
    postCompleteProject(project.project);
  };
  handleAbandonProject = () => {
    const { project, postAbandonProject } = this.props;
    postAbandonProject(project.project);
  };

  handleSetEndDate = () => {
    return <StatefulCalendar onChange={({ date }) => console.log(date)} />;
  };

  render() {
    const { project } = this.props.project;

    return (
      <React.Fragment>
        <div className="claimed-ideas-mini-cards">
          <h5>
            Submitter:{" "}
            {`${project?.project_submitter?.first_name} ${project?.project_submitter?.last_name}`}{" "}
          </h5>
          <h5>Idea name: {project?.project_name}</h5>
          <h5>Idea Summary: {project?.project_idea_summary}</h5>
          <br />

          {!project?.project_started ? (
            <button
              onMouseEnter={() => this.setHover(true)}
              onMouseLeave={() => this.setHover(false)}
              onClick={() => this.handleStartProject()}
            >
              Start Project
            </button>
          ) : (
            "Project started"
          )}
          {this.state.hover && (
            <div className="tooltip">
              Warning, you cannot UNDO starting your project. Please Commit!
            </div>
          )}
          <br />
          <button onClick={() => this.handleSetEndDate}>
            Choose an end date
          </button>
          {!project?.completed ? (
            <button onClick={() => this.handleCompleteProject()}>
              Complete Project
            </button>
          ) : (
            `Project Completed on ${project?.completion_date}`
          )}
          <br />
          {!project?.abandoned ? (
            <button onClick={() => this.handleAbandonProject()}>
              Abandon Project
            </button>
          ) : (
            `Abandoned on ${project?.abandoned_date}`
          )}

          <h5>
            <a
              href={`mailto:${project?.project_submitter?.email}`}
              className="contact-submitter"
            >
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
    postCompleteProject: (project) => dispatch(postCompleteProject(project)),
    postAbandonProject: (project) => dispatch(postAbandonProject(project)),
  };
};

function msp(state) {
  return {
    userInfo: state.userInfo,
    projectInfo: state.projectInfo,
  };
}
export default connect(msp, mdp)(ClaimedIdeas);
