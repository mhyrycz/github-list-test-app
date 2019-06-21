import React from "react";
import { setName } from "../actions/filters";
import { connect } from "react-redux";

const Name = props => {
  const { filters, getResponse, setName } = props;
  const handleChange = event => {
    const name = event.target.value;
    setName(name);
    getResponse();
  };

  return (
    <label className="input-wrapper">
      Name:
      <input
        className="input"
        type="search"
        value={filters.name}
        onChange={handleChange}
      />
    </label>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setName: name => dispatch(setName(name))
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(Name);
