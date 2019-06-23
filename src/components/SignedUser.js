import React from "react";

const SignedUser = props => (
  <div className="signed-user">
    Signed in as <span className="bold">{`${props.user.login}`}</span>
  </div>
);

export default SignedUser;
