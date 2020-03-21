export default class User {
  email: string | null;
  name: string | null;
  photoURL: string | null;

  constructor(
    email: string | null,
    name: string | null,
    photoURL: string | null
  ) {
    this.email = email;
    this.name = name;
    this.photoURL = photoURL;
  }

  get identifierToDisplay() {
    return this.name ?? this.email ?? "";
  }

  isNameInHebrew(): boolean {
    return this.name !== null && /[\u0590-\u05FF]/.test(this.name);
  }
}
