export const getHourAndMinutes = (timestamp) => {
  const hour = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  return hour + ":" + minutes;
};

export const getDateInfo = (timestamp) => {
  const year = timestamp.getFullYear();
  const month = timestamp.getMonth();
  const day = timestamp.getDate();
  const hour = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  return `${year}.${month}.${day} ${hour}:${minutes}`;
};
