import { useState } from "react";
import { TextField } from "@mui/material";

const ValidatedTextField = ({ label, value = "", validator, onChange }) => {
  const [inputValue, setValue] = useState(value);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const errorMessage = validator(newValue);
    setValue(newValue);
    setError(errorMessage);
    onChange(!errorMessage);
  };

  return (
    <TextField
      label={label}
      value={inputValue}
      onChange={handleChange}
      error={!!error}
      helperText={error}
    />
  );
};

export default ValidatedTextField;
