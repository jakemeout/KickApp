import * as React from "react";
import { useState } from "react";
import { useStyletron } from "baseui";
import { StyledLink } from "baseui/link";
import { Layer } from "baseui/layer";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import {
  ChevronDown,
  Delete,
  Overflow as UserIcon,
  Upload as Icon,
} from "baseui/icon";
import { Unstable_AppNavBar as AppNavBar, POSITION } from "baseui/app-nav-bar";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import SubmitIdea from "./SubmitIdea"; 


function renderItem(item) {
  return item.label;
}

function renderSavedIdeas() {
  return (
    <StyledLink
      $style={{
        textDecoration: "none",
        color: "inherit",
        ":hover": { color: "inherit" },
        ":visited": { color: "inherit" },
      }}
      href={"/SavedIdeas"}
    >
      Saved Ideas
    </StyledLink>
  );
}

function renderProfile() {
  return (
    <StyledLink
      $style={{
        textDecoration: "none",
        color: "inherit",
        ":hover": { color: "inherit" },
        ":visited": { color: "inherit" },
      }}
      href={"/login"}
    >
      Profile
    </StyledLink>
  );
}

const appDisplayName = (
  <StyledLink
    $style={{
      textDecoration: "none",
      color: "inherit",
      ":hover": { color: "inherit" },
      ":visited": { color: "inherit" },
    }}
    href={"/"}
  >
    <img className="logo" src={require("./brainlight.png")} />
  </StyledLink>
);

function isActive(arr, item, activeItem) {
  let active = false;
  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    if (elm === item) {
      if (item === activeItem) return true;
      return isActive((item && item.nav) || [], activeItem, activeItem);
    } else if (elm.nav) {
      active = isActive(elm.nav || [], item, activeItem);
    }
  }
  return active;
}

export const Navbar = ({ userInfo }) => {
  const { loggedIn, user } = userInfo;
  const [isSignUpShowing, setIsSignUpShowing] = useState(false);
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [isSubmitIdeaShowing, setIsSubmitIdeaShowing] = useState(false);

  const [css] = useStyletron();
  const [activeNavItem, setActiveNavItem] = React.useState();
  const containerStyles = css({
    boxSizing: "border-box",
    width: "100vw",
    position: "fixed",
    top: "0",
    left: "0",
  });

  const LOGIN_NAV = [
    {
      icon: Icon,
      item: { label: "Log In" },
      mapItemToNode: renderLogin,
      mapItemToString: renderItem,
    },
    {
      icon: Icon,
      item: { label: "Sign Up" },
      mapItemToNode: renderSignUp,
      mapItemToString: renderItem,
    },
  ];

  const USER_NAV = [
    {
      icon: UserIcon,
      item: { label: "Saved Ideas" },
      mapItemToNode: renderSavedIdeas,
      mapItemToString: renderItem,
    },
    {
      icon: UserIcon,
      item: { label: "Profile" },
      mapItemToNode: renderProfile,
      mapItemToString: renderItem,
    },
    {
      icon: UserIcon,
      item: { label: "Logout" },
      mapItemToNode: logOut,
      mapItemToString: renderItem,
    },
  ];

  const MAIN_NAV = [
    {
      icon: Icon,
      item: { label: "Submit an Idea" },
      mapItemToNode: renderSubmitAnIdea,
      mapItemToString: renderItem,
      navExitIcon: Delete,
      navPosition: { desktop: POSITION.horizontal },
    },
    {
      icon: Icon,
      item: { label: "Browse Ideas" },
      mapItemToNode: renderBrowseIdeas,
      mapItemToString: renderItem,
      navExitIcon: Delete,
      navPosition: { desktop: POSITION.horizontal },
    },
  ];

  function renderBrowseIdeas() {
    return (
      <StyledLink
        $style={{
          textDecoration: "none",
          color: "inherit",
          ":hover": { color: "inherit" },
          ":visited": { color: "inherit" },
        }}
        href={"/browse"}
      >
        Browse Ideas
      </StyledLink>
    );
  }

  function renderSubmitAnIdea() {
    return (
      <StyledLink
        $style={{
          textDecoration: "none",
          color: "inherit",
          ":hover": { color: "inherit" },
          ":visited": { color: "inherit" },
        }}
        onClick={() => setIsSubmitIdeaShowing(true)}
      >
        Submit an idea
      </StyledLink>
    );
  }

  function renderLogin() {
    return (
      <StyledLink
        $style={{
          textDecoration: "none",
          color: "inherit",
          ":hover": { color: "inherit" },
          ":visited": { color: "inherit" },
        }}
        onClick={() => setIsLoginShowing(true)}
      >
        Log In
      </StyledLink>
    );
  }

  function renderSignUp() {
    return (
      <StyledLink
        $style={{
          textDecoration: "none",
          color: "inherit",
          ":hover": { color: "inherit" },
          ":visited": { color: "inherit" },
        }}
        onClick={() => setIsSignUpShowing(true)}
      >
        Sign Up
      </StyledLink>
    );
  }

  function logOut() {
    return (
      <StyledLink
        $style={{
          textDecoration: "none",
          color: "inherit",
          ":hover": { color: "inherit" },
          ":visited": { color: "inherit" },
        }}
        onClick={() => Cookies.remove('jwt')}
        href={"/"}
      >
        Log Out
      </StyledLink>
    );
  }

 

  const userName = user && `${user.first_name} ${user.last_name}`;

  const nickName = user && `${user.nickname}`;

  return (
    <React.Fragment>
      <Layer>
        <Signup
          isSignUpShowing={isSignUpShowing}
          hide={() => setIsSignUpShowing(false)}
        />
        <Login
          isLoginShowing={isLoginShowing}
          hide={() => setIsLoginShowing(false)}
        />
        <SubmitIdea
          isSubmitIdeaShowing={isSubmitIdeaShowing}
          hide={() => setIsSubmitIdeaShowing(false)}
        />
        

        <div className={containerStyles}>
          <AppNavBar
            appDisplayName={appDisplayName}
            mainNav={loggedIn ? MAIN_NAV : LOGIN_NAV}
            isNavItemActive={({ item }) => {
              return (
                item === activeNavItem ||
                isActive(MAIN_NAV, item, activeNavItem)
              );
            }}
            onNavItemSelect={({ item }) => {
              if (item === activeNavItem) return setActiveNavItem(null);
              setActiveNavItem(item);
            }}
            userNav={loggedIn && USER_NAV}
            username={userName}
            usernameSubtitle={nickName}
            userImgUrl=""
          />
        </div>
      </Layer>
    </React.Fragment>
  );
};

// const mdp = (dispatch) => {
//   return {};
// };

// const msp = (state) => {
//   return {
//     user: state.user,
//   };
// };

// export default connect(mdp, msp)(Navbar);
export default Navbar;
