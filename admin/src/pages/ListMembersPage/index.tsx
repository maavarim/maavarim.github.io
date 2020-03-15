import React, { useMemo, useState, useEffect, Fragment } from "react";
import {
  Typography,
  Box,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Container,
  IconButton,
  styled
} from "@material-ui/core";
import { DeleteTwoTone, EditTwoTone } from "@material-ui/icons";
import firebase from "../../Firebase";
import { formatDate } from "../../utils";
import Member from "../../Member";
import EditMemberDialog from "./EditMemberDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  loadMoreButton: {
    width: "100%",
    borderRadius: "0",
    fontWeight: 600
  }
});

const TableCellBold = styled(TableCell)({
  fontWeight: 600
});

interface FirebaseMember {
  name: string;
  isActive: boolean;
  phoneNumber: string;
  registrationDate: firebase.firestore.Timestamp;
}

const LIMIT = 20;

const ListMembersPage = () => {
  const classes = useStyles();
  const db = useMemo(firebase.firestore, []);
  const [members, setMembers] = useState<Member[] | null>(null);

  let [
    nextMembersQuery,
    setNextMembersQuery
  ] = useState<firebase.firestore.Query | null>(
    db
      .collection("members")
      .orderBy("registrationDate")
      .limit(LIMIT)
  );

  const loadMoreMembers = () => {
    nextMembersQuery?.get().then(documentSnapshots => {
      if (documentSnapshots.empty) {
        return setNextMembersQuery(null);
      }
      const newMemberDocs = documentSnapshots.docs;
      const lastVisibleMemberDoc =
        newMemberDocs[documentSnapshots.docs.length - 1];

      const newMembers = newMemberDocs.map(doc => {
        const docData = doc.data();
        return {
          key: doc.id,
          name: docData.name,
          isActive: docData.isActive,
          phoneNumber: docData.phoneNumber,
          moreDetails: docData.moreDetails,
          registrationDate: docData.registrationDate.toDate()
        };
      });

      setMembers([...(members ?? []), ...newMembers]);

      setNextMembersQuery(
        documentSnapshots.size < LIMIT
          ? null
          : db
              .collection("members")
              .orderBy("registrationDate")
              .startAfter(lastVisibleMemberDoc)
              .limit(LIMIT)
      );
    });
  };

  useEffect(loadMoreMembers, []);

  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);

  return (
    <Box>
      <Container maxWidth="md">
        <EditMemberDialog
          db={db}
          member={memberToRemove}
          setMember={setMemberToRemove}
          editCallback={console.log}
        />
        <Paper>
          <Box p={2}>
            <Typography variant="h5" component="h2">
              כל החברים.ות
            </Typography>
          </Box>
          {members !== null && (
            <Fragment>
              <TableContainer component="div">
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCellBold>שם החבר.ה</TableCellBold>
                      <TableCellBold>תאריך הצטרפות</TableCellBold>
                      <TableCellBold>טלפון</TableCellBold>
                      <TableCellBold>פרטים נוספים</TableCellBold>
                      <TableCellBold>סטטוס מינוי</TableCellBold>
                      <TableCellBold align="center">פעולות</TableCellBold>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map(member => (
                      <TableRow key={member.key}>
                        <TableCell component="th" scope="row">
                          {member.name}
                        </TableCell>
                        <TableCell>
                          {formatDate(member.registrationDate)}
                        </TableCell>
                        <TableCell style={{ direction: "ltr" }}>
                          {member.phoneNumber ? member.phoneNumber : "-"}
                        </TableCell>
                        <TableCell>{member.moreDetails}</TableCell>
                        <TableCell>
                          {member.isActive ? "פעיל" : "לא פעיל"}
                        </TableCell>
                        <TableCell align="center" style={{ padding: 0 }}>
                          <IconButton
                            aria-label="מחיקה"
                            onClick={() => setMemberToRemove(member)}
                          >
                            <DeleteTwoTone />
                          </IconButton>
                          <IconButton aria-label="עריכה">
                            <EditTwoTone />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {nextMembersQuery !== null && (
                <Box>
                  <Button
                    className={classes.loadMoreButton}
                    onClick={loadMoreMembers}
                    color="primary"
                  >
                    אפשר לראות עוד חברים.ות?
                  </Button>
                </Box>
              )}
            </Fragment>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ListMembersPage;
