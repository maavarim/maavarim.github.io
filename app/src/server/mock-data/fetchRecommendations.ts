import ServerRecommendation from "../../types/ServerRecommendation";

const allResults: ServerRecommendation[] = [
  {
    area: ["גוש דן", "אזור אשקלון"],
    expertise: ["אנדוקרינולוגיה", "ילדים ומתבגרים", "משפחה"],
    gender: ["גבר"],
    healthCare: ["מכבי"],
    language: ["עברית"],
    profession: ["עוסק.ת מתחום הרפואה", "אחר"],
    accepted: true,
    _id: "5e7a3268e9ad56f642d738aa",
    authorEmail: "sophia@maavarim.com",
    name: "דר׳ פרינדלי",
    rating: 4,
    phone: "0538306666",
    location: "ג׳יי קיי רולינג 5, תל אביב-יפו",
    additionalInfo: "הוא ממש נחמד",
    createdAt: new Date("2020-03-26T15:59:50.467Z")
  },
  {
    area: ["גוש דן", "אזור נתניה"],
    expertise: ["אנדוקרינולוגיה", "משפחה"],
    gender: ["אישה"],
    healthCare: ["מכבי", "לאומית"],
    language: ["ערבית"],
    profession: ["עוסק.ת מתחום הרפואה"],
    accepted: true,
    _id: "5e7a32e51c6542f6680635ae",
    authorEmail: "sophia@maavarim.com",
    name: "דר׳ פרינדלית עם ",
    rating: 5,
    phone: "0538307777",
    location: "ג׳יי קיי רולינג 2, נתניה",
    additionalInfo: "היא סופר נחמדה",
    createdAt: new Date("2020-03-26T12:29:50.467Z")
  },
  {
    area: ["אזור נתניה", "גוש דן"],
    expertise: ["אחר", "ילדים ומתבגרים", "טיפול באמנות"],
    gender: ["אישה"],
    healthCare: ["מכבי"],
    language: ["עברית", "אנגלית"],
    profession: ["אחר"],
    accepted: true,
    _id: "5e7e067e66cc115be8f04765",
    authorEmail: "sophia@maavarim.org",
    name: "סופיה ציאדה",
    rating: 4,
    phone: "07989799",
    location: "הבית של סופי",
    additionalInfo: "עוד פרטים",
    createdAt: new Date("2020-03-27T12:59:50.467Z")
  },
  {
    area: ["אזור נתניה"],
    expertise: ["הסרת שיער בלייזר"],
    gender: ["אחר"],
    healthCare: ["מכבי"],
    language: ["אנגלית"],
    profession: ["מטפל.ת"],
    accepted: true,
    _id: "5e7e22f6ad70306284424f6b",
    authorEmail: "sophia@maavarim.org",
    name: "test",
    rating: 4,
    phone: "sd",
    location: "sds",
    additionalInfo: "sd",
    createdAt: new Date("2020-03-27T15:59:50.467Z")
  }
];

export default (query: any) => {
  if (query.freeText)
    return allResults.filter(r => r.name.includes(query.freeText));
  return allResults;
};
