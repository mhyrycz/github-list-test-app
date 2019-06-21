import React from "react";
import { connect } from "react-redux";
import { increasePage, decreasePage } from "../actions/filters";

const PaginationButtons = props => {
  const { page, maxPage } = props.filters;

  const currentPage = `${page + 1}/${maxPage + 1}`;

  const isButtonDisabled = button => {
    if (button === "previous") {
      if (page === 0) {
        return true;
      }
    } else if (button === "next") {
      if (page === maxPage || maxPage === null) {
        return true;
      }
    }
  };

  return (
    <div className="button-wrapper">
      <button
        className="button"
        disabled={isButtonDisabled("previous")}
        onClick={props.decreasePage}
      >
        Previous page
      </button>

      <button
        className="button"
        disabled={isButtonDisabled("next")}
        onClick={props.increasePage}
      >
        Next page
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    increasePage: () => dispatch(increasePage()),
    decreasePage: () => dispatch(decreasePage())
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(PaginationButtons);
