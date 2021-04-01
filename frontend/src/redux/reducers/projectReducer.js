import {
  SUBMIT_PROJECT_IDEA,
  ERROR,
  GET_ALL_PROJECTS,
  GET_SAVED,
  DELETE_SAVED,
  CLAIM,
  UNCLAIM,
  GET_CLAIMED,
  GET_ALL_CLAIMED,
  START_PROJECT,
  COMPLETE_PROJECT,
  ABANDON_PROJECT,
  SAVE,
  VOTE
} from "../actionTypes";
const initialState = {
  project: {},
  projects: [],
  savedProjects: [],
  claimedProjects: [],
  AllClaimedProjects: [],
  error: null,
  searchTerm: "",
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_PROJECT_IDEA:
      return {
        ...state,
        projects: action.projects,
      };
    case GET_ALL_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      };
    case START_PROJECT:
      return {
        ...state,
        claimedProjects: action.claimedProjects,
      };
    case COMPLETE_PROJECT:
      return {
        ...state,
        claimedProjects: action.claimedProjects,
      };
    case ABANDON_PROJECT:
      return {
        ...state,
        claimedProjects: action.claimedProjects,
      };
    case SAVE:
      return {
        ...state,
        savedProjects: action.savedProjects,
      };
    case CLAIM:
      return {
        ...state,
        claimedProjects: action.claimedProjects,
      };
      case VOTE:
      return {
        ...state,
        projects: action.projects,
      };
    case GET_CLAIMED:
      return {
        ...state,
        claimedProjects: action.claimedProjects,
      };
    case GET_ALL_CLAIMED:
      return {
        ...state,
        AllClaimedProjects: action.AllClaimedProjects,
      };
    case UNCLAIM:
      return {
        ...state,
        claimedProjects: action.claimedProjects,
      };
    case GET_SAVED:
      return {
        ...state,
        savedProjects: action.savedProjects,
      };
    case DELETE_SAVED:
      return {
        ...state,
        savedProjects: action.savedProjects,
      };
    case ERROR:
      return {
        ...state,
        ...action.error,
      };
    default:
      return state;
  }
};
export default projectReducer;
