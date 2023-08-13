const names = [
  "Liam",
  "Emma",
  "Noah",
  "Olivia",
  "Sophia",
  "Jackson",
  "Ava",
  "Aiden",
  "Isabella",
  "Lucas",
  "Mia",
  "Liam",
  "Oliver",
  "Amelia",
  "Ethan",
  "Harper",
  "Daniel",
  "Evelyn",
  "Alexander",
  "Charlotte",
  "Michael",
  "Sophia",
  "William",
  "Abigail",
  "James",
  "Emily",
  "Elijah",
  "Elizabeth",
  "Benjamin",
  "Sofia",
  "Logan",
  "Avery",
  "Mason",
  "Ella",
  "Sebastian",
  "Scarlett",
  "Ezra",
  "Grace",
  "Henry",
  "Chloe",
  "Joseph",
];

const activities = [
  "Exploring a new hiking trail",
  "Trying out a new art style",
  "Attending a thought-provoking lecture",
  "Rediscovering the joy of board games",
  "Volunteering at an animal sanctuary",
  "Reflecting on the beauty of a rainy day",
  "Finding serenity in meditation",
  "Enjoying the soothing melodies of jazz music",
  "Trying a new sport and loving the challenge",
  "Getting lost in the pages of a fantasy novel",
  "Experimenting with cooking exotic dishes",
  "Appreciating architectural wonders",
  "Planting a garden to nurture nature",
  "Sharing thoughts on the future of technology",
  "Chasing waterfalls and embracing adventure",
];

const reactions = [
  "Bravo!",
  "Heartfelt",
  "Amused",
  "Intrigued",
  "Touched",
  "Furious",
  "This brightened my day!",
  "So motivating!",
  "I resonate with this.",
  "Absolutely hilarious!",
  "Heartrending.",
  "Impressive!",
  "A fresh perspective!",
  "Appreciate your sharing!",
  "Keep shining!",
  "Epic!",
  "This got me thinking.",
  "Inspired by your words.",
  "Thrilling!",
  "Embracing the now!",
];

function getRandomItemFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomFullName() {
  const firstName = getRandomItemFromArray(names);
  const lastName = getRandomItemFromArray(names);
  return `${firstName} ${lastName}`;
}

function getRandomActivities(count) {
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push({
      activity: getRandomItemFromArray(activities),
      reactions: getRandomReactions(),
      username: getRandomFullName(),
    });
  }
  return results;
}

function getRandomReactions() {
  const count = Math.floor(Math.random() * 4);
  if (count === 0) {
    return [];
  }
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push({
      reaction: getRandomItemFromArray(reactions),
      username: getRandomFullName(),
    });
  }
  return results;
}

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

module.exports = {
  getRandomFullName,
  getRandomActivities,
  convertTimestampToFormattedString,
};
