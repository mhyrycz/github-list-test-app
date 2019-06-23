import React from "react";

const CurrentPage = props => {
  const { filters, loading, repositories } = props;
  const getPage = () => {
    if (loading || repositories.length === 0) {
      return "Page: -/-";
    } else {
      return `Page: ${filters.page + 1}/${filters.maxPage + 1}`;
    }
  };
  return <div className="current-page">{getPage()}</div>;
};

export default CurrentPage;
