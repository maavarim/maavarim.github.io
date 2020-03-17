import React, {
  useMemo,
  useState,
  useEffect,
  Fragment,
  useReducer,
  useCallback
} from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  IconButton,
  Checkbox,
  styled
} from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import QrCodeIcon from "./custom-icons/QrCodeIcon";
import firebase from "../Firebase";
import { formatDate } from "../utils";
import Member from "../Member";
import EditMemberDialog from "./EditMemberDialog";
import DisplayQRCodeDialog from "./DisplayQRCodeDialog";

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

const getFirestoreQuery = (
  db: firebase.firestore.Firestore,
  query: string | undefined,
  lastVisibleMemberDoc: firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  > | null
) => {
  let firestoreQuery: firebase.firestore.Query = db.collection("members");
  if (query !== undefined) {
    firestoreQuery = firestoreQuery.orderBy("name").where("name", ">=", query);
    if (query !== "") {
      const endString =
        query.substring(0, query.length - 1) +
        String.fromCharCode(query.charCodeAt(query.length - 1) + 1);
      firestoreQuery = firestoreQuery.where("name", "<", endString);
    }
  } else {
    firestoreQuery = firestoreQuery.orderBy("registrationDate");
  }

  if (lastVisibleMemberDoc !== null) {
    firestoreQuery = firestoreQuery.startAfter(lastVisibleMemberDoc);
  }

  return firestoreQuery.limit(LIMIT);
};

enum MembersReducerActionName {
  LoadMore,
  AddMembers,
  UpdateMember,
  DeleteMember,
  NewSearch
}

interface MembersReducerAction {
  name: MembersReducerActionName;
  payload?: Member | Member[];
}

const MembersTable = ({ query }: MembersTableProps) => {
  const classes = useStyles();
  const db = useMemo(firebase.firestore, []);

  let [
    lastVisibleMemberDoc,
    setLastVisibleMemberDoc
  ] = useState<firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  > | null>(null);
  let [allDisplayed, setAllDisplayed] = useState(false);

  const getMoreMembers: () => Promise<Member[]> = useCallback(
    () =>
      new Promise((resolve, reject) => {
        if (allDisplayed) {
          return;
        }

        getFirestoreQuery(db, query, lastVisibleMemberDoc)
          .get()
          .then(documentSnapshots => {
            if (documentSnapshots.empty) {
              setAllDisplayed(true);
              resolve([]);
              return;
            }
            const newMemberDocs = documentSnapshots.docs;
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
            setLastVisibleMemberDoc(
              newMemberDocs[documentSnapshots.docs.length - 1]
            );

            if (documentSnapshots.size < LIMIT) {
              setAllDisplayed(true);
            }

            resolve(newMembers);
          })
          .catch(reject);
      }),
    [db, query, lastVisibleMemberDoc, allDisplayed]
  );

  const [shouldLoadMembers, setShouldLoadMembers] = useState(false);

  const typedNull: Member[] | null = null;
  const [members, dispatchMembersAction] = useReducer(
    (curentMembers: Member[] | null, action: MembersReducerAction) => {
      switch (action.name) {
        case MembersReducerActionName.AddMembers:
          return [...(curentMembers ?? []), ...(action.payload as Member[])];

        case MembersReducerActionName.UpdateMember:
          const updatedMember = action.payload as Member;
          return (
            curentMembers?.map(member =>
              updatedMember.key === member.key ? updatedMember : member
            ) ?? null
          );

        case MembersReducerActionName.DeleteMember:
          const deletedMember = action.payload as Member;
          return (
            curentMembers?.filter(member => deletedMember.key !== member.key) ??
            null
          );

        case MembersReducerActionName.LoadMore:
          setShouldLoadMembers(true);
          return curentMembers;

        case MembersReducerActionName.NewSearch:
          setLastVisibleMemberDoc(null);
          setAllDisplayed(false);
          setShouldLoadMembers(true);
          return null;
      }
    },
    typedNull
  );

  useEffect(() => {
    dispatchMembersAction({ name: MembersReducerActionName.NewSearch });
  }, [query]);

  useEffect(() => {
    if (shouldLoadMembers) {
      setShouldLoadMembers(false);
      getMoreMembers().then(moreMembers => {
        dispatchMembersAction({
          name: MembersReducerActionName.AddMembers,
          payload: moreMembers
        });
      });
    }
  }, [shouldLoadMembers, getMoreMembers]);

  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [isEditMemberDialogOpened, setIsEditMemberDialogOpened] = useState(
    false
  );

  const updateMember = (updatedMember: Member) => {
    dispatchMembersAction({
      name: MembersReducerActionName.UpdateMember,
      payload: updatedMember
    });
  };

  const deleteMember = (deletedMember: Member) => {
    dispatchMembersAction({
      name: MembersReducerActionName.DeleteMember,
      payload: deletedMember
    });
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

  const [
    memberToDisplayQRCode,
    setMemberToDisplayQRCode
  ] = useState<Member | null>(null);
  const [
    isDisplayQRCodeDialogOpened,
    setIsDisplayQRCodeDialogOpened
  ] = useState(false);

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
      <DisplayQRCodeDialog
        open={isDisplayQRCodeDialogOpened}
        onClose={() => setIsDisplayQRCodeDialogOpened(false)}
        member={memberToDisplayQRCode}
      />
      {members !== null && (
        <Fragment>
          <TableContainer component="div">
            <Table
              stickyHeader
              className={classes.table}
              aria-label="טבלת חברים"
            >
              <TableHead>
                <TableRow>
                  <TableCellBold>שם החבר.ה</TableCellBold>
                  <TableCellBold>תאריך הצטרפות</TableCellBold>
                  <TableCellBold>טלפון</TableCellBold>
                  <TableCellBold>פרטים נוספים</TableCellBold>
                  <TableCellBold align="center">סטטוס מינוי</TableCellBold>
                  <TableCellBold align="center">פעולות</TableCellBold>
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
                        aria-label="צפייה ב-qr code"
                        style={{ marginRight: ".25em" }}
                        onClick={() => {
                          setMemberToDisplayQRCode(member);
                          setIsDisplayQRCodeDialogOpened(true);
                        }}
                      >
                        <QrCodeIcon />
                      </IconButton>{" "}
                      <IconButton
                        aria-label="עריכה"
                        style={{ marginRight: "-.25em", marginLeft: ".25em" }}
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
          {members !== null && members.length === 0 && (
            <Box>
              <Button className={classes.loadMoreButton} disabled>
                לא נמצאו חברים.ות ששמם.ן מתחיל ב-<b>{query}</b>.
              </Button>
            </Box>
          )}
          {!allDisplayed && (
            <Box>
              <Button
                className={classes.loadMoreButton}
                onClick={() =>
                  dispatchMembersAction({
                    name: MembersReducerActionName.LoadMore
                  })
                }
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
