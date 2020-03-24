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
  fieldName: string,
  title: string,
  options: string[]
): SearchFilter {
  return props => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const updatedSelectedOptions = event.target.value as string[];
      setSelectedOptions(updatedSelectedOptions);
      props.onChange(fieldName, updatedSelectedOptions);
    };

    return (
      <FormControl color="secondary" variant="filled">
        <InputLabel id={`select-${fieldName}`}>{title}</InputLabel>
        <Select
          labelId={`select-${fieldName}`}
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
