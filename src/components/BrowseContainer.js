import React from 'react';
import { connect } from "react-redux";
import '../styles/BrowseContainer.css'
import IdeaCard from "./IdeaCard"
import { getProjects } from "../redux/actions";

class BrowseContainer extends React.Component {

componentDidMount(){
this.props.getProjects();
}

renderIdeas = () => {
   this.props.projects.map(project => <IdeaCard project={project}/>)
}


    render() {
        console.log(this.props)
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

function mdp(dispatch) {
    return {getProjects: () => dispatch(getProjects())}
  }

  
function msp(state) {
    return state;
  }

export default connect(mdp, msp)(BrowseContainer)