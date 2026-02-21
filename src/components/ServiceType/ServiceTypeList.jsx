import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { Image_BASE_URL } from "../../config";
import axios from "axios";
import { SweetAlert } from "../../Common/SweetAlert";
import { useNavigate } from "react-router-dom";
import { useServiceTypeContext } from "../../context/ServiceTypeFormContext";
import { useTheme } from "../../context/ThemeContext";

const ServiceTypeList = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const { updateForm, resetForm } = useServiceTypeContext();
  const { currentThemeClasses } = useTheme();
  const navigate = useNavigate();

  const fetchServiceTypes = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/ProductType/GetTypelist`
      );
      setServiceTypes(data);
    } catch (error) {
      SweetAlert({
        title: "Error",
        body: `<p>${error.message}</p>`,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const handleDelete = (id, fileName) => {
    const refval = id + "," + fileName;

    SweetAlert({
      title: "Are you sure?",
      body: "<p>This will delete the service type permanently.</p>",
      icon: "warning",
      showCancelButton: true,
      confirmText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${API_BASE_URL}/ProductType/Delete/${refval}`
          );

          SweetAlert({
            title: "Deleted",
            body: "<p>Service type deleted successfully.</p>",
            icon: "success",
          });

          fetchServiceTypes();
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

  const handleEdit = (service) => {
    updateForm("id", service.typeId);
    updateForm("categoryId", service.categoryId);
    updateForm("name", service.name);
    updateForm("desc", service.description);
    updateForm("fileName", service.fileName);
    updateForm("image", null);

    navigate("/typeForm");
  };

  const handleAddNew = () => {
    resetForm();
    navigate("/typeForm");
  };

  return (
        <div className="p-6 border rounded-lg shadow-md">
             {/* Header */}
 <div className="flex justify-between items-center mb-4">
  {/* Title centered horizontally */}
  <div className="flex-1 flex justify-center">
    <h2 className="text-xl font-semibold whitespace-nowrap">
       Service Type List
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

  {/* Table wrapper for horizontal scroll on small screens */}
  <div className="overflow-x-auto">
    <table className={`w-full border ${currentThemeClasses.inputBorder} table-auto`}>
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Description</th>
          <th className="border px-4 py-2">Image</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {serviceTypes.map((service) => (
          <tr key={service.id}>
            <td className="border px-4 py-2">{service.name}</td>
            <td className="border px-4 py-2">{service.description}</td>

            <td className="border px-4 py-2">
              {service.fileName && (
                <>
                  <img
                    src={`${Image_BASE_URL}${service.fileName}`}
                    width="50"
                    alt={service.name}
                  />
                  <div>{service.fileName.split("/").pop()}</div>
                </>
              )}
            </td>

            <td className="border px-4 py-2 flex gap-2 flex-wrap">
              <button
                className={`${currentThemeClasses.button} text-xs px-2 py-1`}
                onClick={() => handleEdit(service)}
              >
                Edit
              </button>

              <button
                className={`${currentThemeClasses.button} text-xs px-2 py-1 bg-red-600 hover:bg-red-700`}
                onClick={() =>
                  handleDelete(
                    service.typeId,
                    service.fileName?.split("/").pop()
                  )
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

        {serviceTypes.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center py-4">
              No service types found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default ServiceTypeList;