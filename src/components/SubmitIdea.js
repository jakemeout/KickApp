import React from "react";
import ReactDOM from "react-dom";
import { useStyletron } from "baseui";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { Textarea } from "baseui/textarea";
import { Tag, VARIANT as TAG_VARIANT } from "baseui/tag";
import { Input, StyledInput } from "baseui/input";
import { FormControl } from "baseui/form-control";

import { connect } from "react-redux";
import { createProject } from "../redux/actions";
import "../styles/SubmitIdea.css";

const InputReplacement = React.forwardRef(
  ({ tags, removeTag, ...restProps }, ref) => {
    const [css] = useStyletron();
    return (
      <div
        className={css({
          flex: "1 1 0%",
          flexWrap: "wrap",
          display: "flex",
          alignItems: "center",
        })}
      >
        {tags.map((tag, index) => (
          <Tag
            variant={TAG_VARIANT.solid}
            onActionClick={() => removeTag(tag)}
            key={index}
          >
            {tag}
          </Tag>
        ))}
        <StyledInput ref={ref} {...restProps} />
      </div>
    );
  }
);

class SubmitIdea extends React.Component {
  state = {
    project: {
      project_submitter_id: 0,
      project_name: "",
      project_problem_statement: "",
      project_idea_summary: "",
    },
    tag: "",
    tags: [],
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
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { project, tags } = this.state;
    const { postSubmitIdea, hide } = this.props;
    event.preventDefault();
    postSubmitIdea(project, tags);
    hide();
  };

  addTag = (tag) => {
    this.setState({ tags: [...this.state.tags, tag] });
  };

  removeTag = (tag) => {
    const updatedList = this.state.tags.filter((t) => t !== tag);
    this.setState({ tags: updatedList });
  };

  handleKeyDown = (event) => {
    const { tag, tags } = this.state;
    switch (event.keyCode) {
      // Enter
      case 13: {
        if (!tag) return;
        this.addTag(tag);
        this.setState({ tag: "" });
        return;
      }
      // Backspace
      case 8: {
        if (tag || !tags.length) return;
        this.removeTag(tags[tags.length - 1]);
        return;
      }
    }
  };

  render() {
    const { userInfo } = this.props;

    const { project, tag, tags } = this.state;
    const { isSubmitIdeaShowing, hide } = this.props;
    return (
      <Modal
        onClose={hide}
        closeable
        isOpen={isSubmitIdeaShowing}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>Hi {`${userInfo.user.first_name}`}</ModalHeader>
        <ModalBody>
          <FormControl label="Idea Title">
            <Input
              placeholder="Enter the name of your idea"
              name="project_name"
              required
              onChange={(e) => this.handleChange(e)}
              value={project.project_name}
            />
          </FormControl>
          <FormControl label="Problem Statement">
            <Textarea
              placeholder="Enter a problem statement"
              name="project_problem_statement"
              required
              onChange={(e) => this.handleChange(e)}
              value={project.project_problem_statement}
            />
          </FormControl>
          <FormControl label="Idea Summary">
            <Textarea
              placeholder="Summary of your idea"
              name="project_idea_summary"
              //not required
              onChange={(e) => this.handleChange(e)}
              value={project.project_idea_summary}
            />
          </FormControl>
          <FormControl label="Tag">
            <Input
              placeholder={tags.length ? "" : "Enter a tag"}
              value={tag}
              onChange={(e) => this.setState({ tag: e.currentTarget.value })}
              overrides={{
                Input: {
                  style: { width: "auto", flexGrow: 1 },
                  component: InputReplacement,
                  props: {
                    tags: tags,
                    removeTag: this.removeTag,
                    onKeyDown: this.handleKeyDown,
                  },
                },
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ModalButton type="submit" onClick={(e) => this.handleSubmit(e)}>
            Submit Idea
          </ModalButton>
        </ModalFooter>
      </Modal>
    );
  }
}

const mdp = (dispatch) => {
  return {
    postSubmitIdea: (project, tags) => dispatch(createProject(project, tags)),
  };
};

const msp = (state) => {
  return {
    userInfo: state.userInfo,
    project: state.project,
  };
};

export default connect(msp, mdp)(SubmitIdea);
