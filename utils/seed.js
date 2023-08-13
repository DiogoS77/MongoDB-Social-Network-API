const databaseConnection = require("../config/connection");
const {User, Thought} = require("../models");
const {
  getRandomFullName,
  getRandomActivity,
  getRandomActivityData,
} = require("./data");

databaseConnection.on("error", (error) => error);

databaseConnection.once("open", async () => {
  console.log("Database connection established.");

  // Delete collections if they exist
  const thoughtCollectionCheck = await databaseConnection.db
    .listCollections({name: "thoughts"})
    .toArray();
  if (thoughtCollectionCheck.length) {
    await databaseConnection.dropCollection("thoughts");
  }

  const userCollectionCheck = await databaseConnection.db
    .listCollections({name: "users"})
    .toArray();
  if (userCollectionCheck.length) {
    await databaseConnection.dropCollection("users");
  }

  const generatedUsers = [];
  const generatedThoughts = getRandomActivityData(10);

  for (let i = 0; i < 20; i++) {
    const userName = getRandomFullName();

    generatedUsers.push({
      name: userName,
      email: `${userName.replace(" ", ".")}@example.com`,
    });
  }

  await User.collection.insertMany(generatedUsers);
  await Thought.collection.insertMany(generatedThoughts);

  console.table(generatedUsers);
  console.table(generatedThoughts);
  console.info("Data seeding completed successfully! 🌱");
  process.exit(0);
});
