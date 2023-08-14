function convertTimestampToFormattedString(timestamp) {
  const date = new Date(timestamp);

  const dateFormatConfig = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeFormatConfig = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = date.toLocaleDateString("en-US", dateFormatConfig);
  const formattedTime = date.toLocaleTimeString("en-US", timeFormatConfig);

  return `${formattedDate} at ${formattedTime}`;
}

module.exports = {convertTimestampToFormattedString};
