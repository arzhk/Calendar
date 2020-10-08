let appointments = [];

const daysInThisMonth = function () {
  const now = new Date();
  const newDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysInTheMonth = newDate.getDate();
  return daysInTheMonth;
};

const saveMeeting = function () {
  const meetingDay = document.querySelector("#newMeetingDay").innerText;
  let meetingTime = document.querySelector("#newMeetingTime");
  let meetingName = document.querySelector("#newMeetingName");

  appointments[parseInt(meetingDay) - 1].push(
    meetingTime.value + " - " + meetingName.value
  );

  meetingTime.value = "";
  meetingName.value = "";

  showAppointments(parseInt(meetingDay));
};

const showAppointments = function (day) {
  let todaysAppointments = appointments[day - 1];
  let appointmentsList = document.querySelector("#appointmentsList");
  document.querySelector("#appointments").style.display = "block";
  appointmentsList.innerHTML = "";

  for (let i = 0; i < todaysAppointments.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = todaysAppointments[i];
    appointmentsList.appendChild(li);
  }
};

window.onload = function () {
  const numberOfDays = daysInThisMonth();
  const calendar = document.querySelector("#calendar");

  for (let i = 0; i < numberOfDays; i++) {
    appointments[i] = [];
    const child = document.createElement("div");
    child.className = "day";

    child.onclick = function () {
      let selected = document.querySelector(".selected");

      if (selected) {
        selected.classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");

      document.querySelector("#newMeetingDay").innerText = i + 1;
      document.querySelector("#newMeetingDay").style.cssText =
        "font-size: 28px; background-color: #181818; border-radius: 3px; color: #fff; padding: 2px 10px;";
      let todaysAppointments = appointments[i]; // finding the appointments for the day in the appointments array
      if (todaysAppointments.length > 0) {
        // if we have any event for that day
        showAppointments(i + 1); // invoking showAppointments passing the day of the month as the parameter
      } else {
        // if we DON'T have any event for that day
        document.querySelector("#appointments").style.display = "none"; // hide the appointments sections
      }
    };

    const day = document.createElement("h3");
    const dayOfTheMonth = i + 1;
    day.innerText = dayOfTheMonth;

    child.appendChild(day);
    calendar.appendChild(child);
  }
};
