export const checkValidEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const checkValidPassword = (pw) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(pw);
};

export const isLeapYear = (year) => {
  return (((year % 4) === 0) && ((year % 100) !== 0)) || ((year % 400) === 0);
};

const parseTime = (time) => {

  const hourAndMin = time.split(",");
  const hourNum = Number(hourAndMin[0]);
  const minNum = Number(hourAndMin[1]);

  return [hourNum, minNum];
};

export const convertToUtc = (month, day, year, time) => {

  const monthNum = Number(month);
  const dayNum = Number(day);
  const yearNum = Number(year);

  let hourNum, minNum;
  [hourNum, minNum] = parseTime(time);

  const localDate = new Date(yearNum, monthNum, dayNum, hourNum, minNum, 0);
  const unixUtc = localDate.getTime();
  const expired = (new Date()) >= localDate;

  return [unixUtc, expired];
};

export const getLocalTime = (dateObj) => {

  let hour = dateObj.getHours();
  let min = dateObj.getMinutes();
  let amPm = (hour <= 11) ? "AM" : "PM";

  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }

  min = String(min);
  min = (min.length === 1) ? "0" + min : min;

  const time = String(hour) + ":" + min + " " + amPm;
  return time;
};
