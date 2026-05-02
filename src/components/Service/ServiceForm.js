import React, { useRef, useState, useEffect } from "react";
import { useServiceFormContext } from "../../context/ServiceFormContext";
import { useTheme } from "../../context/ThemeContext";
import { API_BASE_URL, Image_BASE_URL } from "../../config";
import axios from "axios";
import { SweetAlert } from "../../Common/SweetAlert";
import { useNavigate } from "react-router-dom";

const ServiceForm = () => {
  const { form, updateForm, resetForm, createText, generateText } =
    useServiceFormContext();

  const { currentThemeClasses } = useTheme();
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const [allServiceTypes, setAllServiceTypes] = useState([]);
  const [preview, setPreview] = useState(null);

  // Load Service Types
  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/Products/LoadProductType`
        );

        const data = response.data?.data || response.data || [];
        setAllServiceTypes(data);
      } catch (error) {
        console.error("Error loading service types:", error);
      }
    };

    fetchServiceTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "rating") {
      updateForm(name, value === "" ? "" : Number(value));
    } else if (name === "type") {
      updateForm(name, Number(value)); // 🔥 important
    } else {
      updateForm(name, value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateForm("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  useEffect(() => {
    if (!form.id) setPreview(null);
  }, [form.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

 const formData = new FormData();

formData.append("TypeId", form.typeId);
formData.append("Name", form.name || "");
formData.append("Description", form.description || "");
formData.append("Price", form.price ? Number(form.price) : 0);
formData.append("Rating", form.rating ? Number(form.rating) : 0);

if (form.image) {
  formData.append("Image", form.image); // ✅ FIXED
}    // If editing and keeping old image
    else if (form.fileName) {
      formData.append("fileName", form.fileName);
    }

    try {
      if (form.id) {
        await axios.put(
          `${API_BASE_URL}/Products/updateproduct/${form.id}`,
          formData
        );
      } else {
        await axios.post(`${API_BASE_URL}/Products/AddProduct`, formData);
      }

      SweetAlert({
        title: form.id ? "Updated" : "Created",
        body: `<p>Service ${
          form.id ? "updated" : "created"
        } successfully.</p>`,
        icon: "success",
      });

      resetForm();
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";

      navigate("/ServiceList");
    } catch (error) {
      SweetAlert({
        title: "Error",
        body: `<p>${
          error.response?.data?.message || error.message
        }</p>`,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={`p-6 ${currentThemeClasses.form}`}>
        
        {/* TYPE */}
        <select
          name="typeId"
          value={form.typeId ?? ""}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">-- Select --</option>
          {allServiceTypes.map((serv) => (
            <option key={serv.typeId} value={serv.typeId}>
              {serv.name}
            </option>
          ))}
        </select>

        {/* NAME */}
        <input
          type="text"
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded mb-4"
        />

        {/* DESCRIPTION */}
        <input
          type="text"
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded mb-4"
        />

        {/* PRICE */}
        <input
          type="number"
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded mb-4"
        />

        {/* RATING */}
        <input
          type="number"
          name="rating"
          value={form.rating || ""}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full p-2 border rounded mb-4"
        />

        {/* IMAGE */}
        {preview && <img src={preview} width="100" alt="preview" />}
        {!preview && form.fileName && (
          <img src={`${Image_BASE_URL}${form.fileName}`} width="100" />
        )}

        <input
          type="file"
          ref={fileRef}
          onChange={handleFileChange}
          className="mb-4"
        />

        <button className={currentThemeClasses.button}>
          {form.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;