import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Pagination from 'react-bootstrap-4-pagination';


const Paginations = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  let paginationConfig = {
    totalPages: pagesCount,
    currentPage: currentPage,
    showMax:5,
    size: "md",
    threeDots: true,
    prevNext: true,
    onClick: function (page) {
       onPageChange(page);
     }
  };

  return (
    <React.Fragment>
      <Pagination {...paginationConfig} />
    </React.Fragment>
  );
};

Paginations.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Paginations;
