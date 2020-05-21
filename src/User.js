class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.firstName = this.name.split(' ')[0];
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }
}