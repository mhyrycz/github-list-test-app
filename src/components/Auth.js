import React from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import axios from "axios";
import { setUser } from "../actions/user";
import {
  setLoadingOn,
  setLoadingOff,
  setError,
  resetError
} from "../actions/fetch";
import { renderLoading, renderError } from "./Messages";

class Name extends React.Component {
  state = {
    token: ""
  };

  handleTokenChange = event => {
    this.setState({ token: event.target.value });
  };

  handleSigning = () => {
    this.getResponse(this.state.token);
  };

  isButtonDisabled = () => {
    return !this.state.token;
  };

  getResponse = debounce(token => {
    const {
      setUser,
      resetError,
      setError,
      setLoadingOn,
      setLoadingOff
    } = this.props;
    const AuthStr = "Bearer " + token;
    setLoadingOn();
    resetError();
    axios
      .get(window.encodeURI("https://api.github.com/user"), {
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        setUser(token, response.data.login);
      })
      .catch(error => {
        setError(error.response);
        setLoadingOff();
      });
  }, 1000);

  render() {
    const { fetch } = this.props;
    return (
      <div className="auth-wrapper">
        <div className="auth-header">GitHub Repositories</div>
        <input
          placeholder="Provide GitHub authentication token..."
          className="auth-input"
          type="search"
          onChange={this.handleTokenChange}
        />
        <button
          disabled={this.isButtonDisabled()}
          className="button sign-in"
          onClick={this.handleSigning}
        >
          Sign In
        </button>
        {fetch.error && renderError(fetch.error)}
        {fetch.loading && renderLoading()}
      </div>
    );
  }
}

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
