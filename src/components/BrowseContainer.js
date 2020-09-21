import React from 'react';
import { connect } from "react-redux";
import IdeaCard from "./IdeaCard"
import { getProjects } from "../redux/actions";

class BrowseContainer extends React.Component {

componentDidMount(){
    this.props.getProjects()
}

renderIdeas = () => {
    const {projects} = this.props.projectInfo
    return projects?.map(project => <IdeaCard key={project.id} project={project}/>)
}


    render() {

        return(
            <React.Fragment>
                <div className="idea-cards-container">
                    <h1>IDEAS!!!</h1>
                    {this.renderIdeas()}
                </div>
            </React.Fragment>
        )
    }

}

const mdp = (dispatch) => {
    return { getProjects: () => dispatch(getProjects()) };
  };
  
function msp(state) {
    return { 
        userinfo: state.userInfo,
        projectInfo: state.projectInfo
    }
  }

export default connect(msp, mdp)(BrowseContainer)