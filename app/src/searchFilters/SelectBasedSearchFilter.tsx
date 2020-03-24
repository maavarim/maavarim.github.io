import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import SearchFilter from ".";

export function getSelectBasedSearchFilter(
  firebaseFieldName: string,
  title: string,
  options: string[]
): SearchFilter {
  const getApplicator = (selectedOptions: string[]) =>
    selectedOptions.length === 0
      ? null
      : (query: firebase.firestore.Query<firebase.firestore.DocumentData>) => {
        
        query.where(firebaseFieldName, "in", selectedOptions);
      }

  return props => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const updatedSelectedOptions = event.target.value as string[];
      setSelectedOptions(updatedSelectedOptions);
      props.onChange(firebaseFieldName, getApplicator(updatedSelectedOptions));
    };

    return (
      <FormControl color="secondary" variant="filled">
        <InputLabel id={`select-${firebaseFieldName}`}>{title}</InputLabel>
        <Select
          labelId={`select-${firebaseFieldName}`}
          multiple
          renderValue={selected => (selected as string[]).join(" · ")}
          value={selectedOptions ?? []}
          onChange={handleChange}
        >
          {options.map((option, optionIndex) => (
            <MenuItem value={option} key={optionIndex}>
              <Checkbox
                checked={(selectedOptions?.indexOf(option) ?? -1) > -1}
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
}
