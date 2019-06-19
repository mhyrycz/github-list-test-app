import React from 'react';
import { connect } from 'react-redux';
import { setRowsDisplayed } from './actions/filters';

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
)

const mapStateToProps = (state, props) => {
    return {
        filters: state.filters
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        setRowsDisplayed: value => dispatch(setRowsDisplayed(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Select)