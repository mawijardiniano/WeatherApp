const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const weatherRouter = require("./routes/weatherRoutes")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use("/get-weather",weatherRouter )

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
