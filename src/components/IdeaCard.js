import React from "react";
import { connect } from "react-redux";
import Moment from "moment";
import { postAddVote } from "../redux/actions";
import { postSaveProject } from "../redux/actions";
import { removeSavedProject } from "../redux/actions";
import { postClaimedProject } from "../redux/actions";
import { unClaimProject } from "../redux/actions";
import { Tag } from "baseui/tag";
import { Avatar } from "baseui/avatar";
import { Label1, Label2 } from "baseui/typography";
import { StatefulTooltip, PLACEMENT } from "baseui/tooltip";
import { Checkbox, STYLE_TYPE } from "baseui/checkbox";
import Stripe from "./Stripe";

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
      const claimed =
        project?.is_claimed &&
        project?.project_developer_id !== userInfo?.user?.id;

      const tooltipContent = (
        <>
          {`Claimed by ${project?.project_developer?.username}`}.{" "}
          <a href={`mailto:${project?.project_developer?.email}`}>
            Contact dev
          </a>
        </>
      );

      return (
        <StatefulTooltip
          content={() => claimed && tooltipContent}
          placement={PLACEMENT.top}
          showArrow
          returnFocus
          autoFocus
        >
          <div>
            <Checkbox
              checked={isClaimedByDev}
              onChange={() => this.handleClaim(!isClaimedByDev)}
              checkmarkType={STYLE_TYPE.toggle_round}
              disabled={claimed}
            >
              Claim
            </Checkbox>
          </div>
        </StatefulTooltip>
      );
    }
    return null;
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
        <Tag closeable={false} kind="primary" >
          {tag?.tag_name}
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
    const userFullName = `${project?.project_submitter?.first_name} ${project?.project_submitter?.last_name}`;
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-section">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar name={userFullName} size="scale1400" />
              <div style={{ marginLeft: "12px" }}>
                <Label1>{userFullName}</Label1>
                <label style={{ fontSize: "12px", color: "grey" }}>
                  Submitted on: {this.getFormattedDate(project.created_at)}
                </label>
              </div>
            </div>
            <img
              alt="bookmark"
              className="bookmark"
              src={
                isSavedClick
                  ? require("../assets/bookmark_black.png")
                  : require("../assets/bookmark.png")
              }
              onClick={() => this.handleSave(!isSavedClick)}
              style={{ cursor: "pointer", width: "24px", height: "40px" }}
            />
          </div>

          <div className="card-section" style={{ flexDirection: "column" }}>
            <div className="card-subsection">
              <Label2>Idea Name</Label2>
              <span>{project.project_name}</span>
            </div>
            <div className="card-subsection">
              <Label2>Problem Statement</Label2>
              <span>{project.project_problem_statement}</span>
            </div>
            <div className="card-subsection">
              <Label2>Idea Summary</Label2>
              <span>{project.project_idea_summary}</span>
            </div>
            <div className="card-subsection">
              {project?.tags?.length > 0 ? <Label2>Tags</Label2> : null}
              {this.renderTags()}
            </div>
          </div>

          <div className="card-section" style={{ alignItems: "center" }}>
            <div className="card-subsection">
              {this.isClaimedByAnotherDev(isClaimedByDev)}
            </div>

            <div className="card-subsection">
              <StatefulTooltip
                content={() => `$${project?.sponsor_amount || 0} sponsored`}
                placement={PLACEMENT.top}
                showArrow
                returnFocus
                autoFocus
              >
                <img
                  className="action-icon"
                  alt="sponsor"
                  src={require("../assets/sponsor.png")}
                  onClick={() => this.handleSponsor()}
                  style={{ cursor: "pointer" }}
                />
              </StatefulTooltip>

              <StatefulTooltip
                content={() => `${project?.num_up_votes || 0} liked`}
                placement={PLACEMENT.top}
                showArrow
                returnFocus
                autoFocus
              >
                <img
                  className="action-icon"
                  alt="thumbsup"
                  src={
                    project?.user_votes?.[0]?.vote_action === 1
                      ? require("../assets/black_thumb_up.png")
                      : require("../assets/thumbsUp.png")
                  }
                  onClick={() => this.handleVote(true)}
                  style={{ cursor: "pointer" }}
                />
              </StatefulTooltip>

              <StatefulTooltip
                content={() => `${project?.num_down_votes || 0} disliked`}
                placement={PLACEMENT.top}
                showArrow
                returnFocus
                autoFocus
              >
                <img
                  className="action-icon"
                  alt="thumbsdown"
                  src={
                    project?.user_votes?.[0]?.vote_action === -1
                      ? require("../assets/black_thumb_down.png")
                      : require("../assets/thumbsDown.png")
                  }
                  onClick={() => this.handleVote(false)}
                  style={{ cursor: "pointer" }}
                />
              </StatefulTooltip>
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
