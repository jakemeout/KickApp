import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <>
        <div
          className="splash-intro"
          style={{ margin: "auto", marginTop: "12%", maxWidth: "650px" }}
        >
          <h1>Welcome to KickApp!</h1>
          <p>
            KickApp is a webapplication that allows anyone to submit an idea for
            a chance to make their idea a reality. We support a community of
            idea makers and developers who are excited and willing to take on
            building the highest ranked ideas that are submitted by you!
          </p>
        </div>
        <hr style={{ margin: "auto", marginTop: "4%", maxWidth: "900px" }} />
        <h2 style={{ margin: "auto", marginTop: "4%", textAlign: "center" }}>
          How It Works
        </h2>
        <div
          className="how-it-works-container"
          style={{ margin: "auto", marginTop: "2%", maxWidth: "900px" }}
        >
          <div className="how-it-works-section">
            <img alt="lightbulb-paper-pencil" src={require("./prop-1.png")} />
            <p>
              Write out your problem statement and your idea! It’s as simple as
              that! <br></br>You can add money and sponser your idea if you’d
              like too. <br></br>After submitting your idea you can browse and
              help rank and sponsor other ideas.
            </p>
          </div>
          <div className="how-it-works-section">
            <img alt="thumbup-thumbdown-vote" src={require("./prop-2.png")} />
            <p>
              After you idea has been submitted, the community will rank your
              idea for it to be claimed and worked on.<br></br>
              Any developer who has created an account can now browse ideas and
              claim the idea to work on. So expect a ping from a friendly dev
              :).
            </p>
          </div>
          <div className="how-it-works-section">
            <img
              alt="rocket-launch-computerscreen"
              src={require("./prop-3.png")}
            />
            <p>
              Once an idea has been claimed, a developer and the idea creator
              can launch a project together!<br></br>
              Others can view the projects, find out more details, and see their
              progress.
            </p>
          </div>
        </div>
        <div className="footer">
          <ul>
            <li><a href="mailto:jhyde@me.com"><img
            style={{ height: "20px", width: "20px"}}
              alt="email"
              src={require("./email.png")}
            />Contact</a></li>
            <li><a href="https://github.com/jakemeout"><img
            style={{ height: "20px", width: "20px"}}
              alt="github"
              src={require("./github.png")}
            />GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/jacobhyde"><img
            style={{ height: "20px", width: "20px"}}
              alt="linkedin"
              src={require("./linkedin.png")}
            />LinkedIn</a></li>
            <li><a href="https://twitter.com/jakeme0ut"><img
            style={{ height: "20px", width: "20px"}}
              alt="twitter"
              src={require("./twitter.png")}
            />Twitter</a></li>
            <li><a href="https://medium.com/@jacobosity"><img
            style={{ height: "30px", width: "30px"}}
              alt="twitter"
              src={require("./Medium.png")}
            />Medium</a></li>
          </ul>
        </div>
      </>
    );
  }
}

export default Home;
