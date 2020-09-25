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
    if (this.props.userInfo.user.id !== prevProps.userInfo.user.id) {
      this.props.getClaimed(this.props.userInfo.user)
    }
  }

  renderClaimedIdeas = () => {
    const { claimedProjects } = this.props.projectInfo;
    

    return claimedProjects.map((project) => <ClaimedIdeas key={project.id} project={project} />);
  };
  render() {
    return (
      <React.Fragment>
        <h1 className="saved-idea-header">Claimed Ideas</h1>
        <hr style={{width: '60%', margin: "auto", marginTop: "5%", marginBottom: "5%"}}/>
        <div className="saved-idea-container">
        {this.renderClaimedIdeas()}
        </div>
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
    getClaimed: (user) => dispatch(getClaimed(user)),
  };
};

export default connect(msp, mdp)(ClaimedIdeasContainer);
