import React from "react";
import { connect } from "react-redux";
import { styled } from "baseui";
import { StatefulCalendar } from "baseui/datepicker";
import { Button } from "baseui/button";

import { postStartProject } from "../redux/actions";
import { postCompleteProject } from "../redux/actions";
import { postAbandonProject } from "../redux/actions";

const Label = styled("div", ({ $theme }) => ({
  ...$theme.typography.LabelMedium,
}));

const DataContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const STEPS = ["Start", "In progress", "Completed", "Abandoned"];
class ClaimedIdeas extends React.Component {
  state = {
    hover: false,
  };

  setHover = (val) => {
    this.setState({ hover: val });
  };

  getNextStep = () => {
    const { project = {} } = this.props.project;

    let stepStage = 0;
    if (project.completed === true) {
      stepStage = 2;
    } else if (project.in_progress === true) {
      stepStage = 1;
    }
    return stepStage;
  };

  handleNextStep = (step) => {
    if (step === 0) {
      this.handleStartProject();
    } else if (step === 1) {
      this.handleCompleteProject();
    }
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
    const { project = {} } = this.props.project;
    const nextStep = this.getNextStep();

    return (
      <React.Fragment>
        <div className="claimed-ideas-mini-cards">
          <DataContainer>
            <Label>Submitter</Label>
            <span>{`${project?.project_submitter?.first_name} ${project?.project_submitter?.last_name}`}</span>
          </DataContainer>

          <DataContainer>
            <Label>Idea name</Label>
            <span>{project?.project_name}</span>
          </DataContainer>

          <DataContainer>
            <Label>Idea summary</Label>
            <span>{project?.project_idea_summary}</span>
          </DataContainer>

          {!project.completed && !project.abandoned && (
            <DataContainer>
              <Button onClick={() => this.handleNextStep(nextStep)}>
                {STEPS[nextStep]} Project
              </Button>
              <Button onClick={() => this.handleAbandonProject()}>
                Abandon Project
              </Button>
            </DataContainer>
          )}

          {project.completed && (
            <DataContainer>
              <Label>Completed on</Label>
              <span>{project?.completion_date}</span>
            </DataContainer>
          )}

          {project.abandoned && (
            <DataContainer>
              <Label>Abandoned on</Label>
              <span>{project?.abandoned_date}</span>
            </DataContainer>
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
