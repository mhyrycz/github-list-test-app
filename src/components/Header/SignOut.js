import React from "react";

const SignOut = props => (
  <button
    className="button sign-out"
    onClick={() => {
      props.resetUser();
      props.removeState();
      props.removeRepositories();
      props.resetFilters();
      props.resetFetch();
    }}
  >
    Sign Out
  </button>
);

export default SignOut;
