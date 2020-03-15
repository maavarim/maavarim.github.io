import React from "react";
import {
  Typography,
  Box,
  Paper,
  makeStyles,
  Container,
} from "@material-ui/core";
import MembersTable from "../components/MembersTable";

const ListMembersPage = () => (
  <Box>
    <Container maxWidth="md">
      <Paper>
        <Box p={2}>
          <Typography variant="h5" component="h2">
            כל החברים.ות
          </Typography>
        </Box>
        <MembersTable />
      </Paper>
    </Container>
  </Box>
);

export default ListMembersPage;
