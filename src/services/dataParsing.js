function formatDateTime(dateTime) {
      const dateObj = new Date(dateTime);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return dateObj.toLocaleDateString('en-GB', options);
    }


function timeAgo(date) {
  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 1) {
    return `${years} years ago`;
  } else if (months > 1) {
    return `${months} months ago`;
  } else if (weeks > 1) {
    return `${weeks} weeks ago`;
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}

export { formatDateTime , timeAgo };