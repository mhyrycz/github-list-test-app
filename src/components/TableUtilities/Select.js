import React from "react";
import Select from "react-select";

const options = [
  { value: "5", label: "5", color: "#00B8D9" },
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "20", label: "20" }
];

const customStyles = {
  control: styles => ({
    ...styles,
    width: 100,
    height: 45,
    color: "white",
    backgroundColor: "#8357c5",
    borderColor: "#8357c5"
  }),
  placeholder: styles => ({ ...styles, color: "white" }),
  singleValue: styles => ({ ...styles, color: "white" })
};

const SelectComponent = props => (
  <div className="select-wrapper">
    <div className="select-label">Rows displayed:</div>
    <Select
      styles={customStyles}
      placeholder={props.filters.rows}
      onChange={e => {
        props.setRowsDisplayed(e.value);
        props.resetPage();
        props.setMaxPage(props.allRepositories.length, parseInt(e.value));
      }}
      options={options}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        color: "white",
        colors: {
          ...theme.colors,
          primary25: "#8357c5",
          primary: "#8357c5"
        }
      })}
    />
  </div>
);

export default SelectComponent;
