import * as React from 'react';
import { useState } from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import {Layer} from 'baseui/layer';
import {ChevronDown,Delete,Overflow as UserIcon,Upload as Icon,} from 'baseui/icon';
import {Unstable_AppNavBar as AppNavBar,POSITION,} from 'baseui/app-nav-bar';
import { Link } from 'react-router-dom';

import Signup from './Signup';





function renderItem(item) {
  return item.label;
}

function renderSubmitAnIdea(){
  return  <StyledLink
  $style={{
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {color: 'inherit'},
    ':visited': {color: 'inherit'},
  }}
   href={'/submit-an-idea'}
>
  Submit an idea
</StyledLink>
} 

function renderBrowseIdeas(){
  return  <StyledLink
  $style={{
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {color: 'inherit'},
    ':visited': {color: 'inherit'},
  }}
   href={'/map'}
>
  Browse Ideas
</StyledLink>
} 




function renderLogin() {
 
  return <StyledLink
  $style={{
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {color: 'inherit'},
    ':visited': {color: 'inherit'},
  }}
  href={'/login'}
>
  Log In
</StyledLink>
}

function renderSavedIdeas() {
    return <StyledLink
  $style={{
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {color: 'inherit'},
    ':visited': {color: 'inherit'},
  }}
  href={'/SavedIdeas'}
>
  Saved Ideas
</StyledLink>
}

function renderProfile() {
    return <StyledLink
  $style={{
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {color: 'inherit'},
    ':visited': {color: 'inherit'},
  }}
  href={'/login'}
>
  Profile
</StyledLink>
}

const appDisplayName = (
  <StyledLink
    $style={{
      textDecoration: 'none',
      color: 'inherit',
      ':hover': {color: 'inherit'},
      ':visited': {color: 'inherit'},
    }}
    href={'/'}
  >
  <img className="logo" src={require('./brainlight.png')} />
  </StyledLink>
);

const MAIN_NAV = [

  {
    icon: Icon,
    item: {label: 'Travel'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
    navExitIcon: Delete,
    navPosition: {desktop: POSITION.horizontal},
    // nav: [
    //   {
    //     icon: Icon,
    //     item: {label: 'Create Trip'},
    //     mapItemToNode: renderCreateTrip,
    //     mapItemToString: renderItem,
    //   },
    //   {
    //     icon: Icon,
    //     item: {label: 'View Saved Trips'},
    //     mapItemToNode: renderSavedTrips,
    //     mapItemToString: renderItem,
    //   },
    // ],
  },
 
];




function isActive(arr, item, activeItem) {
  let active = false;
  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    if (elm === item) {
      if (item === activeItem) return true;
      return isActive(
        (item && item.nav) || [],
        activeItem,
        activeItem,
      );
    } else if (elm.nav) {
      active = isActive(elm.nav || [], item, activeItem);
    }
  }
  return active;
}


export default ({loggedIn, logout, currentUser}) => {

    const [isShowing, setIsShowing] = useState(false);
      
    

    const [css] = useStyletron();
    const [activeNavItem, setActiveNavItem] = React.useState();
    const containerStyles = css({
        boxSizing: 'border-box',
        width: '100vw',
        position: 'fixed',
        top: '0',
        left: '0',
    });
    
    const LOGIN_NAV = [
        {
          icon: Icon,
          item: {label: 'Log In'},
          mapItemToNode: renderLogin,
          mapItemToString: renderItem,
        },
        {
          icon: Icon,
          item: {label: 'Sign Up'},
          mapItemToNode: renderSignUp,
          mapItemToString: renderItem,
        }
      ] 
    
    

    function renderSignUp() {

        return <StyledLink
        $style={{
          textDecoration: 'none',
          color: 'inherit',
          ':hover': {color: 'inherit'},
          ':visited': {color: 'inherit'},
        }}
        onClick={() => setIsShowing(true)}

      >
        Sign Up
      </StyledLink>
      
      }

    function logOut() {
        return <StyledLink
        onClick={logout}
        $style={{
        textDecoration: 'none',
        color: 'inherit',
        ':hover': {color: 'inherit'},
        ':visited': {color: 'inherit'},
        }}
        href={'/'}
    >
        Log Out
    </StyledLink>
    }

    const USER_NAV = [
        {
        icon: UserIcon,
        item: {label: 'Saved Ideas'},
        mapItemToNode: renderSavedIdeas,
        mapItemToString: renderItem,
        },
        {
        icon: UserIcon,
        item: {label: 'Profile'},
        mapItemToNode: renderProfile,
        mapItemToString: renderItem,
        },
        {
        icon: UserIcon,
        item: {label: 'Logout'},
        mapItemToNode: logOut,
        mapItemToString: renderItem,
        }
    ];

    const userName = currentUser && currentUser.user && 
    `${currentUser.user.first_name} ${currentUser.user.last_name}`
    
    const nickName = currentUser && currentUser.user && 
    `${currentUser.user.nickname}`

    return (
        <React.Fragment>
            <Layer>
            <Signup 
            isShowing={isShowing}
            hide={()=> setIsShowing(false)}
            />
            <div className={containerStyles}>
                <AppNavBar
                appDisplayName={appDisplayName}
                mainNav={loggedIn ? MAIN_NAV : LOGIN_NAV}
                isNavItemActive={({item}) => {
                    return (
                    item === activeNavItem ||
                    isActive(MAIN_NAV, item, activeNavItem)
                    );
                }}
                onNavItemSelect={({item}) => {
                    if(item === activeNavItem)
                    return setActiveNavItem(null)
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