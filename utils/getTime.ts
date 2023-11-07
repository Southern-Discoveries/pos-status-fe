export function getTimeAgo(timestampString: string): string {
  const timestamp = new Date(timestampString).getTime();
  console.log(timestamp);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    return 'just now';
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < month) {
    const daysAgo = Math.floor(timeDifference / day);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < year) {
    const monthsAgo = Math.floor(timeDifference / month);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / year);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}
