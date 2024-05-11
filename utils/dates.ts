export const formatDate = (isoDateString: string) => {
  // Create a new Date object using the ISO date string
  const date = new Date(isoDateString);

  // Use toLocaleDateString to format the date as "Month Day"
  // Here 'en-US' is used for English language formatting, and options are provided to show only month and day
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long', // 'long' for full month name
    day: 'numeric', // 'numeric' for day of the month
  });

  console.log('formatted ', formattedDate);
  return formattedDate;
};

export const formatUnixTimestamp = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  const time = `${hours}:${formattedMinutes} ${ampm}`;

  return {
    month: month,
    day: day,
    time: time,
  };
};
