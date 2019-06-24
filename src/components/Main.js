import React from "react";
import Auth from "./Auth";
import Repositories from "./Repositories";
import { connect } from "react-redux";
import { loadState } from "../store/configureLocalStorage";

const Main = props => {
  const shouldRenderRepositories = () => {
    if (props.localStorage) {
      return props.localStorage.user.login;
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      {shouldRenderRepositories() ? <Repositories /> : <Auth />}
    </React.Fragment>
  );
};

const mapLocalStorageToProps = () => {
  return {
    localStorage: loadState()
  };
};

export default connect(mapLocalStorageToProps)(Main);
