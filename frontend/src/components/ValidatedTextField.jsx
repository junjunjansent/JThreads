import { useEffect, useState } from "react";
import { FormControl, TextField } from "@mui/material";

const ValidatedTextField = ({
  required = false,
  type = "text",
  label,
  value = "",
  formLabel,
  validator,
  onChange,
  formValidityState = null,
  formValidityStateSetter = () => {},
}) => {
  const [inputValue, setValue] = useState(value);
  const [error, setError] = useState(false); //boolean
  const [errorMessage, setErrorMessage] = useState(false); // string or false

  const handleChange = (e) => {
    // usual based on onChange - the attribute of TextField
    const newValue = e.target.value;
    // if newValue === "" && required === false, can ignore
    setValue(newValue);

    // set error & error Message attributes of TextField
    const errorMessage = validator(newValue);
    setErrorMessage(errorMessage);
    setError(Boolean(errorMessage));

    // setting formValidity State
    if (formValidityState && formValidityStateSetter) {
      formValidityStateSetter({
        ...formValidityState,
        [formLabel]: !errorMessage,
      });
    }

    // use given onChange - method from props
    onChange(formLabel, newValue);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <FormControl fullWidth>
      <TextField
        required={required}
        type={type}
        label={label}
        value={inputValue}
        onChange={handleChange}
        error={error}
        helperText={errorMessage}
      />
    </FormControl>
  );
};

export default ValidatedTextField;
