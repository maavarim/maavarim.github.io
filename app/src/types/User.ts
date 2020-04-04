export default class User {
  email: string;

  constructor(email: string | null) {
    this.email = email ?? "";
  }

  get isStaff(): boolean {
    return this.email?.endsWith("maavarim.org");
  }
}
