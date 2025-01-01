function FormatDate(date) {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
  
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  }

  export {FormatDate}