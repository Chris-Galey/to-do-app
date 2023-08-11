const { User, Todo } = require("./models");
const { verifyToken } = require("./middleware");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = process.env.KEY;

router.get("/", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/", verifyToken, async (req, res) => {
  const { title, description } = req.body;

  try {
    const todo = new Todo({
      title,
      description,
    });
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create newUser
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    //save the user to the database
    await newUser.save();

    return res.status(201);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    console.log(email, password, user);
    //compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //generate JWT Token
    const token = jwt.sign({ userId: user._id }, key, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      { title, description, completed },
      { new: true }
    );
    res.send(`Update todo with id ${id}`);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
