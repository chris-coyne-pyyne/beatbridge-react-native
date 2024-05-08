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
