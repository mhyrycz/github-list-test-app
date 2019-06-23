import React from "react";
import { connect } from "react-redux";

const Row = props => {
  const { repo, login } = props;

  const getRepoName = repo => {
    const name = repo.name;
    if (repo.owner === login) {
      return `${name} (Your repository)`;
    } else {
      return `${name}`;
    }
  };

  return (
    <tr>
      <td>{repo.id}</td>
      <td>{getRepoName(repo)}</td>
      <td>{repo.owner}</td>
      <td>{repo.stargazers_count}</td>
      <td>{repo.created_at}</td>
    </tr>
  );
};

const mapStateToProps = state => {
  return {
    login: state.user.login
  };
};

export default connect(mapStateToProps)(Row);
