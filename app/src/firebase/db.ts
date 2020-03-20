import firebase, { Collection } from "./index";

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
