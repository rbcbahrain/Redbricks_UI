import React, { useEffect, useState, useMemo } from "react";
import { API_BASE_URL, Image_BASE_URL } from "../../config";
import axios from "axios";
import { SweetAlert } from "../../Common/SweetAlert";
import { useNavigate } from "react-router-dom";
import { useServiceFormContext } from "../../context/ServiceFormContext";
import { useTheme } from "../../context/ThemeContext";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { updateForm, resetForm } = useServiceFormContext();
  const { currentThemeClasses } = useTheme();
  const navigate = useNavigate();

  // Fetch Services
  const fetchServices = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/Products/getproductlist`
      );
      setServices(data);
    } catch (error) {
      SweetAlert({
        title: "Error",
        body: `<p>${error.message}</p>`,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Search + Sort
  const filteredServices = useMemo(() => {
    let filtered = services.filter((srv) =>
      srv.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [services, search, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedData = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete
  const handleDelete = (id, fileName) => {
    const refval = id + "," + fileName;

    SweetAlert({
      title: "Are you sure?",
      body: "<p>This will delete the service permanently.</p>",
      icon: "warning",
      showCancelButton: true,
      confirmText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${API_BASE_URL}/Products/deleteproduct/${refval}`
          );

          SweetAlert({
            title: "Deleted",
            body: "<p>Service deleted successfully.</p>",
            icon: "success",
          });

          fetchServices();
        } catch (error) {
          SweetAlert({
            title: "Error",
            body: `<p>${error.message}</p>`,
            icon: "error",
          });
        }
      }
    });
  };

  // Edit
  const handleEdit = (service) => {
    updateForm("id", service.id);
    updateForm("categoryId", service.categoryId);
    updateForm("serviceTypeId", service.serviceTypeId);
    updateForm("name", service.name);
    updateForm("description", service.description);
    updateForm("price", service.price);
    updateForm("rating", service.rating);
    updateForm("fileName", service.fileName);
    updateForm("image", null);

    navigate("/ServiceForm");
  };

  const handleAddNew = () => {
    resetForm();
    navigate("/ServiceForm");
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md">



         <div className="flex justify-between items-center mb-4">
  {/* Title centered horizontally */}
  <div className="flex-1 flex justify-center">
    <h2 className="text-xl font-semibold whitespace-nowrap">
      Service List
    </h2>
  </div>

  {/* Button aligned to right */}
  <div className="flex-1 flex justify-end">
    <button
      className={`${currentThemeClasses.button} text-xs px-4 py-2 w-auto inline-block`}
      onClick={handleAddNew}
    >
      + Add
    </button>
  </div>
  </div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search service..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`mb-4 w-full p-2 border rounded ${currentThemeClasses.inputBorder}`}
      />

      <table className={`w-full border ${currentThemeClasses.inputBorder}`}>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")} className="cursor-pointer border px-4 py-2">Name</th>
            <th onClick={() => handleSort("price")} className="cursor-pointer border px-4 py-2">Price</th>
            <th onClick={() => handleSort("rating")} className="cursor-pointer border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((srv) => (
            <tr key={srv.id}>
              <td className="border px-4 py-2">{srv.name}</td>
              <td className="border px-4 py-2">{srv.price}</td>
              <td className="border px-4 py-2">{srv.rating}</td>
              <td className="border px-4 py-2">
                {srv.fileName && (
                  <img
                    src={`${Image_BASE_URL}${srv.fileName}`}
                    width="50"
                    alt={srv.name}
                  />
                )}
              </td>
              <td className="border px-4 py-2">
                <button
                  className={`${currentThemeClasses.button} mr-2`}
                  onClick={() => handleEdit(srv)}
                >
                  Edit
                </button>
                <button
                  className={`${currentThemeClasses.button} bg-red-600 hover:bg-red-700`}
                  onClick={() =>
                    handleDelete(srv.typeId, srv.fileName?.split("/").pop())
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {paginatedData.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No services found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;