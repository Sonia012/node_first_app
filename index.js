const express = require("express");
const bodyParser = require("body-parser");
// const userRoutes = require("./routes/userRoutes")(app)
const app     = express();

app.use(bodyParser.json());


require("./routes/userRoutes")(app)

const PORT    = 5000;

app.listen(PORT, () => {
  console.log(`Server running`);
});
