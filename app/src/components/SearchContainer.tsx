import React, { useState } from "react";
import {
  Container,
  Typography,
  makeStyles,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  searchContainer: {
    marginTop: `-${theme.spacing(4)}px`
  },
  fieldsContainer: {
    width: "calc(100% + 16px)",
    "& .MuiFormControl-root": {
      width: "100%"
    }
  }
}));

function SearchContainer() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.searchContainer}>
      <Card>
        <CardContent>
          <Box mb={2}>
            <Typography variant="h5" align="center" color="textPrimary">
              חיפוש אנשי.ות מקצוע
            </Typography>
            <Typography align="center" color="textSecondary" gutterBottom>
              חפשו בחיפוש חופשי או סננו לפי השדות
            </Typography>
          </Box>
          <Grid container spacing={1} className={classes.fieldsContainer}>
            <Grid item container spacing={1} xs={12}>
              <Grid item xs={12}>
                <TextField
                  label="חיפוש חופשי"
                  // value={name}
                  // error={showErrors && nameError}
                  // helperText={
                  //   showErrors && nameError && "אי אפשר להוסיף חבר.ה בלי שם"
                  // }
                  // onChange={event => setName(event.target.value)}
                  color="secondary"
                  variant="filled"
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <AccountCircleTwoTone />
                  //     </InputAdornment>
                  //   )
                  // }}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1} xs={12}>
              <Grid item xs={12} md={6}>
                <FormControl color="secondary" variant="filled">
                  <InputLabel id="demo-simple-select-filled-label">
                    מקצוע
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    // value={age}
                    // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl color="secondary" variant="filled">
                  <InputLabel id="demo-simple-select-filled-label">
                    התמחות
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    // value={age}
                    // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SearchContainer;
