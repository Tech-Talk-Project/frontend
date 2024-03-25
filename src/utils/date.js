export const getHourAndMinutes = (timestamp) => {
  const hour = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  return hour + ":" + minutes;
};
