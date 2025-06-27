import { useState } from "react";
import { TextField } from "@mui/material";

const ValidatedTextField = ({
  label,
  type = "text",
  value = "",
  formLabel,
  validator,
  onChange,
}) => {
  const [inputValue, setValue] = useState(value);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (e) => {
    // usual based on onChange - the attribute of TextField
    const newValue = e.target.value;
    setValue(newValue);
    const errorMessage = validator(newValue);
    setErrorMessage(errorMessage);
    setError(Boolean(errorMessage));

    // use given onChange - method from props
    onChange(formLabel, newValue);
  };

  return (
    <TextField
      type={type}
      label={label}
      value={inputValue}
      onChange={handleChange}
      error={error}
      helperText={errorMessage}
    />
  );
};

export default ValidatedTextField;
