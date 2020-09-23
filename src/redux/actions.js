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
  BROWSE,
} from "../redux/actionTypes";

export function createUser(user) {
  const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  return (dispatch) => {
    fetch("http://localhost:3001/api/v1/users", {
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
    fetch("http://localhost:3001/api/v1/login", {
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
      .then((user) => getSavedProjects(user))
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
};

export const getProfileFetch = () => {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    if (token) {
      return fetch("http://localhost:3001/api/v1/profile", {
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

export function createProject(project) {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    dispatch({ type: SUBMIT_PROJECT_IDEA });
    fetch("http://localhost:3001/api/v1/projects", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project: project }),
    })
      .then((resp) => resp.json())
      .then((project) => {
        dispatch({ type: SUBMIT_PROJECT_IDEA, project });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export function getProjects() {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    dispatch({ type: BROWSE });
    fetch("http://localhost:3001/api/v1/projects", {
      method: "GET",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((projects) => {
        dispatch({ type: GET_ALL_PROJECTS, projects });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export function patchAddVote(updatedProject) {
  const token = Cookies.get("jwt");
  return (dispatch) => {
    fetch(`http://localhost:3001/api/v1/projects/${updatedProject.id}`, {
      method: "PATCH",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project: updatedProject }),
    })
      .then((resp) => resp.json())
      .then((project) => {
        dispatch({ type: VOTE, project });
      })
      .catch((err) => {
        dispatch({ type: ERROR, err });
      });
  };
}

export function postSaveProject(project, user) {
  const token = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`http://localhost:3001/api/v1/save`, {
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
    return fetch(`http://localhost:3001/api/v1/save/${user?.id}`, {
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
    fetch(`http://localhost:3001/api/v1/save/${savedUserid}`, {
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
