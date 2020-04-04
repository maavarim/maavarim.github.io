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
import { formatForDisplaying } from "../utils/Array";

function getSelectBasedSearchFilterRenderer(
  fieldName: string,
  title: string,
  options: string[]
): SearchFilterRenderer {
  return props => {
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const updatedSelectedOptions = event.target.value as string[];
      props.onChange(updatedSelectedOptions);
    };

    return (
      <FormControl color="secondary" variant="filled">
        <InputLabel id={`select-${fieldName}`}>{title}</InputLabel>
        <Select
          labelId={`select-${fieldName}`}
          multiple
          renderValue={selected => formatForDisplaying(selected as string[])}
          value={props.value}
          onChange={handleChange}
          {...(props.selectProps ?? {})}
        >
          {options.map((option, optionIndex) => (
            <MenuItem value={option} key={optionIndex}>
              <Checkbox
                checked={(props.value?.indexOf(option) ?? -1) > -1}
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
