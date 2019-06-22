import React from "react";

export const renderError = error => (
  <div className="info">Error: {`${error.status} - ${error.message}`}</div>
);

export const renderLoading = () => <div className="info">Loading...</div>;
