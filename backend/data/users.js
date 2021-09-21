import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin Nistrator",
    email: "admin@fake.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Johnny Doe",
    email: "johnny@fake.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Janette Doe",
    email: "janette@fake.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
