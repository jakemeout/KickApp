import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="splash-intro">
        <h1>Welcome to Kick app!</h1>
        <p>
          KickApp is where anyone who has an idea can can make their idea a
          reality. We support a community of developers who are excited and
          willing to take on the highest ranked ideas that are submitted by you!{" "}
        </p>
        <h2>How it Works</h2>
        <p>
          Write out your problem statement and your idea! It’s as simple as
          that! <br></br>You can add money and sponser your idea if you’d like
          too. <br></br>After submitting your idea you can browse and help rank
          and sponsor other ideas.
        </p>
      </div>
    );
  }
}

export default Home;
