import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { connect } from "react-redux";
import { createUser } from "../redux/actions";
import "../styles/Signup.css";

class Signup extends React.Component {
  state = {
    user: {
      first_name: "",
      last_name: "",
      email: "",
      nickname: "",
      github: "",
      website: "",
      other_links: "",
      username: "",
      password: "",
      is_developer: false,
    },
    isSignUpShowing: true,
  };

  handleChange(event) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit = (event) => {
    const { user } = this.state;
    const { postCallUser, hide } = this.props;
    event.preventDefault();
    postCallUser(user);
    hide();
  };

  render() {
    const { user } = this.state;
    const { isSignUpShowing, hide } = this.props;
    return (
      <Modal
        onClose={hide}
        closeable
        isOpen={isSignUpShowing}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalBody>
            <FormControl label="First name">
              <Input
                placeholder="Enter first name"
                onChange={(e) => this.handleChange(e)}
                value={user.first_name}
                name="first_name"
                required
              />
            </FormControl>
            <FormControl label="Last name">
              <Input
                placeholder="Enter last name"
                onChange={(e) => this.handleChange(e)}
                value={user.last_name}
                name="last_name"
                required
              />
            </FormControl>
            <FormControl label="Nickname">
              <Input
                placeholder="Coolest Programmer"
                name="nickname"
                onChange={(e) => this.handleChange(e)}
                value={user.nickname}
              />
            </FormControl>
            <FormControl label="Email">
              <Input
                type="email"
                placeholder="Enter Email"
                name="email"
                required
                onChange={(e) => this.handleChange(e)}
                value={user.email}
              />
            </FormControl>
            <FormControl label="Username">
              <Input
                type="text"
                placeholder="Enter Username"
                name="username"
                required
                onChange={(e) => this.handleChange(e)}
                value={user.username}
              />
            </FormControl>
            <FormControl label="Password">
              <Input
                type="password"
                placeholder="Enter Password"
                name="password"
                required
                onChange={(e) => this.handleChange(e)}
                value={user.password}
              />
            </FormControl>
            <FormControl label="Github link">
              <Input
                type="github"
                placeholder="https://github.com/username"
                name="github"
                //not required
                onChange={(e) => this.handleChange(e)}
                value={user.github}
              />
            </FormControl>
            <FormControl label="Website link">
              <Input
                type="website"
                placeholder="https://yoursite.com"
                name="website"
                //not required
                onChange={(e) => this.handleChange(e)}
                value={user.website}
              />
            </FormControl>
            <Checkbox
              checked={user.is_developer}
              labelPlacement={LABEL_PLACEMENT.right}
              name="is_developer"
              type="checkbox"
              onChange={(e) => this.handleChange(e)}
            >
              Are you a developer?
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <ModalButton type="submit" onClick={(e) => this.handleSubmit(e)}>
              Sign Up
            </ModalButton>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

//map dispatch to props update. Takes in the action and calls the reducer to passaction to reducer
const mdp = (dispatch) => {
  return { postCallUser: (user) => dispatch(createUser(user)) };
};

const msp = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(msp, mdp)(Signup);
//  <div className="signup-form">
//                     <form >
//                         <label><b>First Name</b></label>
//                         <input type="text" placeholder="Enter First Name" name="fname" required />

//                         <label><b>Last Name</b></label>
//                         <input type="text" placeholder="Enter Last Name" name="ulame" required />

//                         <label><b>Email</b></label>
//                         <input type="text" placeholder="Enter Email" name="email" required />

//                         <label><b>Username</b></label>
//                         <input type="text" placeholder="Enter Username" name="uname" required />

//                         <label><b>Password</b></label>
//                         <input type="password" placeholder="Enter Password" name="psw" required />

//                         <label>Are you a Developer?
//                         <input
//                             name="is_developer"
//                             type="checkbox"
//                             // checked={this.state.isGoing}
//                             // onChange={this.handleInputChange}
//                             />
//                         </label>
//                     </form>
//                     </div>

// import FacebookLogin from 'react-facebook-login';
// import { Card, Image } from 'react-bootstrap';

// export default () => {
//     const [login, setLogin] = useState(false);
//     const [data, setData] = useState({});
//     const [picture, setPicture] = useState('');

//     const responseFacebook = (response) => {
//       console.log(response);
//       setData(response);
//       setPicture(response.picture.data.url);
//       if (response.accessToken) {
//         setLogin(true);
//       } else {
//         setLogin(false);
//       }
//     }

/*
<button type="submit">Login</button>
    </form>
    </div>
    <div class="container">
      <Card style={{ width: '100px' }}>
        <Card.Header>
          { !login &&
            <FacebookLogin
              appId="562118384400275"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />
          }
          { login &&
            <Image src={picture} roundedCircle />
          }
        </Card.Header>
        { login &&
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              {data.email}
            </Card.Text>
          </Card.Body>
        }
      </Card>
    </div> */
