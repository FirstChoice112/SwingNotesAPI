const moment = require("moment");

// Formatar datumet till HH:mm
function formatTime(date) {
  return moment(date).format("HH:mm");
}

module.exports = { formatTime };
