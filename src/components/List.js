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
  increasePage,
  decreasePage,
  setMaxPage,
  resetPage
} from "../actions/filters";
import selectRepositories from "../selectors/repositories";
import Select from "./Select";
import ListElements from "./ListElements";

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
  }, 1000);

  componentDidMount() {
    this.getResponse();
  }

  handleChange = event => {
    this.props.setName(event.target.value);
    this.getResponse();
  };

  isButtonDisabled = button => {
    const { page, maxPage } = this.props.filters;
    if (button === "previous") {
      if (page === 0) {
        return true;
      }
    } else if (button === "next") {
      if (page === maxPage) {
        return true;
      }
    }
  };

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
        <form>
          <label>
            Name:
            <input
              type="search"
              value={this.props.filters.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Rows displayed:
            <Select
              filters={filters}
              allRepositories={allRepositories}
              setRowsDisplayed={setRowsDisplayed}
              setMaxPage={setMaxPage}
              resetPage={resetPage}
            />
          </label>
        </form>
        <button
          disabled={this.isButtonDisabled("previous")}
          onClick={this.props.decreasePage}
        >
          Previous page
        </button>
        <button
          disabled={this.isButtonDisabled("next")}
          onClick={this.props.increasePage}
        >
          Next page
        </button>
        <ListElements fetch={fetch} repos={repositories} />
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
    increasePage: () => dispatch(increasePage()),
    decreasePage: () => dispatch(decreasePage()),
    setMaxPage: (reposLength, rows) => dispatch(setMaxPage(reposLength, rows)),
    resetPage: (reposLength, rows) => dispatch(resetPage(reposLength, rows))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
