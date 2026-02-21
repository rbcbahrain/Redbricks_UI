import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import {Image_BASE_URL }from "../../config";
import axios from "axios";
import { SweetAlert } from "../../Common/SweetAlert";
import { useNavigate } from "react-router-dom";
import { useCategoryContext } from "../../context/CategoryFormContext";
import { useTheme } from "../../context/ThemeContext";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const { updateForm, resetForm } = useCategoryContext();
  const { currentThemeClasses } = useTheme();
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/ProductCategory/GetCategorylist`);
      setCategories(data);
    } catch (error) {
      SweetAlert({ title: "Error", body: `<p>${error.message}</p>`, icon: "error" });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id,fileName) => {
    var refval=id+","+fileName;
    SweetAlert({
      title: "Are you sure?",
      body: "<p>This will delete the category permanently.</p>",
      icon: "warning",
      showCancelButton: true,
      confirmText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_BASE_URL}/ProductCategory/Delete/${refval}`);
          SweetAlert({ title: "Deleted", body: "<p>Category deleted successfully.</p>", icon: "success" });
          fetchCategories();
        } catch (error) {
          SweetAlert({ title: "Error", body: `<p>${error.message}</p>`, icon: "error" });
        }
      }
    });
  };

  const handleEdit = (category) => {
    updateForm("id", category.id);
    updateForm("name", category.name);
    updateForm("desc", category.description);
    updateForm("fileName", category.fileName);
    updateForm("image", null);
    navigate("/CategoryForm");
  };

  const handleAddNew = () => {
    resetForm(); // clear form
    navigate("/CategoryForm");
  };

  return (
    <div className="p-6 border rounded-lg shadow-md">
             {/* Header */}
 <div className="flex justify-between items-center mb-4">
  {/* Title centered horizontally */}
  <div className="flex-1 flex justify-center">
    <h2 className="text-xl font-semibold whitespace-nowrap">
      Category List
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

      <table className={`w-full border ${currentThemeClasses.inputBorder}`}>
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td className="border px-4 py-2">{cat.name}</td>
              <td className="border px-4 py-2">{cat.description}</td>
            <td className="border px-4 py-2">
  {cat.fileName && (
    <>
      <img 
        src={`${Image_BASE_URL}${cat.fileName}`} 
        width="50" 
        alt={cat.name} 
      />
      <div>{cat.fileName.split('/').pop()}</div>
    </>
  )}
</td>
              <td className="border px-4 py-2">
                <button className={`${currentThemeClasses.button} mr-2`} onClick={() => handleEdit(cat)}>
                  Edit
                </button>
                <button
                  className={`${currentThemeClasses.button} bg-red-600 hover:bg-red-700`}
                  onClick={() => handleDelete(cat.id,cat.fileName.split('/').pop())}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
