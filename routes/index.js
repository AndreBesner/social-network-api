const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("404 - That ain't it, chief, take a lap and try again!");
});

module.exports = router;
