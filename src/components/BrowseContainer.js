import React from "react";
import { connect } from "react-redux";
import IdeaCard from "./IdeaCard";
import { getProjects } from "../redux/actions";
import { getSavedProjects } from "../redux/actions";
import { getClaimed } from "../redux/actions";
import { getAllClaimed } from "../redux/actions";

class BrowseContainer extends React.Component {
  componentWillMount() {
    this.props.getProjects();
    this.props.getAllClaimed();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userInfo.user.id !== prevProps.userInfo.user.id ||
      this.props.projectInfo.projects !== prevProps.projectInfo.projects
    ) {
      this.props.getSavedProjects(this.props.userInfo.user);
      this.props.getClaimed(this.props.userInfo.user);
      this.props.getAllClaimed();
    }
  }

  renderIdeas = () => {
    const { projects } = this.props.projectInfo;
    return (projects || []).map((project) => (
      <IdeaCard key={project.id} project={project} />
    ));
  };

  render() {
    return (
      <React.Fragment>
        <div className="idea-cards-container">
          <h1>IDEAS</h1>
          {this.renderIdeas()}
        </div>
      </React.Fragment>
    );
  }
}

const mdp = (dispatch) => {
  return {
    getProjects: () => dispatch(getProjects()),
    getSavedProjects: (user) => dispatch(getSavedProjects(user)),
    getClaimed: (user) => dispatch(getClaimed(user)),
    getAllClaimed: () => dispatch(getAllClaimed())
  };
};

function msp(state) {
  return {
    userInfo: state.userInfo,
    projectInfo: state.projectInfo,
  };
}

export default connect(msp, mdp)(BrowseContainer);
