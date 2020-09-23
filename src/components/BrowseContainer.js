import React, { useReducer } from "react";
import { connect } from "react-redux";
import IdeaCard from "./IdeaCard";
import { getProjects } from "../redux/actions";
import { getSavedProjects } from "../redux/actions";

class BrowseContainer extends React.Component {
  // constructor(props) {
  //     super(props);
  //     // Don't call this.setState() here!

  //     console.log("browse", props)
  //     this.props.getSavedProjects()
  //   }

  componentDidMount() {
    console.log("-->", this.props.userInfo.user);
    this.props.getProjects()
  }

  renderIdeas = () => {
    const { projects } = this.props.projectInfo;
    const { user } = this.props.userInfo;

    return projects?.map((project) => (
      <IdeaCard key={project.id} project={project} user={user} userSavedProject={useReducer.user_saved_projects}/>
    ));
  };

  render() {
    console.log("==->", this.props.userInfo.user);

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
    getSavedProjects: () => dispatch(getSavedProjects()),
  };
};

function msp(state) {
  return {
    userInfo: state.userInfo,
    projectInfo: state.projectInfo,
  };
}

export default connect(msp, mdp)(BrowseContainer);
