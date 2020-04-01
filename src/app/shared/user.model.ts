export class User {
  constructor(
    private email: string,
    private password: string,
    private token?: string,
    private tokenExpiration?: Date
  ) {
    this.email = email;
    this.password = password;
    this.token = token;
    this.tokenExpiration = tokenExpiration;
  }

  gettoken() {
    if (this.tokenExpiration == null || new Date() > this.tokenExpiration) {
      return null;
    }
    return this.token;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}
