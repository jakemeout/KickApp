import React from "react";
import { connect } from "react-redux";
import { getProjects } from "../redux/actions";
import {
  StatefulDataTable,
  StringColumn,
} from 'baseui/data-table';

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
        mapDataToValue: (data) => data?.project_name,
      }),
      StringColumn({
        title: "Problem Statement",
        maxWidth: 200,
        mapDataToValue: (data) => data?.project_problem_statement,
      }),
      StringColumn({
        title: "Idea Summary",
        maxWidth: 200,
        lineClamp: 3,
        mapDataToValue: (data) => data?.project_idea_summary,
      }),
      StringColumn({
        title: "Status",
        mapDataToValue: (data) => this.renderProjectStatus(data),
      }),
      StringColumn({
        title: "Start date",
        mapDataToValue: (data) => data?.project_start_date,
      }),
      StringColumn({
        title: "Estimated end date",
        mapDataToValue: (data) => data?.project_end_date,
      }),
      StringColumn({
        title: "Completion date",
        mapDataToValue: (data) => data?.completion_date,
      }),
      StringColumn({
        title: "Up Votes",
        mapDataToValue: (data) => data?.num_up_votes,
      }),
      StringColumn({
        title: "Down Votes",
        mapDataToValue: (data) => data?.num_down_votes,
      }),
      StringColumn({
        title: "Sponsored Amount",
        maxWidth: 50,
        mapDataToValue: (data) => data?.sponsor_amount,
      }),

    ];

    const rows = (projects?.filter( a => a?.project_started === true) || [])?.map((r) => ({ id: r?.title, data: r }));
    return (
      <div style={{ height: "600px", margin: "auto", marginTop: "15%" }}>
        <StatefulDataTable
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
