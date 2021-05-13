import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import React from "react";

interface InputFieldProps {
  [x: string]: any;
  name: string;
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...props} {...field} id={field.name} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
