import {
    SUBMIT_PROJECT_IDEA,
    ERROR,
    GET_ALL_PROJECTS
    // SIGNUP
    } from "../actionTypes";
    const initialState = {
      project: {},
      projects: {},
      error: null
    };

    const projectReducer = (state = initialState, action) => {
      switch (action.type) {
        case SUBMIT_PROJECT_IDEA:
          return {
            ...state,
            ...action.project,
          }
        case GET_ALL_PROJECTS:
        return {
            ...state,
            ...action.projects,
        }
        case ERROR:
            return {
              ...state,
              error: action.error
          }
        default:
          return state;
      }
    };
    export default projectReducer;
    