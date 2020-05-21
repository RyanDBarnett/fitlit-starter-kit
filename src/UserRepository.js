class UserRepository extends Repository {
  constructor(usersData) {
    super();
    this.users = usersData.map(userData => new User(userData));
  }
}