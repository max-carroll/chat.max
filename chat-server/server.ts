import bodyParser from 'body-parser';
import express from 'express';
import { postMessage  } from './routes/messageRoutes';
// import { getUser } from './routes/users';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// messages
app.post('/api/messages', postMessage);


// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));