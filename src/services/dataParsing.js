function formatDateTime(dateTime) {
      const dateObj = new Date(dateTime);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return dateObj.toLocaleDateString('en-GB', options);
    }

export { formatDateTime };