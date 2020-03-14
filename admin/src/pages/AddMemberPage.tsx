import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  Grid,
  makeStyles,
  Card,
  CardContent
} from "@material-ui/core";
import {
  AccountCircleTwoTone,
  PhoneTwoTone,
  CalendarTodayTwoTone
} from "@material-ui/icons";

const useStyles = makeStyles({
  fieldsContainer: {
    "& .MuiFormControl-root": {
      width: "100%"
    }
  },
  fullHeightTextField: {
    height: "100%",
    "& .MuiInputBase-root": {
      height: "100%"
    }
  },
  flex: {
    display: "flex"
  }
});

const AddMemberPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registerationDate, setRegisterationDate] = useState<Date>(new Date());
  const [moreDetails, setMoreDetails] = useState("");
  const classes = useStyles();

  const handleRegisterationDateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [year, month, day] = event.target.value.split(/\D/).map(s => +s);
    const newRegistrationDate = new Date(year, month - 1, day);
    setRegisterationDate(newRegistrationDate);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box mb={2}>
            <Typography variant="h5" component="h2">
              הוספת חבר.ה
            </Typography>
          </Box>
          <Grid className={classes.fieldsContainer} container spacing={1}>
            <Grid item container spacing={1} xs={12} md={6}>
              <Grid item xs={12}>
                <TextField
                  label="שם החבר.ה"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleTwoTone />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="טלפון"
                  value={phoneNumber}
                  type="phone"
                  onChange={event => setPhoneNumber(event.target.value)}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneTwoTone />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="תאריך הצטרפות"
                  value={registerationDate.toISOString().split("T")[0]}
                  type="date"
                  onChange={handleRegisterationDateChange}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayTwoTone />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.fullHeightTextField}
                label="פרטים נוספים"
                value={moreDetails}
                rows={3}
                multiline
                onChange={event => setMoreDetails(event.target.value)}
                variant="filled"
              />
            </Grid>
          </Grid>
          <Box className={classes.flex} justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary">
              יצירה
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddMemberPage;
