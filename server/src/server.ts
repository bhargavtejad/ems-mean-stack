import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI, SERVERIP } = process.env;
const PORT = 5200;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    // app.use(cors());
    app.use(cors({ origin: SERVERIP ? `http://${SERVERIP}:4200` : '*' }));
    app.use("/employees", employeeRouter);

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://${SERVERIP}:${PORT}...`);
    });
  })
  .catch((error) => console.error(error));
