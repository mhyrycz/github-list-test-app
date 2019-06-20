import React from 'react';

const Select = (props) => (
    <div>
        <select
            defaultValue = {props.filters.rows}
            onChange={(e) => {
                props.setRowsDisplayed(e.target.value)
            }}
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
        </select>
    </div>
);

export default Select;