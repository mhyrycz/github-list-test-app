import React from "react";
import Auth from "./Auth";
import List from "./List";
import { connect } from "react-redux";
import { loadState } from "../store/configureLocalStorage";

class Main extends React.Component {
  render() {
    const shouldRenderList = () => {
      const localStorage = loadState();
      if (localStorage) {
        return localStorage.user.login;
      } else {
        return false;
      }
    };

    return (
      <React.Fragment>
        {shouldRenderList() ? <List /> : <Auth />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Main);
