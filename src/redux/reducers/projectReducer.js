import {
    SUBMIT_PROJECT_IDEA,
    ERROR,
    GET_ALL_PROJECTS,
    GET_SAVED,
    DELETE_SAVED
    } from "../actionTypes";
    const initialState = {
      project: {},
      projects: [],
      savedProjects: [],

      error: null
    };

    const projectReducer = (state = initialState, action) => {
      console.log(action.savedProjects)
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
        case GET_SAVED:
        return {
            ...state,
            ...action.savedProjects,
        }
        case DELETE_SAVED:
        return {
            ...state,
            ...action.savedProjects,
        }
        case ERROR:
          return {
            ...state,
            ...action.error
          }
        default:
          return state;
      }
    };
    export default projectReducer;
    