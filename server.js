const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");

//-------------------------------Routes------------------
const productsRouter = require("./routes/productsRouter");
const memberRouter = require("./routes/memberRouter");
// const groomerRouter = require("./routes/groomerRouter");
// const locationRouter = require("./routes/locationRouter");
// const calendarRouter = require("./routes/calendarRouter");
// const bookingRouter = require("./routes/bookingRouter");
// const mapRouter = require("./routes/mapRouter");

//-------------------------------------------------------

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

//-------------------------------Routes------------------
app.use("/api/", productsRouter);
//app.use("/api/products", productsRouter);
app.use("/api/member", memberRouter);
// app.use("/api/groomer", groomerRouter);
// app.use("/api/location", locationRouter);
// app.use("/api/calendar", calendarRouter);
// app.use("/api/booking", bookingRouter);
// app.use("/api/map", mapRouter);

//-------------------------------------------------------
const port = 3000;

app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});
