import React from "react";
import { connect } from "react-redux";
// import { StatefulCalendar } from "baseui/datepicker";
import { Button, KIND } from "baseui/button";
import ArrowRight from "baseui/icon/arrow-right";
import { Label2 } from "baseui/typography";
import { ProgressSteps, NumberedStep } from "baseui/progress-steps";
import { postStartProject } from "../redux/actions";
import { postCompleteProject } from "../redux/actions";
import { postAbandonProject } from "../redux/actions";

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

  // handleSetEndDate = () => {
  //   return <StatefulCalendar onChange={({ date })} />;
  // };

  renderNextStepButton = (nextStep) => {
    return (
      <Button size="compact" onClick={() => this.handleNextStep(nextStep)}>
        Next
      </Button>
    );
  };

  renderProgressBar = () => {
    const nextStep = this.getNextStep();
    return (
      <div className="card-subsection" style={{ minWidth: "200px" }}>
        <ProgressSteps current={nextStep}>
          <NumberedStep title="Ready to start">
            {this.renderNextStepButton(nextStep)}
          </NumberedStep>
          <NumberedStep title="In progress">
            {this.renderNextStepButton(nextStep)}
          </NumberedStep>
          <NumberedStep title="Complete" />
        </ProgressSteps>
      </div>
    );
  };

  render() {
    const { isClaimed = false } = this.props;
    const { project = {} } = this.props.project;

    return (
      <div className="card" style={{ maxWidth: "600px" }}>
        <div className="card-section">
          <div>
            <div className="card-subsection">
              <Label2>Submitter</Label2>
              <span>{`${project?.project_submitter?.first_name} ${project?.project_submitter?.last_name}`}</span>
            </div>

            <div className="card-subsection">
              <Label2>Idea name</Label2>
              <span>{project?.project_name}</span>
            </div>

            <div className="card-subsection">
              <Label2>Idea summary</Label2>
              <span>{project?.project_idea_summary}</span>
            </div>

            {project.completed && (
              <div className="card-subsection">
                <Label2>Completed on</Label2>
                <span>{project?.completion_date}</span>
              </div>
            )}

            {project.abandoned && (
              <div className="card-subsection">
                <Label2>Abandoned on</Label2>
                <span>{project?.abandoned_date}</span>
              </div>
            )}
          </div>
          {isClaimed && this.renderProgressBar()}
        </div>

        {!project.completed && !project.abandoned && (
          <div className="card-subsection" style={{ display: "flex" }}>
            {isClaimed && (
              <Button
                onClick={() => this.handleAbandonProject()}
                style={{ marginRight: "8px" }}
              >
                Abandon Project
              </Button>
            )}
            <Button
              $as="a"
              href={`mailto:${project?.project_submitter?.email}`}
              kind={KIND.secondary}
              endEnhancer={() => <ArrowRight size={24} />}
              style={{ marginRight: "8px" }}
            >
              Contact Submitter
            </Button>
          </div>
        )}
      </div>
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
