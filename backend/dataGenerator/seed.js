// run this only in backend folder

const User = require("../models/User");
const { faker } = require("@faker-js/faker");
const { bcryptPassword } = require("../utils/bcrypt");

const registerUsersForDeveloper = async () => {
  const usersData = [
    {
      username: "user1",
      email: "user1@test.com",
      password: bcryptPassword("12345678"),
    },
    ...Array.from({ length: 4 }, () => ({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: bcryptPassword("12345678"),
    })),
    ...Array.from({ length: 5 }, () => ({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: bcryptPassword("12345678"),
      birthday: faker.date.birthdate(),
      gender: faker.helpers.arrayElement(["M", "F", "X"]),
      phoneNumber: faker.phone.number({ style: "international" }),
      profilePhoto: faker.internet.url(),
      defaultShippingAddress: faker.location.streetAddress(),
    })),
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
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.set("debug", true);
  mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

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
