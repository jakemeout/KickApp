import React, { useReducer } from "react";
import { connect } from "react-redux";
import IdeaCard from "./IdeaCard";
import { getProjects } from "../redux/actions";
import { getSavedProjects } from "../redux/actions";

class BrowseContainer extends React.Component {
  componentWillMount() {
    this.props.getProjects();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userInfo.user.id !== prevProps.userInfo.user.id) {
      this.props.getSavedProjects(this.props.userInfo.user);
    }
  }

  renderIdeas = () => {
    const { projects } = this.props.projectInfo;
    const { user } = this.props.userInfo;

    return projects?.map((project) => (
      <IdeaCard key={project.id} project={project} />
    ));
  };

  render() {
    return (
      <React.Fragment>
        <div className="idea-cards-container">
          <h1>IDEAS!!!</h1>
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
  };
};

function msp(state) {
  return {
    userInfo: state.userInfo,
    projectInfo: state.projectInfo,
  };
}

export default connect(msp, mdp)(BrowseContainer);
