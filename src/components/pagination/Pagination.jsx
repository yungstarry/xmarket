import React, { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;

  //Limit the page Numbers shown
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimt, setMinPageNumberLimit] = useState(0);

  //paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //go to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);

    //show next set of page numbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimt + pageNumberLimit);
    }
  };

  //go to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);

    //show next set of page numbers
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimt - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className={styles.pagination}>
      <li
        onClick={() => paginatePrev()}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}
      >
        Prev
      </li>
      {pageNumbers.map((number) => {
        {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimt) {
            return (
              <li
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? `${styles.active}` : null}
              >
                {number}
              </li>
            );
          }
        }
      })}
      <li
        onClick={() => paginateNext()}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : null
        }
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{` ${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
