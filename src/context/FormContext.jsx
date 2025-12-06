import React, { createContext, useContext, useState } from "react";
import { categories } from "../data/serviceData"; // import your category data here

// Create context
const FormContext = createContext();

// Custom hook for consuming context
export const useFormContext = () => useContext(FormContext);

  const initialState = {
    categoryId: "",
    name: "",
    price: "",
    desc:"",
    duration: "",
    image: null,
  };
// Provider component
export const FormProvider = ({ children }) => {
  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    price: "",
    desc:"",
    duration: "",
    image: null,
  });

  const [createText, setCreateText] = useState("");

  const updateForm = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialState);
    setCreateText("");
  };

  const generateText = () => {
    const category = categories.find((c) => String(c.id) === form.categoryId);
    const summary = `Service "${form.name}" under category "${category?.name}" is priced at $${form.price} and takes approximately ${form.duration}.`;
    setCreateText(summary);
    return summary;
  };

  return (
    <FormContext.Provider
      value={{
        form,
        updateForm,
         resetForm,
        createText,
        generateText,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
