const env = require("./config/env");
const app = require("./app");

app.listen(env.port, () => {
  console.log(`API Hermanos Jota en http://localhost:${env.port}`);
});
