import React from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createProject } from "../redux/actions";
import "../styles/SubmitIdea.css";

class SubmitIdea extends React.Component {
  state = {
    project: {
      project_submitter_id: 0,
      project_name: "",
      project_problem_statement: "",
      project_idea_summary: "",
    },
    tag: "",
  };

  handleChange(event) {
    const { userInfo } = this.props;
    const { name, value } = event.target;
    const { project, tag } = this.state;
    this.setState({
      project: {
        ...project,
        [name]: value,
        project_submitter_id: userInfo.user.id,
      },
      [name]: value
    });
  }

  handleSubmit = (event) => {
    const { project } = this.state;
    const {tag} = this.state
    event.preventDefault();
    this.props.postSubmitIdea(project, tag);
    this.closeModal();
  };

  closeModal = () => {
    return this.props.hide;
  };

  render() {
    const { userInfo } = this.props;

    const { project,tag } = this.state;
    const { isSubmitIdeaShowing } = this.props;
    return isSubmitIdeaShowing
      ? ReactDOM.createPortal(
          <React.Fragment>
            <div className="modal-overlay" />
            <div
              className="modal-wrapper"
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal">
                <div className="modal-header">
                  <h3>Hi {`${userInfo.user.first_name}`}</h3>
                  <button
                    type="button"
                    className="modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={this.props.hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="submit-idea-form">
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      <b>Idea Name</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the name of your idea!"
                      name="project_name"
                      required
                      onChange={(e) => this.handleChange(e)}
                      value={project.project_name}
                    />
                    <br></br>

                    <label>
                      <b>Problem Statement:</b>
                    </label>
                    <textarea
                      placeholder="Enter a problem statement"
                      name="project_problem_statement"
                      required
                      onChange={(e) => this.handleChange(e)}
                      value={project.project_problem_statement}
                    />
                    <br></br>

                    <br></br>
                    <label>
                      <b>Idea Summary</b>
                    </label>
                    <textarea
                      placeholder="Summary of your Idea"
                      name="project_idea_summary"
                      //not required
                      onChange={(e) => this.handleChange(e)}
                      value={project.project_idea_summary}
                    />
                     <label>
                      <b>#</b>
                    </label>
                    <input
                      placeholder="Tag it!"
                      name="tag"
                      //not required
                      onChange={(e) => this.handleChange(e)}
                      value={tag}
                    />
                    <br></br>
                    <button type="submit" className="submit-idea-btn">
                      Submit Idea
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  }
}

const mdp = (dispatch) => {
  return { postSubmitIdea: (project, tag) => dispatch(createProject(project, tag)) };
};

const msp = (state) => {
  return {
    userInfo: state.userInfo,
    project: state.project,
  };
};

export default connect(msp, mdp)(SubmitIdea);
