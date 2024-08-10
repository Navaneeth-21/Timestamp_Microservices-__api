// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// for empty parameter
app.get("/api/", (req, res) => {
  let dateCurrent = new Date();
  let timeStampcurrent = dateCurrent.getTime();
  res.json({
    unix: timeStampcurrent,
    utc: dateCurrent.toUTCString(),
  });
});

// api request for /api/:date?
app.get("/api/:date", (req, res) => {
  let unixTimestamp;
  let date;
  let utcDate;

  if (req.params.date) {
    const dateparam = req.params.date;

    if (!isNaN(dateparam)) {
      unixTimestamp = parseInt(dateparam);
      date = new Date(unixTimestamp);
      // res.json({unix:`${parseInt(unixTimestamp)}` , utc: `${date.toUTCString()}`})
    } else {
      date = new Date(dateparam);
      unixTimestamp = date.getTime();
    }
  } else {
    // if empty params is provided
    date = new Date();
    unixTimestamp = date.getTime();
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  utcDate = date.toUTCString();

  res.json({
    unix: unixTimestamp,
    utc: utcDate,
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
