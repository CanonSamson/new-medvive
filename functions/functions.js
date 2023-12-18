import { v4 } from "uuid";

// Function to get the doctor's first name
export function getUserFirstName(user) {
  if (!user?.name) return "";

  const nameParts = user.name.split(" ");
  return nameParts.length > 0 ? nameParts[0] : user.name;
}

export function ID_GENERATOR() {
  return v4();
}

export const getWeek = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export function secondsToTimeFormat(seconds) {
  const date = new Date(0);
  date.setSeconds(seconds);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12; // Handle 0 as 12

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}${ampm}`;
  return formattedTime;
}


