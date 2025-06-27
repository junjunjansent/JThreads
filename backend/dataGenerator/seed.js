// run this only in backend root folder
const User = require("../models/User");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariation");
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
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthday: faker.date.birthdate(),
      gender: faker.helpers.arrayElement(["M", "F", "X"]),
      phoneNumber: faker.phone.number({ style: "international" }),
      profilePhoto: faker.image.avatar(),
      defaultShippingAddress: faker.location.streetAddress(),
    })),
  ];
  try {
    await User.deleteMany({});
    const newUsers = await User.create(usersData);
    console.log(newUsers);
    return newUsers;
  } catch (err) {
    console.log(err);
  }
};

const inputTestProducts = async (users) => {
  const productData = [
    ...Array.from({ length: 20 }, () => ({
      productName: faker.commerce.product(),
      productIsActive: true,
      productDescription: faker.commerce.productDescription(),
      productCategory: faker.helpers.arrayElement([
        "Tops",
        "Bottoms",
        "Headwear",
        "Bags",
        "Accessories",
        "Misc",
      ]),
      productOwner: faker.helpers.arrayElement(users)._id,
      productDisplayPhoto: faker.image.urlPicsumPhotos(),
      productDefaultDeliveryTime: 30,
    })),
  ];
  try {
    await Product.deleteMany({});
    const newProducts = await Product.create(productData);
    console.log(newProducts);
    return newProducts;
  } catch (err) {
    console.log(err);
  }
};

const inputTestProductVariants = async (products) => {
  const maxInventoryQty = faker.number.int({ min: 1 });
  const productVariationData = [
    ...Array.from({ length: 50 }, () => ({
      mainProduct: faker.helpers.arrayElement(products)._id,
      productVarDesign: faker.commerce.product(),
      productVarInventoryQty: maxInventoryQty,
      productVarAvailableQty: faker.number.int({
        min: 0,
        max: maxInventoryQty,
      }),
      productVarPrice: faker.number.float({ fractionDigits: 2, min: 0 }),
      productVarDisplayPhoto: faker.image.urlPicsumPhotos(),
    })),
  ];
  try {
    await ProductVariant.deleteMany({});
    await ProductVariant.create(productVariationData);
    console.log(productVariationData);
  } catch (err) {
    console.log(err);
  }
};

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
  const createdUsers = await registerUsersForDeveloper();
  const createdProducts = await inputTestProducts(createdUsers);
  await inputTestProductVariants(createdProducts);

  //   await createHootsForDeveloper();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

connect();
