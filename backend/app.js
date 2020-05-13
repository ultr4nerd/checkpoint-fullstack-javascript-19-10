const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const { authMiddleware } = require('./middleware');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(authMiddleware);
app.use('/auth', authRouter);

const server = app.listen(process.env.PORT || 3000, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Listening on ${server.address().port}`);
  } catch (e) {
    console.log(e);
    console.log('Error while connecting to database');
    process.exit(1);
  }
});
