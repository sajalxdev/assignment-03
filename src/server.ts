import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database is connected successfully");

    server = app.listen(config.PORT, () => {
      console.log(`Server is running on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection is detected, shutting down the server`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(`uncaughtException is detected, shutting down the server`);

  process.exit(1);
});
