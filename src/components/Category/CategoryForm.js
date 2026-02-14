import React, { useRef, useEffect ,useState} from "react";
import { useCategoryContext } from "../../context/CategoryFormContext";
import { useTheme } from "../../context/ThemeContext";
import { API_BASE_URL } from "../../config";
import {Image_BASE_URL }from "../../config";
import axios from "axios";
import { SweetAlert } from "../../Common/SweetAlert";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
  const { form, updateForm, resetForm } = useCategoryContext();
  const { currentThemeClasses } = useTheme();
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateForm(e.target.name, e.target.value);
  };
const [preview, setPreview] = useState(null);
    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateForm("image", file);        // store the file in form state
      setPreview(URL.createObjectURL(file)); // create live preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("filename", form.fileName);
    formData.append("description", form.desc);
    if (form.image) formData.append("image", form.image); // only new file
    formData.append("status", true);

    try {
      if (form.id) {
        // Update
        await axios.put(`${API_BASE_URL}/ProductCategory/UpdateCategory/${form.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        SweetAlert({
          title: "Updated",
          body: "<p>Category updated successfully.</p>",
          icon: "success",
        });
      } else {
        // Create
        await axios.post(`${API_BASE_URL}/ProductCategory/AddCategory`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        SweetAlert({
          title: "Created",
          body: "<p>Category created successfully.</p>",
          icon: "success",
        });
      }

      resetForm();
      if (fileRef.current) fileRef.current.value = "";
      navigate("/CategoryList");
    } catch (error) {
  const errorMessage =
    error.response?.data?.message ||
    error.response?.data ||
    error.message ||
    "Something went wrong";
      SweetAlert({
        title: "Error",
        body: `<p>${errorMessage}</p>`,
        icon: "error",
        confirmText: "Close",
      });
    }
  };

  // Reset form if navigating to create new
  useEffect(() => {
    if (!form.id) resetForm();
  }, [form.id]);

  return (
    <div className="p-6">
      <div className="mb-4 text-sm text-gray-600">
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/CategoryList")}
        >
          🏠 Home
        </span>
        <span className="mx-1">&gt;</span>
        <span>{form.id ? "Edit Category" : "Create Category"}</span>
      </div>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={`p-6 rounded shadow ${currentThemeClasses.form}`}
      >
        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>Category Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
          />
        </div>

        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>Description:</label>
          <input
            type="text"
            name="desc"
            value={form.desc}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
          />
        </div>

        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>Image:</label> 


         {/* Show preview if a new file is selected */}
          {preview && (
            <div className="mb-2">
              <img src={preview} width="100" alt="Preview" />
            </div>
          )}

          {/* Show existing server image if no new file selected */}
          {!preview && form.fileName && (
            <div className="mb-2">
              <img src={`${Image_BASE_URL}${form.fileName}`} width="100" alt="Current" />
            </div>
          )}
          <input
            type="file"
            ref={fileRef}
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
          />
        </div>

        <button type="submit" className={currentThemeClasses.button}>
          {form.id ? "Update Category" : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
