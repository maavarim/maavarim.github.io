export default class User {
  name: string;
  email: string;

  constructor(name: string | null, email: string | null) {
    this.name = name ?? "";
    this.email = email ?? "";
  }

  get isStaff(): boolean {
    return this.email?.endsWith("maavarim.org");
  }
}
