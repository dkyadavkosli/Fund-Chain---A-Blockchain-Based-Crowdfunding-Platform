const router = require("express").Router();
const Comment = require("../models/Comment");

//REGISTER
router.post("/create", async (req, res) => {
  try {
    const newCom = new Comment({
      user_name: req.body.user_name,
      project_id: req.body.project_id, 
      desc: req.body.desc
    });

    const com = newCom.save();
    res.status(200).json(com);
  } catch (err) {
    res.status(500).json("error");
  }
});

router.get("/project/:project_id", async (req, res) => {
  try {
    const com = await Comment.find({ project_id: req.params.project_id });
    res.status(200).json(com);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;