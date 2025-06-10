import { useState } from "react";

export const useForm = (initialState) => {
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on typing
  };

  // Validation logic
  const validateFields = () => {
    let valid = true;
    const newErrors = {};

    Object.entries(input).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Field can't be empty";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  return {
    input,
    errors,
    handleChange,
    validateFields,
  };
};
