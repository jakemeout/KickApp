import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="splash-intro">
        <h1>Welcome to KickApp!</h1>
        <p>
          KickApp is a webapplication that allows anyone to sumit an idea and make their idea a
          reality. We support a community of developers who are excited and
          willing to take on building the highest ranked ideas that are submitted by you!
        </p>
        <hr />
        <h2 className="how-it-works">How it Works</h2>
        <div className="how-it-works-container-imgs">
          <div className="how-it-works-container">
            <div className="how-it-works-prop-1">
              <img
                className="img-prop-1"
                alt="lightbulb-paper-pencil"
                src={require("./prop-1.png")}
              />
              <p className="prop-1">
                Write out your problem statement and your idea! It’s as simple
                as that! <br></br>You can add money and sponser your idea if
                you’d like too. <br></br>After submitting your idea you can
                browse and help rank and sponsor other ideas.
              </p>
            </div>
            <div className="how-it-works-prop-2">
              <img
                className="img-prop-2"
                alt="thumbup-thumbdown-vote"
                src={require("./prop-2.png")}
              />
              <p className="prop-2">
                After you idea has been submitted, the community will rank your
                idea for it to be claimed and worked on.<br></br>
                Any developer who has created an account can now browse ideas
                and claim the idea to work on. So expect a ping from a friendly
                dev :).
              </p>
            </div>
            <div className="how-it-works-prop-2">
              <img
                className="img-prop-3"
                alt="rocket-launch-computerscreen"
                src={require("./prop-3.png")}
              />
              <p className="prop-3">
                Once an idea has been claimed, a developer and the idea creator
                can launch a project together!<br></br>
                Others can view the projects, find out more details, and see
                their progress.
              </p>
            </div>
          </div>
        </div>
        <div className="footer">
          <ul>
          <li>Contact</li>
          <li>GitHub</li>
          <li>LinkedIn</li>
          <li>Twitter</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
