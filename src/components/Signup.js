import React from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
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
    event.preventDefault();
    this.props.postCallUser(user);
    this.closeModal();
  };

  closeModal = () => {
    return this.props.hide;
  };

  render() {
    const { user } = this.state;
    const { isSignUpShowing } = this.props;
    return isSignUpShowing
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
                <div className="signup-form">
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      <b>First Name</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      name="first_name"
                      required
                      onChange={(e) => this.handleChange(e)}
                      value={user.first_name}
                    />
                    <br></br>

                    <label>
                      <b>Last Name</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      name="last_name"
                      required
                      onChange={(e) => this.handleChange(e)}
                      value={user.last_name}
                    />
                    <br></br>

                    <br></br>
                    <label>
                      <b>Nickname</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Coolest Programmer"
                      name="nickname"
                      //not required
                      onChange={(e) => this.handleChange(e)}
                      value={user.nickname}
                    />
                    <br></br>

                    <label>
                      <b>Email</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      required
                      onChange={(e) => this.handleChange(e)}
                      value={user.email}
                    />
                    <br></br>

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

                    <label>
                      <b>Github Link</b>
                    </label>
                    <input
                      type="github"
                      placeholder="https://github.com/username"
                      name="github"
                      //not required
                      onChange={(e) => this.handleChange(e)}
                      value={user.github}
                    />
                    <br></br>

                    <label>
                      <b>Website Link</b>
                    </label>
                    <input
                      type="website"
                      placeholder="https://yoursite.com"
                      name="website"
                      //not required
                      onChange={(e) => this.handleChange(e)}
                      value={user.website}
                    />
                    <br></br>

                    <label>
                      <b>Other link Link</b>
                    </label>
                    <input
                      type="other_links"
                      placeholder="https://yoursite.com"
                      name="other_links"
                      //not required
                      onChange={(e) => this.handleChange(e)}
                      value={user.other_links}
                    />

                    <label>
                      Are you a Developer?
                      <input
                        name="is_developer"
                        type="checkbox"
                        onChange={(e) => this.handleChange(e)}
                        value={user.is_developer}
                      />
                    </label>
                    <button type="submit" className="sign-up-btn">
                      Sign Up
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
