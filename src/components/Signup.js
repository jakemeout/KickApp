import React from 'react';
import ReactDOM from 'react-dom';
import '../Signup.css'

const Signup = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="signup-form">
                     <form >
                         <label><b>First Name</b></label>
                         <input type="text" placeholder="Enter First Name" name="fname" required /><br></br>

                         <label><b>Last Name</b></label>
                         <input type="text" placeholder="Enter Last Name" name="ulame" required /><br></br>

                         <label><b>Email</b></label>
                         <input type="text" placeholder="Enter Email" name="email" required /><br></br>

                         <label><b>Username</b></label>
                         <input type="text" placeholder="Enter Username" name="uname" required /><br></br>

                        <label><b>Password</b></label>
                         <input type="password" placeholder="Enter Password" name="psw" required /><br></br>

                        <label>Are you a Developer?
                         <input
                             name="is_developer"
                             type="checkbox"
                             // checked={this.state.isGoing}
                             // onChange={this.handleInputChange}
                             />
                        </label>
                    </form>
                    </div> 
      </div>
    </div>
  </React.Fragment>, document.body
) : null;
export default Signup;

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