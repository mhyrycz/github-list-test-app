import React from "react";

const SignOut = props => {
  const {
    resetUser,
    removeRepositories,
    resetFilters,
    resetFetch,
    removeState
  } = props;
  return (
    <button
      className="button sign-out"
      onClick={() => {
        resetUser();
        removeState();
        removeRepositories();
        resetFilters();
        resetFetch();
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOut;
