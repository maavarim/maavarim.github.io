import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Container,
  Button,
  TextField,
  styled
} from "@material-ui/core";
import MembersTable from "../components/MembersTable";

const EncapsulatedTextField = styled(TextField)({
  flexGrow: 1,
  "& .MuiFilledInput-root": {
    borderRadius: 0
  }
});

const EncapsulatedButton = styled(Button)({
  borderRadius: 0
});

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tableQuery, setTableQuery] = useState("");
  return (
    <Box>
      <Container maxWidth="md">
        <Paper>
          <Box p={2}>
            <Typography variant="h5" component="h2">
              חיפוש חברים.ות
            </Typography>
          </Box>
          <Box display="flex">
            <EncapsulatedTextField
              id="filled-basic"
              label="אני מחפש.ת חבר.ה שמתחיל.ה ב..."
              variant="filled"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />
            <EncapsulatedButton
              variant="contained"
              color="primary"
              onClick={() => setTableQuery(searchQuery)}
            >
              חיפוש
            </EncapsulatedButton>
          </Box>
          <MembersTable query={tableQuery} />
        </Paper>
      </Container>
    </Box>
  );
};

export default SearchPage;
