import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  InputAdornment,
  Grid,
  makeStyles
} from "@material-ui/core";
import {
  AccountCircleTwoTone,
  PhoneTwoTone,
  CalendarTodayTwoTone
} from "@material-ui/icons";
import Member from "../Member";
import { parseDate } from "../utils";

const useStyles = makeStyles({
  fieldsContainer: {
    "& .MuiFormControl-root": {
      width: "100%"
    }
  },
  fullHeightTextField: {
    height: "100%",
    "& .MuiTextField-root": {
      height: "100%",
      "& .MuiInputBase-root": {
        height: "100%"
      }
    }
  },
  ltrTextField: {
    "& .MuiInputBase-input": {
      direction: "rtl"
    }
  }
});

interface MemberEditorProps {
  initialMember?: Member;
  showErrors: boolean;
  onResult: (member: Member | null) => void;
}

const MemberEditor = ({
  initialMember,
  showErrors,
  onResult
}: MemberEditorProps) => {
  const classes = useStyles();

  const [name, setName] = useState(initialMember?.name ?? "");
  const [nameError, setNameError] = useState(name.trim() === "");

  const [phoneNumber, setPhoneNumber] = useState(
    initialMember?.phoneNumber ?? ""
  );
  const [isActive, setIsActive] = useState(initialMember?.isActive ?? true);
  const [registrationDate, setRegistrationDate] = useState(
    (initialMember?.registrationDate ?? new Date()).toISOString().split("T")[0]
  );
  const [moreDetails, setMoreDetails] = useState(
    initialMember?.moreDetails ?? ""
  );

  useEffect(() => {
    onResult(
      nameError
        ? null
        : {
            key: initialMember?.key ?? "",
            name,
            isActive,
            phoneNumber,
            moreDetails,
            registrationDate: parseDate(registrationDate)
          }
    );
  }, [name, isActive, phoneNumber, moreDetails, registrationDate]);

  return (
    <Grid className={classes.fieldsContainer} container spacing={1}>
      <Grid item container spacing={1} xs={12} md={6}>
        <Grid item xs={12}>
          <TextField
            label="שם החבר.ה"
            value={name}
            error={showErrors && nameError}
            helperText={
              showErrors && nameError && "אי אפשר להוסיף חבר.ה בלי שם"
            }
            onChange={event => {
              const newName = event.target.value;
              setNameError(newName.trim() === "");
              setName(newName);
            }}
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
            className={classes.ltrTextField}
            type="tel"
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
            defaultValue={registrationDate}
            type="date"
            onChange={event => setRegistrationDate(event.target.value)}
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
        <Box mr={[1, 1, 0]} className={classes.fullHeightTextField}>
          <TextField
            label="פרטים נוספים"
            multiline
            rows={7}
            value={moreDetails}
            onChange={event => setMoreDetails(event.target.value)}
            variant="filled"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default MemberEditor;
