import React from 'react';

const PaginationInfo = ({ currentPage, itemsPerPage, totalItems }) => {
  let startIndex, endIndex;
  console.log(totalItems,"11")

  if (totalItems === 0) {
    startIndex = 0;
    endIndex = 0;
  } else {
    startIndex = (currentPage - 1) * 10 + 1;
    endIndex = Math.min(currentPage * 10, totalItems);
    if (endIndex < startIndex) {
        startIndex = endIndex;
      }
    console.log(startIndex,endIndex,totalItems)
  }

  return (
    <p className="text-sm ml-4 mt-4 text-gray-600">
      {totalItems === 0
        ? `${startIndex}-${endIndex} of ${totalItems}`
        : `Showing ${startIndex}-${endIndex} of ${totalItems}`
      }
    </p>
  );
};

export default PaginationInfo;
