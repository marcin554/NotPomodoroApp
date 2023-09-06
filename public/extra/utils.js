function getTimeInDays(date) {
    const oneDay = 24 * 60 * 60 * 1000;
  
    let currentDate = new Date();
    let dateStarted = new Date(date);
  
    let differenceDays = Math.round(
      Math.abs((currentDate - dateStarted) / oneDay)
    );
  
    return differenceDays;
  }

  function hoursToMinutes(hours) {
    return hours * 60;
  }

  module.exports = {
    getTimeInDays,
    hoursToMinutes
  };

  