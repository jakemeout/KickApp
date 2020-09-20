import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { logInUser } from "../redux/actions";
import "../styles/Login.css";

class Login extends React.Component {

  state = {
    user:{ 
      username: "",
    password: ""
    }
  }

  handleChange(event) {
    const { name, value } = event.target
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
    event.preventDefault()
    this.props.postCallUser(user)
    this.closeModal()
  }
  
  closeModal = () => {
    return this.props.hide
  }

  render() {
    const { user } = this.state;
    const { isLoginShowing } = this.props;
    return isLoginShowing
      ? ReactDOM.createPortal(
          <React.Fragment>
            <div className="modal-overlay" />
            <div
              className="modal-wrapper"
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal">
                <div className="modal-header">
                  <button
                    type="button"
                    className="modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={this.props.hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="login-form">
                  <form onSubmit={this.handleSubmit}>
                  <label>
                      <b>Username</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      required
                      onChange={(e) => this.handleChange(e)}
                      value={user.username}
                    />
                    <br></br>

                    <label>
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      required
                      onChange={(e) => this.handleChange(e)}
                      value={user.password}
                    />
                    <br></br>
                    <button type="submit" className="sign-up-btn" >
                      Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
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
