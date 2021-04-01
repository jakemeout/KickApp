import React from "react";
import { connect } from "react-redux";
import ClaimedIdeas from "./ClaimedIdeas";
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

  render() {
    const { savedProjects } = this.props.projectInfo;

    return (
      <div className="idea-cards-container">
        <h1>Saved Ideas</h1>
        <div>
          {(savedProjects || []).map((project) => (
            <ClaimedIdeas key={project.id} project={project} />
          ))}
        </div>
      </div>
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
