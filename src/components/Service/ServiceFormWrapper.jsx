// src/components/Service/ServiceFormWrapper.jsx
import { FormProvider } from "../../context/FormContext";
import ServiceForm from "./ServiceForm";

const ServiceFormWrapper = () => {
  const initialState = {
    categoryId: "",
    name: "",
    price: "",
    desc: "",
    duration: "",
    image: null,
  };

  return (
    <FormProvider initialState={initialState}>
      <ServiceForm />
    </FormProvider>
  );
};

export default ServiceFormWrapper;
