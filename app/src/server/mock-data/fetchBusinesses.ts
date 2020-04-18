import Business from "../../types/Business";
import User from "../../types/User";

const allResults: Business[] = [
  {
    name: "דר׳ פרינדלי",
    info: {
      area: ["גוש דן", "אזור אשקלון"],
      expertise: ["אנדוקרינולוגיה", "ילדים ומתבגרים", "משפחה"],
      gender: ["גבר"],
      healthCare: ["מכבי"],
      language: ["עברית"],
      profession: ["עוסק.ת מתחום הרפואה", "אחר"],
      phone: "0538306666",
      location: "ג׳יי קיי רולינג 5, תל אביב-יפו",
    },
    reviews: [
      {
        author: new User("sophia@maavarim.com", "sophia@maavarim.com"),
        content: {
          rating: 4,
          moreDetails: "הוא ממש נחמד",
        },
      },
    ],
  },
  {
    name: "דר׳ פרינדלית עם ",
    info: {
      area: ["גוש דן", "אזור נתניה"],
      expertise: ["אנדוקרינולוגיה", "משפחה"],
      gender: ["אישה"],
      healthCare: ["מכבי", "לאומית"],
      language: ["ערבית"],
      profession: ["עוסק.ת מתחום הרפואה"],
      phone: "0538307777",
      location: "ג׳יי קיי רולינג 2, נתניה",
    },
    reviews: [
      {
        author: new User("sophia@maavarim.com", "sophia@maavarim.com"),
        content: {
          rating: 5,
          moreDetails: "היא סופר נחמדה",
        },
      },
    ],
  },
  {
    name: "סופיה ציאדה",
    info: {
      area: ["אזור נתניה", "גוש דן"],
      expertise: ["אחר", "ילדים ומתבגרים", "טיפול באמנות"],
      gender: ["אישה"],
      healthCare: ["מכבי"],
      language: ["עברית", "אנגלית"],
      profession: ["אחר"],
      phone: "07989799",
      location: "הבית של סופי",
    },
    reviews: [
      {
        author: new User("sophia@maavarim.org", "sophia@maavarim.org"),
        content: {
          rating: 4,
          moreDetails: "עוד פרטים",
        },
      },
    ],
  },
  {
    name: "test",
    info: {
      area: ["אזור נתניה"],
      expertise: ["הסרת שיער בלייזר"],
      gender: ["אחר"],
      healthCare: ["מכבי"],
      language: ["אנגלית"],
      profession: ["מטפל.ת"],
      phone: "sd",
      location: "sds",
    },
    reviews: [
      {
        author: new User("sophia@maavarim.org", "sophia@maavarim.org"),
        content: {
          rating: 4,
          moreDetails: "sd",
        },
      },
    ],
  },
];

export default (query: any) => {
  if (query.freeText)
    return allResults.filter((r) => r.name.includes(query.freeText));
  return allResults;
};
