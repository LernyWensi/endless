(function clock() {
  const windowClock = document.getElementById("window-clock");

  const date = new Date();

  const weekDay = date.toLocaleString("en-US", { weekday: "long" });

  const fullDate = date
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    })
    .replace(",", "") // Remove "," from "(month) (day), (year)"
    .split(" "); // Split to array [month, day, year]

  const time = date
    .toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .split(" ") // Parse "(hours):(minutes):(seconds) AM(PM)" to array [(hours):(minutes):(seconds), AM(PM)]
    .shift() // Remove AM(PM) and took only time
    .split(":"); // Split to array [hours, minutes, seconds]

  windowClock.innerHTML = `
    <span id="week-day">${weekDay}</span>
    <span id="month-day">${fullDate[1]} </span>${fullDate[0]} ${fullDate[2]}
    <span id="hours">${time[0]}</span>:${time[1]}:${time[2]}
  `;

  setTimeout(clock, 500);
})();
