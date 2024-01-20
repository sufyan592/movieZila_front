import React from "react";
import "./pagination.css";

const Pagination = ({ onPageChange, currentPage, totalMovies, pageSize }) => {
  const totalPages = Math.ceil(totalMovies / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={
            currentPage === i && i !== 1 && i !== 2
              ? "pagination-active"
              : "pagination-number"
          }
          onClick={() => onPageChange(i)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <section className="pagination">
        <div className="pagination-wrapper section-spacing">
          <div>
            <h6
              className={`pagination-number`}
              onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
              style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
            >
              Prev
            </h6>
          </div>
          <div>
            <h6
              className={`pagination-number ${
                currentPage === 1 ? "pagination-active" : ""
              }`}
              onClick={() => onPageChange(1)}
              style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
            >
              1
            </h6>
          </div>
          <div>
            <h6
              className={`pagination-number ${
                currentPage === 2 ? "pagination-active" : ""
              }`}
              onClick={() => onPageChange(2)}
              style={{ pointerEvents: currentPage === 2 ? "none" : "auto" }}
            >
              2
            </h6>
          </div>
          <div className="pagination-list">
            <ul>{renderPageNumbers()}</ul>
          </div>
          <div>
            <h6
              className={`pagination-number ${
                currentPage === totalPages ? "pagination-active" : ""
              }`}
              onClick={() =>
                currentPage !== totalPages && onPageChange(currentPage + 1)
              }
              style={{
                pointerEvents: currentPage === totalPages ? "none" : "auto",
              }}
            >
              Next
            </h6>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pagination;
