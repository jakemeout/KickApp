import React from "react";
import { connect } from "react-redux";
import Moment from "moment";
import { postAddVote } from "../redux/actions";
import { postSaveProject } from "../redux/actions";
import { removeSavedProject } from "../redux/actions";
import { postClaimedProject } from "../redux/actions";
import { unClaimProject } from "../redux/actions";
import { Tag } from "baseui/tag";
import { styled } from "baseui";
import { Button } from "baseui/button";
import Stripe from "./Stripe";

const DataContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
const Label = styled("div", ({ $theme }) => ({
  ...$theme.typography.LabelMedium,
}));

class IdeaCard extends React.Component {
  state = {
    project: this.props.project || 0,
    isStripeShowing: false,
  };

  isSavedByUser() {
    const { project, projectInfo } = this.props;
    return (projectInfo.savedProjects || []).find(
      (a) => a.project_id === project.id
    );
  }

  isClaimedByAnotherDev(isClaimedByDev) {
    const { userInfo } = this.props;
    const { project } = this.props;
    if (userInfo.user.is_developer) {
      if (
        project?.is_claimed &&
        project?.project_developer_id !== userInfo?.user?.id
      ) {
        return (
          <div className="claimed-div">
            <DataContainer>
              <Label>Idea summary</Label>
              <span>
                {`Claimed by ${project?.project_developer?.username}`} ->
                <a href={`mailto:${project?.project_developer?.email}`}>
                  Contact dev
                </a>
              </span>
            </DataContainer>
          </div>
        );
      } else {
        return (
          <div className="claim-div">
            <button
              className="claim-button"
              onClick={() => this.handleClaim(!isClaimedByDev)}
            >
              {isClaimedByDev ? "Unclaim" : "Claim"}
            </button>
          </div>
        );
      }
    } else if (
      project?.is_claimed &&
      project?.project_developer_id !== userInfo?.user?.id
    )
      return (
        <div className="claimed-div">
          {`Claimed by dev ${project?.project_developer?.username}`}
        </div>
      );
  }

  isClaimedByDev() {
    const { project, projectInfo } = this.props;
    return (projectInfo.claimedProjects || []).find(
      (a) => a.project_id === project.id
    );
  }

  getFormattedDate = (date) => {
    Moment.locale("en");
    var dt = date;
    return Moment(dt).format("LLLL");
  };

  handleClaim = (clicked) => {
    const {
      userInfo,
      project,
      postClaimedProject,
      unClaimProject,
    } = this.props;
    if (clicked) {
      postClaimedProject(project, userInfo.user);
    } else {
      let claimedProject = this.isClaimedByDev();
      let claimedUserid = claimedProject.id;
      unClaimProject(claimedUserid);
    }
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
  renderTags = () => {
    const { project } = this.props;
    if (project?.tags?.length > 0) {
      return project?.tags?.map((tag) => (
        <Tag closeable={false} kind="primary">
          {" "}
          {tag?.tag_name}{" "}
        </Tag>
      ));
    } else {
      return null;
    }
  };
  handleSponsor = () => {
    this.setState({ isStripeShowing: !this.state.isStripeShowing });
  };

  handleVote = (isUpVote = true) => {
    const { userInfo, project, postAddVote } = this.props;
    const currentVote = project?.user_votes?.vote_action;

    let updateVote;
    if (currentVote === 1) {
      updateVote = isUpVote ? 0 : -1;
    } else if (currentVote === -1) {
      updateVote = isUpVote ? 1 : 0;
    } else {
      updateVote = isUpVote ? 1 : -1;
    }
    postAddVote(project, userInfo.user, updateVote);
  };

  render() {
    const { project, userInfo } = this.props;
    const isSavedClick = this.isSavedByUser();
    const isClaimedByDev = this.isClaimedByDev();
    console.log(project?.user_votes?.[0]?.vote_action);
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-author">
            <div className="ellipses" style={{ background: "#000" }}></div>
            <div className="submitter-name">{`${project?.project_submitter?.first_name} ${project?.project_submitter?.last_name}`}</div>
            <div className="total-sponsored">
              {`Total Sponsored: $${
                project?.sponsor_amount ? project?.sponsor_amount : 0
              }`}
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
            {this.isClaimedByAnotherDev(isClaimedByDev)}
          </div>

          <div className="tags-votes">
            <div className="tag">{this.renderTags()}</div>
            <div className="up-vote-num">{project?.num_up_votes}</div>
            <div className="down-vote-num">{project?.num_down_votes}</div>
            <div className="upvote">
              <img
                alt="thumbsup"
                className="thumbsup"
                src={
                  project?.user_votes?.[0]?.vote_action === 1
                    ? require("./black_thumb_up.png")
                    : require("./thumbsUp.png")
                }
                onClick={() => this.handleVote(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="downvote">
              <img
                alt="thumbsdown"
                className="thumbsdown"
                src={
                  project?.user_votes?.[0]?.vote_action === -1
                    ? require("./black_thumb_down.png")
                    : require("./thumbsDown.png")
                }
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
    AllClaimedProjects: state.AllClaimedProjects,
  };
}
const mdp = (dispatch) => {
  return {
    postAddVote: (project, user, vote_action) =>
      dispatch(postAddVote(project, user, vote_action)),
    postSaveProject: (project, user) =>
      dispatch(postSaveProject(project, user)),
    removeSavedProject: (savedUserid) =>
      dispatch(removeSavedProject(savedUserid)),
    postClaimedProject: (project, user) =>
      dispatch(postClaimedProject(project, user)),
    unClaimProject: (claimedUserid) => dispatch(unClaimProject(claimedUserid)),
  };
};

export default connect(msp, mdp)(IdeaCard);
