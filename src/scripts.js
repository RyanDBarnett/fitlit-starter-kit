const hydrationRepository = new HydrationRepository(hydrationData);
const sleepRepository = new SleepRepository(sleepData);
const activityRepository = new ActivityRepository(activityData);
const userRepository = new UserRepository(userData);

var randomUserID = Math.floor(Math.random() * userData.length + 1);
displayUserInfo(userRepository.filterByProperty(randomUserID));

function displayUserInfo(user) {
  const infoCardContainer = document.querySelector('.info-card-container');
  const infoCardTemplate = `
    <div class="info-card">
      ${displayUserSection(user)}
      ${displayHydrationSection(user)}
      ${displaySleepSection(user)}
      ${displayActivitySection(user)}
    </div>
  `;
  infoCardContainer.insertAdjacentHTML('afterbegin', infoCardTemplate);
}

function displayUserSection(user) {
  const difference = user.dailyStepGoal - userRepository.getAverageOfProperty('dailyStepGoal');
  return `
    <section>
      <h2>Welcome ${user.firstName}!</h2>
      <h3>User</h3>
      <ul>
        <li>Name: ${user.name}</li>
        <li>Address: ${user.address}</li>
        <li>Email: ${user.email}</li>
        <li>Stride Length: ${user.strideLength}</li>
        <li>Daily Step Goal: ${user.dailyStepGoal}</li>
        <li>Friends: ${user.friends}</li>
        <li>On average the daily step goal of all our users is ${userRepository.getAverageOfProperty('dailyStepGoal')}. Your step goal of ${user.dailyStepGoal} is ${Math.abs(difference)} ${difference > 0?'more':'less'} steps than the average.</li>
      </ul>
    </section>
  `;
}

function displayHydrationSection(user) {
  const lastWeeksHydrationRepository = hydrationRepository.filterByProperty('userID', user.id).getDateRange('2019/09/22', 7);
  return `
    <section>
      <h3>Hydration</h3>
      <ul>
        <li>Average Fluid Ounces Consumed Per Day: ${hydrationRepository.filterByProperty('userID', user.id).getAverageOfProperty('numOunces')}</li>
        <li>Fluid Ounces Consumed Today(2019/09/22): ${hydrationRepository.filterByProperty('userID', user.id).getDateRange('2019/09/22', 1).numOunces}</li>
        <h4>Previous Week's Fluid Ounces Consumed:</h4>
        <ul>
          ${lastWeeksHydrationRepository.hydrations.map(hydration => `<li>${hydration.date}: ${hydration.numOunces}</li>`
        ).reverse().join('<br>')}
        </ul>
      </ul>
    </section>
  `;
}

function displaySleepSection(user) {
  const latestSleep = sleepRepository.filterByProperty('userID', user.id).getDateRange('2019/09/22', 1);
  const lastWeeksSleepData = sleepRepository.filterByProperty('userID', user.id).getDateRange('2019/09/22', 7);
  return `
    <section>
      <h3>Sleep</h3>
      <ul>
        <h4>Latest Sleep Report</h4>
        <li>Date: ${latestSleep.date}</li>
        <li>Hours Slept: ${latestSleep.hoursSlept}</li>
        <li>Sleep Quality: ${latestSleep.sleepQuality}</li>
        <h4>Previous Week's Sleep Data:</h4>
        <ul>
          ${lastWeeksSleepData.sleeps.map(sleep => `<li>${sleep.date}: Hours Slept: ${sleep.hoursSlept} Sleep Quality: ${sleep.sleepQuality}</li>`
        ).reverse().join('<br>')}
        </ul>
        <h4>User Averages</h4>
        <li>Hours Slept: ${sleepRepository.filterByProperty('userID', user.id).getAverageOfProperty('hoursSlept')}</li>
        <li>Sleep Quality: ${sleepRepository.filterByProperty('userID', user.id).getAverageOfProperty('sleepQuality')}</li>
      </ul>
    </section>
  `;
}

function displayActivitySection(user) {
  const latestActivity = activityRepository.filterByProperty('userID', user.id).getDateRange('2019/09/22', 1);
  const lastWeeksActivity = activityRepository.filterByProperty('userID', user.id).getDateRange('2019/09/22', 7);
  const averageMiles = activityRepository.filterByProperty('date', latestActivity.date).getAverageOfProperty('numSteps') * userRepository.getAverageOfProperty('strideLength') / 5280;
  return `
    <section>
      <h3>Activity</h3>
      <h4>Latest Activity Report</h4>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>My Latest</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Number of Steps</td>
            <td>${latestActivity.numSteps}</td>
            <td>${activityRepository.getAverageOfProperty('numSteps')}</td>
          </tr>
          <tr>
            <td>Minutes Active</td>
            <td>${latestActivity.minutesActive}</td>
            <td>${activityRepository.getAverageOfProperty('minutesActive')}</td>
          </tr>
          <tr>
            <td>Flights of Stairs</td>
            <td>${latestActivity.flightsOfStairs}</td>
            <td>${activityRepository.getAverageOfProperty('flightsOfStairs')}</td>
          </tr>
          <tr>
            <td>Distance Walked In Miles</td>
            <td>${latestActivity.numSteps * user.strideLength / 5280}</td>
            <td>${averageMiles}</td>
          </tr>
        </tbody>
      </table>
      <h4>Previous Week's Activity Data:</h4>
      <ul>
          ${lastWeeksActivity.activities.map(activity => {
            return `
              <li>Date: ${activity.date}
                <ul>
                  <li>Number of Steps: ${activity.numSteps}</li>
                  <li>Minutes Active: ${activity.minutesActive}</li>
                  <li>Flights of Stairs: ${activity.flightsOfStairs}</li>
                </ul>
              </li>
            `;
        }).reverse().join('<br>')}
        </ul>
    </section>
  `;
}