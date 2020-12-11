import * as React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
import { ChevronDown, Delete, Overflow, Upload } from "baseui/icon";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import SubmitIdea from "./SubmitIdea";
function renderItem(item) {
  return item.label;
}

// function renderProjects() {
//   return (
//     <Link
//       style={{
//         textDecoration: "none",
//         color: "inherit",
//         ":hover": { color: "inherit" },
//         ":visited": { color: "inherit" },
//       }}
//       to={"/projects"}
//     >
//       Projects
//     </Link>
//   );
// }

function renderSavedIdeas() {
  return (
    <Link
      style={{
        textDecoration: "none",
        color: "inherit",
        ":hover": { color: "inherit" },
        ":visited": { color: "inherit" },
      }}
      to={"/saved"}
    >
      Saved Ideas
    </Link>
  );
}

// function renderClaimedIdeas() {
//   return (
//     <Link
//       style={{
//         textDecoration: "none",
//         color: "inherit",
//         ":hover": { color: "inherit" },
//         ":visited": { color: "inherit" },
//       }}
//       to={"/claimed"}
//     >
//       Claimed Ideas
//     </Link>
//   );
// }

// function renderProfile() {
//   return (
//     <StyledLink
//       $style={{
//         textDecoration: "none",
//         color: "inherit",
//         ":hover": { color: "inherit" },
//         ":visited": { color: "inherit" },
//       }}
//       href={"/login"}
//     >
//       Profile
//     </StyledLink>
//   );
// }

const appDisplayName = () => {
  return (
    <Link to="/">
    <img style={{width: "50px", height: "60px"}} src={require('../assets/brainlight.png').default}/>
    </Link>
  )
};

// function isActive(arr, item, activeItem) {
//   let active = false;
//   for (let i = 0; i < arr.length; i++) {
//     const elm = arr[i];
//     if (elm === item) {
//       if (item === activeItem) return true;
//       return isActive((item && item.nav) || [], activeItem, activeItem);
//     } else if (elm.nav) {
//       active = isActive(elm.nav || [], item, activeItem);
//     }
//   }
//   return active;
// }

export const Navbar = ({ userInfo }) => {
  const { loggedIn, user } = userInfo;
  const [isSignUpShowing, setIsSignUpShowing] = useState(false);
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [isSubmitIdeaShowing, setIsSubmitIdeaShowing] = useState(false);

  const [mainItems, setMainItems] = useState([
    {
      icon: Upload,
      label: "Submit an Idea"
    },
    {
      icon: Upload,
      label: "Browse Ideas"
    },
    {
      icon: Upload,
      label: "Projects"
    }
  ]);

  const LOGIN_NAV = [
    {
      icon: Upload,
       label: "Log In",
  
    },
    {
      icon: Upload,
      label: "Sign Up",
    },
  ];

  // const USER_NAV = [
  //   {
  //     icon: UserIcon,
  //     item: { label: "Saved Ideas" },
  //     mapItemToNode: renderSavedIdeas,
  //     mapItemToString: renderItem,
  //   },
  //   {
  //     icon: UserIcon,
  //     item: { label: "Claimed Ideas" },
  //     mapItemToNode: renderClaimedIdeas,
  //     mapItemToString: renderItem,
  //   },
  //   // {
  //   //   icon: UserIcon,
  //   //   item: { label: "Profile" },
  //   //   mapItemToNode: renderProfile,
  //   //   mapItemToString: renderItem,
  //   // },
  //   {
  //     icon: UserIcon,
  //     item: { label: "Logout" },
  //     mapItemToNode: logOut,
  //     mapItemToString: renderItem,
  //   },
  // ];


  // function renderBrowseIdeas() {
  //   return (
  //     <Link
  //       style={{
  //         textDecoration: "none",
  //         color: "inherit",
  //         ":hover": { color: "inherit" },
  //         ":visited": { color: "inherit" },
  //       }}
  //       to="/browse"
  //     >
  //       Browse Ideas
  //     </Link>
  //   );
  // }

  // function renderSubmitAnIdea() {
  //   return (
  //     <StyledLink
  //       $style={{
  //         textDecoration: "none",
  //         color: "inherit",
  //         ":hover": { color: "inherit" },
  //         ":visited": { color: "inherit" },
  //       }}
  //       onClick={() => setIsSubmitIdeaShowing(true)}
  //     >
  //       Submit an idea
  //     </StyledLink>
  //   );
  // }

  // function renderLogin() {
  //   return (
  //     <StyledLink
  //       $style={{
  //         textDecoration: "none",
  //         color: "inherit",
  //         ":hover": { color: "inherit" },
  //         ":visited": { color: "inherit" },
  //       }}
  //       onClick={() => setIsLoginShowing(true)}
  //     >
  //       Log In
  //     </StyledLink>
  //   );
  // }

  // function renderSignUp() {
  //   return (
  //     <StyledLink
  //       $style={{
  //         textDecoration: "none",
  //         color: "inherit",
  //         ":hover": { color: "inherit" },
  //         ":visited": { color: "inherit" },
  //       }}
  //       onClick={() => setIsSignUpShowing(true)}
  //     >
  //       Sign Up
  //     </StyledLink>
  //   );
  // }

  // function logOut() {
  //   return (
  //     <StyledLink
  //       $style={{
  //         textDecoration: "none",
  //         color: "inherit",
  //         ":hover": { color: "inherit" },
  //         ":visited": { color: "inherit" },
  //       }}
  //       onClick={() => Cookies.remove("jwt")}
  //       href={"/"}
  //     >
  //       Log Out
  //     </StyledLink>
  //   );
  // }
  const userName = user && `${user.first_name} ${user.last_name}`;

  const nickName = user && `${user.nickname}`;
  console.log(mainItems)
  return (
    // <React.Fragment>
    //   <Layer>
    //     <Signup
    //       isSignUpShowing={isSignUpShowing}
    //       hide={() => setIsSignUpShowing(false)}
    //     />
    //     <Login
    //       isLoginShowing={isLoginShowing}
    //       hide={() => setIsLoginShowing(false)}
    //     />
    //     <SubmitIdea
    //       isSubmitIdeaShowing={isSubmitIdeaShowing}
    //       hide={() => setIsSubmitIdeaShowing(false)}
    //     />
    //     <div className={containerStyles}>
    <AppNavBar
    title={appDisplayName()}
    mainItems={loggedIn ? mainItems : LOGIN_NAV}
    onMainItemSelect={item => {
      setMainItems(prev => setItemActive(prev, item));
    }}
    username={userName}
    usernameSubtitle={nickName}
    userItems={[
      { icon: Overflow, label: "Saved Ideas" },
      { icon: Overflow, label: "Claimed Ideas" }
    ]}
    onUserItemSelect={item => console.log(item)}
  />
  );
};

export default Navbar;
