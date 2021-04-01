import React from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";

import { logInUser } from "../redux/actions";
import "../styles/Login.css";

class Login extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
    },
  };

  handleChange(event) {
    const { name, value } = event.target;
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

  closeModal = () => {
    return this.props.hide;
  };

  render() {
    const { user } = this.state;
    const { isLoginShowing, hide } = this.props;

    return (
      <Modal
        onClose={hide}
        closeable
        isOpen={isLoginShowing}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <ModalHeader>Log In</ModalHeader>
          <ModalBody>
            <FormControl label="Username">
              <Input
                placeholder="Enter Username"
                onChange={(e) => this.handleChange(e)}
                name="username"
                value={user.username}
              />
            </FormControl>
            <FormControl label="Password">
              <Input
                placeholder="Enter Password"
                onChange={(e) => this.handleChange(e)}
                name="password"
                type="password"
                value={user.password}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ModalButton type="submit" onClick={(e) => this.handleSubmit(e)}>
              Log In
            </ModalButton>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}
const mdp = (dispatch) => {
  return { postCallUser: (user) => dispatch(logInUser(user)) };
};

const msp = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(msp, mdp)(Login);

//FACBOOK LOGIN AUTH

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
