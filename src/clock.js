(function clock() {
  const date = new Date();

  const weekDay = date.toLocaleString("en-US", { weekday: "long" });

  const fullDate = date
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    })
    .replace(",", "")
    .split(" ");

  const time = date
    .toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .split(" ")
    .shift()
    .split(":");

  $("#window-clock").innerHTML = `
    <span id="week-day">${weekDay}</span>
    <span id="month-day">${fullDate[1]} </span>${fullDate[0]} ${fullDate[2]}
    <span id="hours">${time[0]}</span>:${time[1]}:${time[2]}
  `;

  setTimeout(clock, 500);
})();
