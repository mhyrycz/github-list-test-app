import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import USER_TOKEN from "../token";
import debounce from "lodash/debounce";
import { addRepositories, removeRepositories } from "../actions/repositories";
import {
  setLoadingOn,
  setLoadingOff,
  setError,
  resetError
} from "../actions/fetch";
import {
  setName,
  setRowsDisplayed,
  setMaxPage,
  resetPage
} from "../actions/filters";
import selectRepositories from "../selectors/repositories";
import Select from "./Select";
import Buttons from "./Buttons";
import ListElements from "./ListElements";
import Name from "./Name";

const MAX_PER_PAGE = 20;

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
    if (name) {
      const AuthStr = "Bearer " + USER_TOKEN;
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
    this.getResponse();
  }

  render() {
    const {
      fetch,
      repositories,
      filters,
      setRowsDisplayed,
      allRepositories,
      setMaxPage,
      resetPage
    } = this.props;

    return (
      <div>
        <Name filters={filters} getResponse={this.getResponse} />
        <Select
          filters={filters}
          allRepositories={allRepositories}
          setRowsDisplayed={setRowsDisplayed}
          setMaxPage={setMaxPage}
          resetPage={resetPage}
        />
        <Buttons filters={filters} />
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
    allRepositories: state.repositories
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addRepositories: repos => dispatch(addRepositories(repos)),
    removeRepositories: repos => dispatch(removeRepositories(repos)),
    setName: name => dispatch(setName(name)),
    setLoadingOn: () => dispatch(setLoadingOn()),
    setLoadingOff: () => dispatch(setLoadingOff()),
    setError: error => dispatch(setError(error)),
    resetError: () => dispatch(resetError()),
    setRowsDisplayed: rows => dispatch(setRowsDisplayed(rows)),
    setMaxPage: (reposLength, rows) => dispatch(setMaxPage(reposLength, rows)),
    resetPage: (reposLength, rows) => dispatch(resetPage(reposLength, rows))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
