import React from "react";
import Row from "./Row";
import { connect } from "react-redux";
import { setSortBy, setSortDirection } from "../actions/filters";

const Table = props => {
  const { repos, loading, filters } = props;

  const handleSortBy = newSortBy => {
    if (filters.sortBy === newSortBy) {
      props.setSortDirection();
    } else {
      props.setSortBy(newSortBy);
    }
  };

  const getColumnTitle = header => {
    const title = header.title;
    if (header.storageKey === filters.sortBy) {
      const sortDirection = filters.sortDirection ? "ASC" : "DESC";
      return `${title} (${sortDirection})`;
    } else {
      return `${title}`;
    }
  };

  const tabHeaders = [
    { title: "ID", storageKey: "id" },
    { title: "Repo title", storageKey: "name" },
    { title: "Owner", storageKey: "owner" },
    { title: "Stars", storageKey: "stargazers_count" },
    { title: "Created at", storageKey: "created_at" }
  ];

  return (
    <div>
      {repos.length > 0 && !loading ? (
        <table id="repositories">
          <thead>
            <tr>
              {tabHeaders.map((header, index) => {
                return (
                  <th
                    key={index}
                    onClick={() => {
                      handleSortBy(header.storageKey);
                    }}
                  >
                    {getColumnTitle(header)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {repos.map((repo, index) => (
              <Row repo={repo} key={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="info">Not found</div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setSortBy: sortBy => dispatch(setSortBy(sortBy)),
    setSortDirection: () => dispatch(setSortDirection())
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(Table);
