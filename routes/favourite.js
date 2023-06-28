const router = require("express").Router();
const Favourite = require("../models/Favourite");

router.post("/create", async (req, res) => {
  try {
    const newFav = new Favourite({
      user_id: req.body.user_id,
      project_id: req.body.project_id, 
    });  

    const fav = newFav.save();
    res.status(200).json(fav);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const fav = await Favourite.find({ user_id: req.params.user_id });
    res.status(200).json(fav);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const offer = await Favourite.deleteOne({ project_id: req.params._id });
    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
