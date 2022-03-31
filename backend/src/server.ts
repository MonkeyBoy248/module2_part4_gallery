import express from 'express';
import bodyParser from "body-parser";
import { AuthenticationController } from "./controllers/authentication_controller";
import { GalleryController } from "./controllers/gallery_controller";
import dotenv from 'dotenv';
import { nonexistentPageHandler } from "./middleware/404_handler";
import { paths } from "./config";
import { Logger } from "./middleware/logger";
import {connectDB} from "./db/db_connection";
import {createAuthorizedUsers} from "./db/db_controllers/user_controller";

dotenv.config();

const app = express();
const authenticationController = new AuthenticationController();
const galleryController = new GalleryController();
const logger = new Logger();


const port = process.env.PORT || 8000;
const protocol = process.env.PROTOCOL || 'http';
const hostname = process.env.HOSTNAME || 'localhost';

console.log('port', process.env.PORT);

connectDB();
createAuthorizedUsers();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger.writeLogs);

app.use(authenticationController.router);
app.use(galleryController.router);

app.use('/',
  express.static(paths.STATIC_VIEWS_PATH),
  express.static(paths.STATIC_PAGES_PATH),
  express.static(paths.STATIC_PUBLIC_PATH),
)

app.use(nonexistentPageHandler);

app.listen(port, () => console.log(`Server is running on port ${port}.
${protocol}://${hostname}:${port}`));