import React, { useState } from "react";
import "./PaginationGallery.scss"; 
import { ENV } from "../../../utils/constants";

const PaginationGallery = ({ images, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const baseApi = ENV.BASE_PATH;


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = images.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container-photos">
      <div className="gallery-photos-fundations">
        {currentItems.map((image, index) => (
          <div className="gallery-photos-fundations__item" key={index}>
            <img src={`${baseApi}/${image}`} alt="" />
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationGallery;
