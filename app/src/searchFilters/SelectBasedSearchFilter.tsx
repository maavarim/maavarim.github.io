import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import SearchFilter, { SearchFilterRenderer } from ".";

function getSelectBasedSearchFilterRenderer(
  fieldName: string,
  title: string,
  options: string[]
): SearchFilterRenderer {
  return props => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const updatedSelectedOptions = event.target.value as string[];
      setSelectedOptions(updatedSelectedOptions);
      props.onChange(updatedSelectedOptions);
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

export function getSelectBasedSearchFilter(
  filterKey: string,
  title: string,
  options: string[]
): SearchFilter {
  return {
    filterKey,
    render: getSelectBasedSearchFilterRenderer(filterKey, title, options)
  };
}
