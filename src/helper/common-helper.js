export function getLocalDate(dateString) {
  const localDate = new Date(dateString);

  // Get the current date
  const today = new Date();

  // Check if the given date is the same as today
  if (
    localDate.getFullYear() === today.getFullYear() &&
    localDate.getMonth() === today.getMonth() &&
    localDate.getDate() === today.getDate()
  ) {
    return "Today";
  }

  // Get the local date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  };
  const localDateTimeString = localDate.toLocaleString("en-US", options);

  return localDateTimeString;
}
