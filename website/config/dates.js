export const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatLong = (date) => {
  let formattedDate = new Date(date);

  return `${weekday[formattedDate.getDay()]}, ${
    month[formattedDate.getMonth()]
  } ${formattedDate.getDate()}`;
};

export const formatMonthShort = (date) => {
  let formattedDate = new Date(date);

  return `${formattedDate.getDate()} 
    ${monthShort[formattedDate.getMonth()]}
    `;
};
