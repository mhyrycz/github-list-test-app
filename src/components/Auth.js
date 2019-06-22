import React from "react";
import { setUser } from "../actions/user";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import axios from "axios";
import {
  setLoadingOn,
  setLoadingOff,
  setError,
  resetError
} from "../actions/fetch";
import { renderLoading, renderError } from "./Messages";

const Name = props => {
  const { setUser, fetch } = props;
  const handleChange = event => {
    const token = event.target.value;
    token && getResponse(token);
  };

  const getResponse = debounce(token => {
    const AuthStr = "Bearer " + token;
    props.setLoadingOn();
    props.resetError();
    axios
      .get(window.encodeURI("https://api.github.com/user"), {
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        setUser(token, response.data.login);
      })
      .catch(error => {
        props.setError(error.response);
        props.setLoadingOff();
      });
  }, 1000);

  return (
    <div className="auth">
      <div className="auth-header">GitHub Repositories</div>
      <input
        placeholder="Provide GitHub authentication token..."
        className="auth-input"
        type="search"
        onChange={handleChange}
      />
      <button class="button sign-in">Sign In</button>
      {fetch.error && renderError(fetch.error)}
      {fetch.loading && renderLoading()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    fetch: state.fetch
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setUser: (token, login) => dispatch(setUser(token, login)),
    setLoadingOn: () => dispatch(setLoadingOn()),
    setLoadingOff: () => dispatch(setLoadingOff()),
    setError: error => dispatch(setError(error)),
    resetError: () => dispatch(resetError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Name);
