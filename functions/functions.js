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

export function findConsultation(consultationP, consultationD, consultationId) {
  let patientConsultations = [...consultationP]; // Make a copy of the array
  let doctorConsultations = [...consultationD]; // Make a copy of the array
  let foundPatientIndex;
  let foundDocIndex;

  const docbooking = doctorConsultations.find(
    (i) => i.consultationId === consultationId
  );
  foundDocIndex = doctorConsultations.indexOf(docbooking);

  const userbooking = patientConsultations.find(
    (i) => i.consultationId === consultationId
  );
  foundPatientIndex = patientConsultations.indexOf(userbooking);

  return { foundPatientIndex, foundDocIndex };
}

export function nanosecondsToDate(nanoseconds) {
  // Convert nanoseconds to milliseconds (1 nanosecond = 0.000001 millisecond)
  const milliseconds = nanoseconds * 0.000001;

  // Create a Date object with the milliseconds value
  const date = new Date(milliseconds);

  return date;
}

export function secondsToDate(seconds) {
  // Convert seconds to milliseconds (1 second = 1000 milliseconds)
  const milliseconds = seconds * 1000;

  // Create a Date object with the milliseconds value
  const date = new Date(milliseconds);

  return formatDate(date);
}

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString(undefined, options);
}
