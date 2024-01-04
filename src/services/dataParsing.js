function formatDateTime(dateTime) {
    const dateObj = new Date(dateTime);
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return dateObj.toLocaleDateString('en-GB', options);
}


function timeAgo(date) {
    if (!date) {
        return `-`
    }
    const now = new Date();
    const inputDate = new Date(date);
    const diff = now - date;
    const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (now.toDateString() === inputDate.toDateString()) {
        return 'Today'
    }

    if (!diff) {
        return `-`
    }

    if (daysPassed >= 8) {
        const weeksPassed = Math.floor(daysPassed / 7);
        return `${weeksPassed} weeks ago`;
    } else {
        return `${daysPassed} days ago`;
    }
    // const seconds = Math.floor(diff / 1000);
    // const minutes = Math.floor(seconds / 60);
    // const hours = Math.floor(minutes / 60);
    // const days = Math.floor(hours / 24);
    // const weeks = Math.floor(days / 7);
    // const months = Math.floor(days / 30);
    // const years = Math.floor(days / 365);
    //
    // if (years > 1) {
    //     return `${years} years ago`;
    // } else if (months > 1) {
    //     return `${months} months ago`;
    // } else if (weeks > 1) {
    //     return `${weeks} weeks ago`;
    // } else if (days > 1) {
    //     return `${days} days ago`;
    // } else if (hours > 1) {
    //     return `${hours} hours ago`;
    // } else if (minutes > 1) {
    //     return `${minutes} minutes ago`;
    // } else {
    //     return `${seconds} seconds ago`;
    // }
}

function sleepFor(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {formatDateTime, timeAgo, sleepFor};