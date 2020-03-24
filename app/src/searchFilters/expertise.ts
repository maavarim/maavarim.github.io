import { getSelectBasedSearchFilter } from "./SelectBasedSearchFilter";

const fieldName = "expertise";
const title = "התמחות";
const options = [
  "אולטרסאונד",
  "אורטופדיה",
  "אח.ות",
  "אחר",
  "אנדוקרינולוגיה",
  "גניקולוגיה",
  "גסטרולוגיה",
  "המטולוגיה",
  "הסרת שיער בלייזר",
  "טיפול באמנות",
  "ילדים ומתבגרים",
  "כירורגיה",
  "משפחה",
  "נפרולוגיה",
  "עבודה סוציאלית",
  "עור ומין",
  "עיניים",
  "פנימית",
  "פסיכולוגיה",
  "פסיכותרפיה",
  "פסיכיאטריה",
  "קלינאי.ת תקשורת",
  "רפואה אלטרנטיבית",
  "שיננית"
];

export default getSelectBasedSearchFilter(fieldName, title, options);
