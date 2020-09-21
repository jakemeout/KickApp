import React from "react";
import { connect } from "react-redux";
import Moment from "moment";
import { patchAddVote } from "../redux/actions";

class IdeaCard extends React.Component {
  state = {
    upVoteClicked: false,
    downVoteClicked: false,
    project: this.props.project ? this.props.project : 0,
  };
  GetFormattedDate = (date) => {
    Moment.locale("en");
    var dt = date;
    return Moment(dt).format("LLLL");
  };
  handleSave = () => {
    console.log("It's THE CARD BOOKMARK CLICK");
  };

  handleSponsor = () => {
    console.log("It's THE CARD SPONSOR CLICK");
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
    const { project } = this.props;
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-author">
            <div className="ellipses"></div>
            <div className="submitter-name">{`${project.project_submitter.first_name} ${project.project_submitter.last_name}`}</div>
            <div className="total-sponsored">
              Total Sponsored: {project.sponsor_amount}
            </div>
            <div className="bookark-div">
              <img
                className="bookmark"
                src={require("./bookmark.png")}
                onClick={() => this.handleSave()}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="sponsor">
              <img
                className="sponsor-card"
                src={require("./sponsor.png")}
                onClick={() => this.handleSponsor()}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="tags-votes">
            <div className="num-upvote">
              {this.state.project.num_up_votes}
              <img
                className="thumbsup"
                src={require("./thumbsUp.png")}
                onClick={() => this.handleVote(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="num-downvote">
              {this.state.project.num_down_votes}
              <img
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
              Submitted on: {this.GetFormattedDate(project.created_at)}
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
      </React.Fragment>
    );
  }
}

function msp(state) {
  return {
    userinfo: state.userInfo,
  };
}
const mdp = (dispatch) => {
  return {
    patchAddVote: (project) => dispatch(patchAddVote(project)),
  };
};

export default connect(msp, mdp)(IdeaCard);

// abandoned: false
// abandoned_date: null
// archived: false
// archived_date: null
// completed: false
// created_at: "2020-09-20T01:55:42.663Z"
// id: 1
// in_progress: false
// is_claimed: false
// num_down_votes: null
// num_up_votes: null
// project_developer_id: 1
// project_end_date: null
// project_idea_summary: null
// project_name: "test"
// project_problem_statement: null
// project_start_date: null
// project_started: false
// project_submitter_id: 1
// sponsor_amount: null
// updated_at: "2020-09-20T0
