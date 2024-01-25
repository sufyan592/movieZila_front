import React from "react";
import "./pagination.css";

const Pagination = ({ onPageChange, currentPage, totalPages }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={
            currentPage === i ? "pagination-active" : "pagination-number"
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
              onClick={() => onPageChange(currentPage - 1)}
              style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
            >
              Prev
            </h6>
          </div>
          <div className="pagination-list">
            <ul>{renderPageNumbers()}</ul>
          </div>
          <div>
            <h6
              className={`pagination-number`}
              onClick={() => onPageChange(currentPage + 1)}
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
