import React from "react";
import Auth from "./Auth";
import List from "./List";
import { connect } from "react-redux";
import { loadState } from "../store/configureLocalStorage";

const Main = props => {
  const shouldRenderList = () => {
    if (props.localStorage) {
      return props.localStorage.user.login;
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>{shouldRenderList() ? <List /> : <Auth />}</React.Fragment>
  );
};

const mapLocalStorageToProps = () => {
  return {
    localStorage: loadState()
  };
};

export default connect(mapLocalStorageToProps)(Main);
