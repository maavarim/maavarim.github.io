import logger from "../utils/logger";
import SearchFilter from "../types/SearchFilter";

export function firebaseDocToSearchFilter(
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): SearchFilter | null {
  const { title, options } = doc.data();
  if (title === undefined || options === undefined) {
    logger.error(
      `Firebase doc ${doc.id} does'nt match to SearchFilter structure.`
    );
    return null;
  }

  return {
    id: doc.id,
    title: title as string,
    options: options as string[]
  };
}
