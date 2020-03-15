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
  Checkbox,
  styled
} from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
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
          phoneNumber: docData.phoneNumber ?? "",
          moreDetails: docData.moreDetails ?? "",
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

  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [isEditMemberDialogOpened, setIsEditMemberDialogOpened] = useState(
    false
  );

  const updateMember = (updatedMember: Member) => {
    setMembers(
      members?.map(member =>
        updatedMember.key === member.key ? updatedMember : member
      ) ?? null
    );
  };

  const deleteMember = (deletedMember: Member) => {
    setMembers(
      members?.filter(member => deletedMember.key !== member.key) ?? null
    );
  };

  const setSubscriptionOf = (member: Member, status: boolean) => {
    const updatedMember: Member = {
      ...member,
      isActive: status
    };

    db.collection("members")
      .doc(updatedMember.key)
      .set(updatedMember)
      .then(_ => {
        updateMember(updatedMember);
      });
  };

  return (
    <Box>
      <Container maxWidth="md">
        <EditMemberDialog
          open={isEditMemberDialogOpened}
          onClose={() => setIsEditMemberDialogOpened(false)}
          db={db}
          member={memberToEdit}
          setMember={setMemberToEdit}
          editCallback={updateMember}
          deleteCallback={deleteMember}
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
                      <TableCellBold align="center">סטטוס מינוי</TableCellBold>
                      <TableCellBold align="center">עריכה</TableCellBold>
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
                        <TableCell align="center" style={{ padding: 0 }}>
                          <Checkbox
                            checked={member.isActive}
                            onChange={event =>
                              setSubscriptionOf(member, event.target.checked)
                            }
                            color="primary"
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </TableCell>
                        <TableCell align="center" style={{ padding: 0 }}>
                          <IconButton
                            aria-label="עריכה"
                            onClick={() => {
                              setMemberToEdit(member);
                              setIsEditMemberDialogOpened(true);
                            }}
                          >
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
