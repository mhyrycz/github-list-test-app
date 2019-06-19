import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import USER_TOKEN from './token';
import debounce from "lodash/debounce";
import { addRepositories, removeRepositories } from './actions/repositories'

const MAX_PER_PAGE = 10

const Repo = ({ repo }) =>
    <tr>
        <td>{repo.id}</td>
        <td>{repo.name}</td>
        <td>{repo.owner.login}</td>
        <td>{repo.stargazers_count}</td>
        <td>{repo.created_at}</td>
    </tr>;

class List extends React.Component {
    state = {
            loading: true,
            error: null,
            name: "react",
            params: {
                page: 1,
                per_page: MAX_PER_PAGE,
                order: "desc",
                type: "Repositories",
                sort: "stars",
            },
    };

    getResponse = debounce(() => {
        const { params, name } = this.state
        const AuthStr = 'Bearer ' + USER_TOKEN
        this.props.dispatch(removeRepositories());
        this.setState({
            loading: true,
        });
        axios
            .get(
                window.encodeURI(
                    `https://api.github.com/search/repositories?q=${name}+stars:<100`,
                ),
                { params , headers: { 'Authorization': AuthStr } },
            )
            .then(response => {
                const repos = response.data.items;
                this.props.dispatch(addRepositories(repos));
                this.setState({
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false,
                });
            });
        
    },1000)

    componentDidUpdate(prevProps, prevState) {
        if (prevState.name !== this.state.name) {
            this.getResponse()
        }
    }

    componentDidMount() {
        this.getResponse()
    }

    handleChange = event => {
        this.setState({ name: event.target.value });

    }

    renderLoading() {
        return (
            <div>
                Loading...
            </div>
        );
    }

    renderError() {
        return (
            <div>
                <div>
                    Error: {this.state.error.response.data.message}
                </div>
            </div>
        );
    }

    renderList() {
        const { error } = this.state;
        const repos = this.props.repositories

        if (error) {
            console.log(error);
            return this.renderError();
        }

        return (
            <table>
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
        );
    }

    render() {
        return( 
            <div>
                <form>
                    <label>
                        Name:
                        <input type="search" value={this.state.name} onChange={this.handleChange} />
                    </label>
                </form>
                {this.state.loading ? this.renderLoading() : this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        repositories: state.repositories,
    };
}


export default connect(mapStateToProps)(List)