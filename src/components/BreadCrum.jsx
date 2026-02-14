import React from "react";

const Breadcrumb = ({ title }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <span className="flex items-center gap-1 text-blue-600 cursor-pointer">
        🏠 Home
      </span>
      <span>{">"}</span>
      <span className="font-medium text-gray-800">
        {title}
      </span>
    </div>
  );
};

export default Breadcrumb;
