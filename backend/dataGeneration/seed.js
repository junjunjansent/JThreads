const User = require("./models/user");
// const Hoot = require("./models/hoot");
// const categories = require("./models/categories");
const { faker } = require("@faker-js/faker");

const registerUsersForDeveloper = async () => {
  const usersData = [
    { username: faker.person.firstName(), password: faker.string.sample() },
    { username: faker.person.firstName(), password: faker.string.sample() },
  ];
  try {
    await User.deleteMany({});
    const newUsers = await User.create(usersData);
    console.log(newUsers);
  } catch (err) {
    console.log(err);
  }
};

// const createHootsForDeveloper = async () => {
//   const users = await User.find({});

//   const commentsData = [
//     { text: faker.lorem.text(), author: users[0]._id },
//     { text: faker.lorem.text(), author: users[0]._id },
//     { text: faker.lorem.text(), author: users[1]._id },
//     { text: faker.lorem.text(), author: users[1]._id },
//     { text: faker.lorem.text(), author: users[1]._id },
//     { text: faker.lorem.text(), author: users[1]._id },
//   ];

//   const hootData = [
//     {
//       title: faker.food.dish(),
//       text: faker.food.description(),
//       category: faker.helpers.arrayElement(categories),
//       author: users[0]._id,
//       comments: [commentsData[0], commentsData[1]],
//     },
//     {
//       title: faker.food.dish(),
//       text: faker.food.description(),
//       category: faker.helpers.arrayElement(categories),
//       author: users[1]._id,
//       comments: [commentsData[2], commentsData[3], commentsData[4]],
//     },
//   ];

//   try {
//     await Hoot.deleteMany({});
//     const newHoot = await Hoot.create(hootData);
//     console.log(newHoot);
//   } catch (err) {
//     console.log(err);
//   }
// };

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(`${process.env.MONGODB_URI}`);
  mongoose.set("debug", true);
  console.log("Connected to MongoDB to recreate Hoot Base");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await registerUsersForDeveloper();
  //   await createHootsForDeveloper();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

connect();
