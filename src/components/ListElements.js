import React from "react";
import Table from "./Table";

const renderError = error => (
  <div>Error: {`${error.status} - ${error.message}`}</div>
);

const renderLoading = () => <div>Loading...</div>;

export default props => {
  const { error, loading } = props.fetch;
  const repos = props.repos;
  const filters = props.filters;

  if (loading) {
    return renderLoading();
  }

  if (error) {
    return renderError(error);
  }

  return (
    <div>
      <Table repos={repos} loading={loading} filters={filters} />
    </div>
  );
};
