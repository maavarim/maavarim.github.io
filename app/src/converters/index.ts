import logger from "../utils/logger";
import SearchFilter from "../types/SearchFilter";

export function firebaseDocToSearchFilter(
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): SearchFilter | null {
  const { order, title, options } = doc.data();
  if (order === undefined || title === undefined || options === undefined) {
    logger.error(
      `Firebase doc ${doc.id} does'nt match to SearchFilter structure.`
    );
    return null;
  }

  return {
    id: doc.id,
    order: order as number,
    title: title as string,
    options: options as string[]
  };
}
