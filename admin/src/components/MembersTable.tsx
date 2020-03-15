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
  styled,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import firebase from "../Firebase";
import { formatDate } from "../utils";
import Member from "../Member";
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

interface MembersTableProps {
  query?: string;
}

const LIMIT = 20;

const MembersTable = ({ query }: MembersTableProps) => {
  const classes = useStyles();
  const db = useMemo(firebase.firestore, []);
  const [members, setMembers] = useState<Member[] | null>(null);

  const getFirestoreQuery = (
    lastVisibleMemberDoc: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData
    > | null
  ) => {
    let firestoreQuery: firebase.firestore.Query = db.collection("members");
    if (query !== undefined) {
      firestoreQuery = firestoreQuery
        .where("name", ">=", query)
        .orderBy("nameDate");
    } else {
      firestoreQuery = firestoreQuery.orderBy("registrationDate");
    }

    if (lastVisibleMemberDoc !== null) {
      firestoreQuery = firestoreQuery.startAfter(lastVisibleMemberDoc);
    }

    return firestoreQuery.limit(LIMIT);
  };

  let [
    nextMembersQuery,
    setNextMembersQuery
  ] = useState<firebase.firestore.Query | null>(getFirestoreQuery(null));

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
          : getFirestoreQuery(lastVisibleMemberDoc)
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
    <Fragment>
      <EditMemberDialog
        open={isEditMemberDialogOpened}
        onClose={() => setIsEditMemberDialogOpened(false)}
        db={db}
        member={memberToEdit}
        editCallback={updateMember}
        deleteCallback={deleteMember}
      />
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
                    <TableCell>{formatDate(member.registrationDate)}</TableCell>
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
    </Fragment>
  );
};

export default MembersTable;
