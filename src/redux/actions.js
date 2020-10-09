import Cookies from "js-cookie";
import {
  CREATE_CURRENT_USER,
  ERROR,
  SUBMIT_PROJECT_IDEA,
  GET_ALL_PROJECTS,
  VOTE,
  SAVE,
  GET_SAVED,
  DELETE_SAVED,
  CLAIM,
  UNCLAIM,
  GET_CLAIMED,
  START_PROJECT,
  COMPLETE_PROJECT,
  GET_ALL_CLAIMED,
  ABANDON_PROJECT,
} from "../redux/actionTypes";

export function createUser(user) {
  const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  return (dispatch) => {
    fetch("https://kicksterapp-api.herokuapp.com/api/v1/users", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        setCookie("jwt", user.jwt, 1);
        dispatch({ type: CREATE_CURRENT_USER, user });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export const logInUser = (user) => {
  const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  return (dispatch) => {
    fetch("https://kicksterapp-api.herokuapp.com/api/v1/login", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        setCookie("jwt", user.jwt, 1);
        dispatch({ type: CREATE_CURRENT_USER, user });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
};

export const getProfileFetch = () => {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    if (token) {
      return fetch("https://kicksterapp-api.herokuapp.com/api/v1/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((user) => {
          dispatch({ type: CREATE_CURRENT_USER, user });
        })
        .catch((err) => {
          dispatch({ type: ERROR, err });
        });
    }
  };
};

export function createProject(project, tags) {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    fetch("https://kicksterapp-api.herokuapp.com/api/v1/projects", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project, tags }),
    })
      .then((resp) => resp.json())
      .then(({ projects }) => {
        dispatch({ type: SUBMIT_PROJECT_IDEA, projects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export function getProjects() {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    fetch("https://kicksterapp-api.herokuapp.com/api/v1/projects", {
      method: "GET",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then(({ projects }) => {
        dispatch({ type: GET_ALL_PROJECTS, projects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export function postAddVote(project, user, vote_action) {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    fetch(`https://kicksterapp-api.herokuapp.com/api/v1//votes`, {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        project_id: project.id,
        user_id: user.id, 
        vote_action: vote_action
      })
    })
      .then((resp) => resp.json())
      .then(({projects}) => {
        dispatch({ type: VOTE, projects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export function postSaveProject(project, user) {
  const token = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`https://kicksterapp-api.herokuapp.com/api/v1/save`, {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project_id: project.id,
        user_id: user.id,
      }),
    })
      .then((resp) => resp.json())
      .then(({ savedProjects }) => {
        dispatch({ type: SAVE, savedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
}

export function getSavedProjects(user) {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    return fetch(`https://kicksterapp-api.herokuapp.com/api/v1/save/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then(({ savedProjects }) => {
        dispatch({ type: GET_SAVED, savedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export function removeSavedProject(savedUserid) {
  const token = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`https://kicksterapp-api.herokuapp.com/api/v1/save/${savedUserid}`, {
      method: "DELETE",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then(({ savedProjects }) => {
        dispatch({ type: DELETE_SAVED, savedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
}

export function postClaimedProject(project, user) {
  const token = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`https://kicksterapp-api.herokuapp.com/api/v1/claim`, {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project_id: project.id,
        user_id: user.id,
      }),
    })
      .then((resp) => resp.json())
      .then(({ claimedProjects }) => {
        dispatch({ type: CLAIM, claimedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
}

export function unClaimProject(claimedUserid) {
  const token = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`https://kicksterapp-api.herokuapp.com/api/v1/claim/${claimedUserid}`, {
      method: "DELETE",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then(({ claimedProjects }) => {
        dispatch({ type: UNCLAIM, claimedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
}

export function getClaimed(user) {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    return fetch(`https://kicksterapp-api.herokuapp.com/api/v1/claimed/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then(({ claimedProjects }) => {
        dispatch({ type: GET_CLAIMED, claimedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export function getAllClaimed() {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    return fetch(`https://kicksterapp-api.herokuapp.com/api/v1/claimed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then(({ AllClaimedProjects }) => {
        dispatch({ type: GET_ALL_CLAIMED, AllClaimedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export function postStartProject(project) {
  const token = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`https://kicksterapp-api.herokuapp.com/api/v1/start_project`, {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project_id: project.id,
      }),
    })
      .then((resp) => resp.json())
      .then(({ claimedProjects }) => {
        dispatch({ type: START_PROJECT, claimedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
}

export function postCompleteProject(project) {
  const token = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`https://kicksterapp-api.herokuapp.com/api/v1/complete_project`, {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project_id: project.id,
      }),
    })
      .then((resp) => resp.json())
      .then(({ claimedProjects }) => {
        dispatch({ type: COMPLETE_PROJECT, claimedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
}

export function postAbandonProject(project) {
  const token = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`https://kicksterapp-api.herokuapp.com/api/v1/abandon_project`, {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project_id: project.id,
      }),
    })
      .then((resp) => resp.json())
      .then(({ claimedProjects }) => {
        dispatch({ type: ABANDON_PROJECT, claimedProjects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
}
