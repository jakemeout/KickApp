import React from "react";
import { connect } from "react-redux";
import ClaimedIdeas from "./ClaimedIdeas";
import { getProjects } from "../redux/actions";
import { getClaimed } from "../redux/actions";

class ClaimedIdeasContainer extends React.Component {
  componentWillMount() {
    this.props.getProjects();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userInfo.user.id !== prevProps.userInfo.user.id ||
      this.props.projectInfo.projects !== prevProps.projectInfo.projects
    ) {
      this.props.getClaimed(this.props.userInfo.user);
    }
  }

  render() {
    const { claimedProjects } = this.props.projectInfo;
    return (
      <div className="idea-cards-container">
        <h1>Claimed Ideas</h1>
        <div>
          {(claimedProjects || []).map((project) => (
            <ClaimedIdeas key={project.id} project={project} isClaimed />
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
    getClaimed: (user) => dispatch(getClaimed(user)),
  };
};

export default connect(msp, mdp)(ClaimedIdeasContainer);
