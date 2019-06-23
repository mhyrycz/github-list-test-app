import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { addRepositories, removeRepositories } from "../actions/repositories";
import {
  setFetch,
  setLoadingOn,
  setLoadingOff,
  setError,
  resetError,
  resetFetch
} from "../actions/fetch";
import {
  setFilters,
  setName,
  setRowsDisplayed,
  setMaxPage,
  resetPage,
  resetFilters
} from "../actions/filters";
import { setUser, resetUser } from "../actions/user";
import selectRepositories from "../selectors/repositories";
import { loadState, removeState } from "../store/configureLocalStorage";
import Select from "./Select";
import Buttons from "./Buttons";
import ListElements from "./ListElements";
import Name from "./Name";
import SignOut from "./SignOut";
import SignedUser from "./SignedUser";
import CurrentPage from "./CurrentPage";

const MAX_PER_PAGE = 50;

class List extends React.Component {
  getResponse = debounce(() => {
    const params = {
      page: 1,
      per_page: MAX_PER_PAGE,
      order: "desc",
      type: "Repositories",
      sort: "stars"
    };
    const name = this.props.filters.name;
    const token = this.props.user.token;
    if (name) {
      const AuthStr = "Bearer " + token;
      this.props.setLoadingOn();
      this.props.resetError();
      this.props.removeRepositories();
      this.props.resetPage();

      axios
        .get(
          window.encodeURI(
            `https://api.github.com/search/repositories?q=${name}`
          ),
          { params, headers: { Authorization: AuthStr } }
        )
        .then(response => {
          const repos = response.data.items;
          this.props.addRepositories(repos);
          this.props.setLoadingOff();
          this.props.setMaxPage(repos.length, this.props.filters.rows);
        })
        .catch(error => {
          this.props.setError(error.response);
          this.props.setLoadingOff();
        });
    }
  }, 1000);

  componentDidMount() {
    const localStorage = loadState();
    if (
      localStorage.repositories.length > 0 ||
      localStorage.filters.name !== "react"
    ) {
      this.props.addRepositories(localStorage.repositories);
      this.props.setFilters(localStorage.filters);
      this.props.setFetch(localStorage.fetch);
      this.props.setUser(localStorage.user.token, localStorage.user.login);
    } else {
      this.getResponse();
    }
  }

  render() {
    const {
      fetch,
      repositories,
      filters,
      setRowsDisplayed,
      allRepositories,
      setMaxPage,
      resetPage,
      resetUser,
      removeRepositories,
      resetFilters,
      resetFetch,
      user
    } = this.props;

    return (
      <div className="list-wrapper">
        <div className="list-header">
          <Name filters={filters} getResponse={this.getResponse} />
          <SignedUser user={user} />
          <SignOut
            resetUser={resetUser}
            removeRepositories={removeRepositories}
            resetFilters={resetFilters}
            resetFetch={resetFetch}
            removeState={removeState}
          />
        </div>
        <div className="table-utilities">
          <Select
            filters={filters}
            allRepositories={allRepositories}
            setRowsDisplayed={setRowsDisplayed}
            setMaxPage={setMaxPage}
            resetPage={resetPage}
          />
          <Buttons filters={filters} />
          <CurrentPage
            filters={filters}
            loading={fetch.loading}
            repositories={repositories}
          />
        </div>
        <ListElements fetch={fetch} repos={repositories} filters={filters} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    repositories: selectRepositories(state.repositories, state.filters),
    filters: state.filters,
    fetch: state.fetch,
    user: state.user,
    allRepositories: state.repositories
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addRepositories: repos => dispatch(addRepositories(repos)),
    removeRepositories: repos => dispatch(removeRepositories(repos)),
    setFilters: filters => dispatch(setFilters(filters)),
    resetFilters: () => dispatch(resetFilters()),
    setName: name => dispatch(setName(name)),
    setFetch: fetch => dispatch(setFetch(fetch)),
    resetFetch: () => dispatch(resetFetch()),
    setLoadingOn: () => dispatch(setLoadingOn()),
    setLoadingOff: () => dispatch(setLoadingOff()),
    setError: error => dispatch(setError(error)),
    resetError: () => dispatch(resetError()),
    setRowsDisplayed: rows => dispatch(setRowsDisplayed(rows)),
    setMaxPage: (reposLength, rows) => dispatch(setMaxPage(reposLength, rows)),
    resetPage: (reposLength, rows) => dispatch(resetPage(reposLength, rows)),
    setUser: (token, login) => dispatch(setUser(token, login)),
    resetUser: () => dispatch(resetUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
