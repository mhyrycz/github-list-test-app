import React from "react";

const Select = props => (
  <label>
     Rows displayed:
    <select
      defaultValue={props.filters.rows}
      onChange={e => {
        props.setRowsDisplayed(e.target.value);
        props.resetPage();
        props.setMaxPage(
          props.allRepositories.length,
          parseInt(e.target.value)
        );
      }}
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
  </label>
);

export default Select;
