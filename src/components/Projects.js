import React from "react";
import { connect } from "react-redux";
import { getProjects } from "../redux/actions";
import {
  Unstable_StatefulDataTable,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
} from "baseui/data-table";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    props.getProjects();
  }

  renderProjectStatus = (project) => {
    if (project.in_progress) {
      return "In Progress";
    } else if (project.completed) {
      return "Completed";
    } else if (project.abandoned) {
      return "Abandoned";
    } else if (project.started) {
      return "Started (not in progress)";
    }
    return "Not Started";
  };

  render() {
    const { projects } = this.props.projectInfo;

    const columns = [
      StringColumn({
        title: "Submitter",
        mapDataToValue: (data) =>
          `${data.project_submitter.first_name} ${data.project_submitter.last_name}`,
      }),
      StringColumn({
        title: "Developer",
        mapDataToValue: (data) =>
          `${data.project_developer?.first_name} ${data.project_developer?.last_name}`,
      }),
      StringColumn({
        title: "Title",
        mapDataToValue: (data) => data.project_name,
      }),
      StringColumn({
        title: "Problem Statement",
        maxWidth: 200,
        mapDataToValue: (data) => data.project_problem_statement,
      }),
      StringColumn({
        title: "Idea Summary",
        maxWidth: 200,
        mapDataToValue: (data) => data.project_idea_summary,
      }),
      StringColumn({
        title: "Status",
        mapDataToValue: (data) => this.renderProjectStatus(data),
      }),
      StringColumn({
        title: "Start date",
        mapDataToValue: (data) => data.project_start_date,
      }),
      StringColumn({
        title: "End date",
        mapDataToValue: (data) => data.project_end_date,
      }),
      StringColumn({
        title: "Up Votes",
        mapDataToValue: (data) => data.num_up_votes,
      }),
      StringColumn({
        title: "Down Votes",
        mapDataToValue: (data) => data.num_down_votes,
      }),
      StringColumn({
        title: "Sponsored Amount",
        maxWidth: 50,
        mapDataToValue: (data) => data.num_down_votes,
      }),

      // abandoned: false
      // abandoned_date: null
      // archived: false
      // archived_date: null
      // completed: false
      // created_at: "2020-09-24T17:58:54.326Z"
      // id: 5
      // in_progress: false
      // is_claimed: false
      // num_down_votes: null
      // num_up_votes: null
      // project_developer_id: null
      // project_end_date: null
      // project_idea_summary: "BEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEF"
      // project_name: "BEEF"
      // project_problem_statement: "BEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEF"
      // project_start_date: null
      // project_started: false
      // project_submitter: {id: 3, first_name: "Greg ", last_name: "Dwyer", email: "beef@beef.com", username: "greg", …}
      // project_submitter_id: 3
      // sponsor_amount: null
      // updated_at: "2020-09-24T17:58:54.326Z"
    ];

    const rows = (projects || []).map((r) => ({ id: r.title, data: r }));
    return (
      <div style={{ height: "600px", margin: "auto", marginTop: "15%" }}>
        <Unstable_StatefulDataTable
          columns={columns}
          rows={rows}
          rowHeight={78}
        />
      </div>
    );
  }
}
const mdp = (dispatch) => {
  return {
    getProjects: () => dispatch(getProjects()),
  };
};

function msp(state) {
  return {
    userInfo: state.userInfo,
    projectInfo: state.projectInfo,
  };
}

export default connect(msp, mdp)(Projects);
