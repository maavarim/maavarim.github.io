export default class User {
  email: string;

  constructor(email: string | null) {
    this.email = email ?? "";
  }
}
