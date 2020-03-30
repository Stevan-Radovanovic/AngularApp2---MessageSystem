export class User {
  constructor(private email: string, private password: string) {
    this.email = email;
    this.password = password;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}
