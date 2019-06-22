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
