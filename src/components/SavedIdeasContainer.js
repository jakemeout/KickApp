import React from "react";
import { connect } from "react-redux";
import SavedIdeas from "./SavedIdeas";
import { getProjects } from "../redux/actions";
import { getSavedProjects } from "../redux/actions";

class SavedIdeasContainer extends React.Component {
  componentWillMount() {
    this.props.getProjects();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userInfo.user.id !== prevProps.userInfo.user.id ||
      this.props.projectInfo.projects !== prevProps.projectInfo.projects
    ) {
      this.props.getSavedProjects(this.props.userInfo.user);
    }
  }

  renderSavedIdeas = () => {
    const { savedProjects } = this.props.projectInfo;

    return savedProjects.map((project) => (
      <SavedIdeas key={project.id} project={project} />
    ));
  };
  render() {
    return (
      <React.Fragment>
        <h1 className="saved-idea-header">Saved Ideas</h1>
        <hr
          style={{
            width: "60%",
            margin: "auto",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        />
        <div className="saved-idea-container">{this.renderSavedIdeas()}</div>
      </React.Fragment>
    );
  }
}

function msp(state) {
  return {
    userInfo: state.userInfo,
    projectInfo: state.projectInfo,
  };
}
const mdp = (dispatch) => {
  return {
    getProjects: () => dispatch(getProjects()),
    getSavedProjects: (user) => dispatch(getSavedProjects(user)),
  };
};

export default connect(msp, mdp)(SavedIdeasContainer);
