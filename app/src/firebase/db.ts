import firebase, { Collection } from "./index";
import SearchFilter from "../types/SearchFilter";

const db = firebase.firestore();

export const getAllSearchFilters = () =>
  new Promise<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  >((resolve, reject) => {
    db.collection(Collection.Filters)
      .get()
      .then(({ docs }) => resolve(docs))
      .catch(reject);
  });

export const deleteSearchFilter = ({ id }: SearchFilter) =>
  db
    .collection(Collection.Filters)
    .doc(id)
    .delete();

export const createOrUpdateSearchFilter = ({ id, ...data }: SearchFilter) =>
  db
    .collection(Collection.Filters)
    .doc(id)
    .set(data);
