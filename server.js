const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const shortner = require("./shortener");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("static"));

app.get("/:shortcode", (req, res) => {
  shortner
    .expand(req.params.shortcode)
    .then((url) => {
      res.redirect(url);
    })
    .catch((error) => {});
});

app.post("/api/v1/shorten", (req, res) => {
  let url = req.body.url;
  let shortcode = shortner.shorten(url);
  res.send(shortcode);
});

app.get("/api/v1/expand/:shortcode", (req, res) => {
  let shortcode = req.body.shortcode;
  let url = url.expand(shortcode);
  res.send(url);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Listening on port " + port);
});
