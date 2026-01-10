import React, { createContext, useContext, useState } from "react";

// 1️⃣ Create context
const ServiceTypeContext = createContext();

// 2️⃣ Hook to use context
export const useServiceTypeContext = () => useContext(ServiceTypeContext);

// 3️⃣ Initial state
const initialState = {
  name: "",
  description: "",
  image: null,
};

// 4️⃣ Provider component
export const ServiceTypeFormProvider = ({ children }) => {
  const [form, setForm] = useState(initialState);
  const [createText, setCreateText] = useState("");

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setForm(initialState);
    setCreateText("");
  };

  const generateText = () => {
    const summary = `ServiceType "${form.name}".`;
    setCreateText(summary);
    return summary;
  };


  return (
    <ServiceTypeContext.Provider
      value={{
        form,
        updateForm,
        createText,
        generateText,
        resetForm,
      }}
    >
      {children}
    </ServiceTypeContext.Provider>
  );
};
