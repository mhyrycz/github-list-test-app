import React from 'react';
import Row from './Row';

const Table = ( props ) => {
    const {repos, loading} = props

    return (
    <div>
        {repos.length > 0 && !loading ? (<table>
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
                    <Row repo={repo} index={index} key={repo.id} />,
                )}
            </tbody>
        </table>
        ) : (
                <div>Not found</div>
            )
        }
    </div>
)}

export default Table;