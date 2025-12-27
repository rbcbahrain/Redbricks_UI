import React, { createContext, useContext, useState } from "react";
import { categories } from "../data/serviceData";

const ServiceFormContext = createContext(null);

const initialState = {
  categoryId: "",
  name: "",
  price: "",
  description: "",
  rating: "",
  image: null,
};

export const useServiceFormContext = () => {
  const context = useContext(ServiceFormContext);

  if (!context) {
    throw new Error(
      "useServiceFormContext must be used within a FormProvider"
    );
  }

  return context;
};

export const ServiceFormProvider = ({ children }) => {
  const [form, setForm] = useState(initialState);
  const [createText, setCreateText] = useState("");

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(initialState);
    setCreateText("");
  };

  const generateText = () => {
    const category = categories.find(
      (c) => String(c.id) === form.categoryId
    );

    const summary = `Service "${form.name}" under category "${category?.name}" is priced at $${form.price} and takes approximately ${form.duration}.`;

    setCreateText(summary);
    return summary;
  };

  return (
    <ServiceFormContext.Provider
      value={{ form, updateForm, resetForm, createText, generateText }}
    >
      {children}
    </ServiceFormContext.Provider>
  );
};
