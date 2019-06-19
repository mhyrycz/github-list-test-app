import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import USER_TOKEN from './token';
import debounce from "lodash/debounce";
import { addRepositories, removeRepositories } from './actions/repositories';
import { setLoadingOn, setLoadingOff, setError, resetError } from './actions/fetch';
import { setName } from './actions/filters';
import selectRepositories from './selectors/repositories';
import Select from './Select';

const MAX_PER_PAGE = 20

const Repo = ({ repo }) =>
    <tr>
        <td>{repo.id}</td>
        <td>{repo.name}</td>
        <td>{repo.owner.login}</td>
        <td>{repo.stargazers_count}</td>
        <td>{repo.created_at}</td>
    </tr>;

class List extends React.Component {

    getResponse = debounce(() => {
        const params = {
            page: 1,
            per_page: MAX_PER_PAGE,
            order: "desc",
            type: "Repositories",
            sort: "stars",
        }
        const name = this.props.filters.name
        const AuthStr = 'Bearer ' + USER_TOKEN
        this.props.setLoadingOn();
        this.props.resetError();
        this.props.removeRepositories();

        axios
            .get(
                window.encodeURI(
                    `https://api.github.com/search/repositories?q=${name}+stars:<100`,
                ),
                { params , headers: { 'Authorization': AuthStr } },
            )
            .then(response => {
                const repos = response.data.items;
                this.props.addRepositories(repos);
                this.props.setLoadingOff();
            })
            .catch(error => {
                this.props.setError(error.response)
                this.props.setLoadingOff();
            });
        
    },1000)

    componentDidMount() {
        this.getResponse()
    }

    handleChange = event => {
        this.props.setName(event.target.value)
        this.getResponse()
    }

    renderLoading() {
        return (
            <div>
                Loading...
            </div>
        );
    }

    renderError(error) {
        return (
            <div>
                <div>
                    Error: {`${error.status} - ${error.message}`}
                </div>
            </div>
        );
    }

    renderList() {
        const { error, loading } = this.props.fetch;

        const repos = this.props.repositories

        if (error) {
            return this.renderError(error);
        }

        return (
            <div>
                {repos.length > 0 && !loading  ? ( <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Repo Title</th>
                            <th>Owner</th>
                            <th>Stars</th>
                            <th>Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repos.map((repo, index) =>
                            <Repo repo={repo} index={index} key={repo.id} />,
                        )}
                    </tbody>
                </table>
               ) : (
                <div>Not found</div>
               )
                }
            </div>

        );
    }

    render() {
        return( 
            <div>
                <form>
                    <label>
                        Name:
                        <input type="search" value={this.props.filters.name} onChange={this.handleChange} />
                    </label>
                    <label>
                        Rows displayed:
                        <Select />
                    </label>
                </form>
                {this.props.fetch.loading ? this.renderLoading() : this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        repositories: selectRepositories(state.repositories, state.filters),
        filters: state.filters,
        fetch: state.fetch,
    };
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        addRepositories: repos => dispatch(addRepositories(repos)),
        removeRepositories: repos => dispatch(removeRepositories(repos)),
        setName: name => dispatch(setName(name)),
        setLoadingOn: () => dispatch(setLoadingOn()),
        setLoadingOff: () => dispatch(setLoadingOff()),
        setError: error => dispatch(setError(error)),
        resetError: () => dispatch(resetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)