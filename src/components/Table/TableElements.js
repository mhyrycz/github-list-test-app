import React from "react";
import Table from "./Table";
import { renderLoading, renderError } from "../Messages";

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
    <React.Fragment>
      <Table repos={repos} loading={loading} filters={filters} />
    </React.Fragment>
  );
};
