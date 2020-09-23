import React from "react";
import { connect } from "react-redux";
import Moment from "moment";
import { patchAddVote } from "../redux/actions";
import { postSaveProject } from "../redux/actions";
import { removeSavedProject } from "../redux/actions";
import Stripe from "./Stripe";

class IdeaCard extends React.Component {
  state = {
    upVoteClicked: false,
    downVoteClicked: false,
    project: this.props.project || 0,
    isStripeShowing: false,
  };

  isSavedByUser() {
    const { project, projectInfo } = this.props;
    return (projectInfo.savedProjects || []).find(
      (a) => a.project_id === project.id
    );
  }

  getFormattedDate = (date) => {
    Moment.locale("en");
    var dt = date;
    return Moment(dt).format("LLLL");
  };

  handleSave = (clicked) => {
    const {
      userInfo,
      project,
      postSaveProject,
      removeSavedProject,
    } = this.props;
    if (clicked) {
      postSaveProject(project, userInfo.user);
    } else {
      let savedProject = this.isSavedByUser();
      let savedUserid = savedProject.id;
      removeSavedProject(savedUserid);
    }
  };

  handleSponsor = () => {
    this.setState({ isStripeShowing: !this.state.isStripeShowing });
  };

  handleVote = (isThumbUp = true) => {
    const { upVoteClicked, downVoteClicked, project } = this.state;

    let updatedUpVote = isThumbUp ? !upVoteClicked : upVoteClicked;
    let num_up_votes = project.num_up_votes;
    let updatedDownVote = isThumbUp ? downVoteClicked : !downVoteClicked;
    let num_down_votes = project.num_down_votes;

    if (isThumbUp) {
      num_up_votes = (project.num_up_votes || 0) + (updatedUpVote ? 1 : -1);
    } else {
      num_down_votes =
        (project.num_down_votes || 0) + (updatedDownVote ? 1 : -1);
    }

    const updatedProject = { ...project, num_down_votes, num_up_votes };
    this.props.patchAddVote(updatedProject);
    this.setState({
      downvoteClicked: updatedDownVote,
      upVoteClicked: updatedUpVote,
      project: updatedProject,
    });
  };

  render() {
    const { project, userInfo } = this.props;
    const isSavedClick = this.isSavedByUser();

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-author">
            <div className="ellipses"></div>
            <div className="submitter-name">{`${project.project_submitter.first_name} ${project.project_submitter.last_name}`}</div>
            <div className="total-sponsored">
              Total Sponsored: {project?.sponsor_amount}
            </div>
            <div className="bookark-div">
              <img
                alt="bookmark"
                className="bookmark"
                src={
                  isSavedClick
                    ? require("./bookmark_black.png")
                    : require("./bookmark.png")
                }
                onClick={() => this.handleSave(!isSavedClick)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="sponsor">
              <img
                alt="sponsor"
                className="sponsor-card"
                src={require("./sponsor.png")}
                onClick={() => this.handleSponsor()}
                style={{ cursor: "pointer" }}
              />
            </div>
            {userInfo.user.is_developer && (
              <div className="claim-div">
                <button className="claim-button" onClick={null}>
                  Claim
                </button>
              </div>
            )}
          </div>

          <div className="tags-votes">
            <div className="num-upvote">
              {this.state.project.num_up_votes}
              <img
                alt="thumbsup"
                className="thumbsup"
                src={require("./thumbsUp.png")}
                onClick={() => this.handleVote(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="num-downvote">
              {this.state.project.num_down_votes}
              <img
                alt="thumbsdown"
                className="thumbsdown"
                src={require("./thumbsDown.png")}
                onClick={() => this.handleVote(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="card-details">
            <div className="submitted-on">
              {" "}
              Submitted on: {this.getFormattedDate(project.created_at)}
            </div>
            <div className="idea-name"> Idea Name: {project.project_name}</div>
            <div className="problem-name">
              Problem Statement: {project.project_problem_statement}
            </div>
            <div className="idea-summary">
              Idea Summary: {project.project_idea_summary}
            </div>
          </div>
        </div>
        <Stripe
          isStripeShowing={this.state.isStripeShowing}
          toggle={this.handleSponsor}
          user={userInfo.user}
          project={project}
        />
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
    patchAddVote: (project) => dispatch(patchAddVote(project)),
    postSaveProject: (project, user) =>
      dispatch(postSaveProject(project, user)),
    removeSavedProject: (savedUserid) =>
      dispatch(removeSavedProject(savedUserid)),
  };
};

export default connect(msp, mdp)(IdeaCard);
