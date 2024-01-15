import React from "react";
import "./pagination.css";

const Pagination = ({ onPageChange, currentPage }) => {
  console.log(currentPage, onPageChange);
  return (
    <div>
      <section className="pagination">
        <div className="pagination-wrapper section-spacing">
          <div>
            <h6
              className={`pagination-number ${
                currentPage === 1 && "pagination-active"
              }`}
              onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
              style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
            >
              Prev
            </h6>
          </div>
          <div className="pagination-list">
            <ul>
              <li
                className={
                  currentPage === 1 ? "pagination-active" : "pagination-number"
                }
                onClick={() => onPageChange(1)}
              >
                1
              </li>
              <li
                className={
                  currentPage === 2 ? "pagination-active" : "pagination-number"
                }
                onClick={() => onPageChange(2)}
              >
                2
              </li>
            </ul>
          </div>
          <div>
            <h6
              className={`pagination-number ${
                currentPage === 2 && "pagination-active"
              }`}
              onClick={() => currentPage !== 2 && onPageChange(currentPage + 1)}
              style={{ pointerEvents: currentPage === 2 ? "none" : "auto" }}
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
