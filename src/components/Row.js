import React from 'react';

const Row = ({ repo }) =>
    <tr>
        <td>{repo.id}</td>
        <td>{repo.name}</td>
        <td>{repo.owner.login}</td>
        <td>{repo.stargazers_count}</td>
        <td>{repo.created_at}</td>
    </tr>;

export default Row