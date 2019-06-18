import React from 'react';
import axios from 'axios';
import USER_TOKEN from './token'

const MAX_PER_PAGE = 5

const Repo = ({ repo }) =>
    <tr>
        <td>{repo.id}</td>
        <td>{repo.name}</td>
        <td>{repo.owner.login}</td>
        <td>{repo.stargazers_count}</td>
        <td>{repo.created_at}</td>
    </tr>;

export default class List extends React.Component {
    state = {
            repos: [],
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

    getResponse() {
        const { params, name } = this.state
        const AuthStr = 'Bearer ' + USER_TOKEN
        axios
            .get(
                window.encodeURI(
                    `https://api.github.com/search/repositories?q=${name}+stars:<100`,
                ),
                { params , headers: { 'Authorization': AuthStr } },
            )
            .then(response => {
                const repos = response.data.items;
                this.setState({
                    repos,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false,
                });
            });
    }

    componentDidMount() {
        this.getResponse()
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({ name: event.target.value });
        this.getResponse()
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
        const { error, repos } = this.state;

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
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleChange} />
                    </label>
                </form>
                {this.state.loading ? this.renderLoading() : this.renderList()}
            </div>
        );
    }
}
