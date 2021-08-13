const User = require('../users/users-model');


function logger(req, res, next) {
  // DO YOUR MAGIC
  const time = new Date().toISOString()
  console.log(`${time} ${req.ip} ${req.method} ${req.url}`);
  //we are done here, move on to the next piece of middleware in the stack
  next();
}

async function validateUserId(req, res, next) {
  const userId = req.params.id;
  const user = await User.getById(userId)
  if (user) {
    req.user = user
    next()
  } else {
    res.status(404).json({ message: "user not found" })
  }
}

async function validateUser(req, res, next) {
  const { name } = await req.body;
  if (name) {
    next()
  } else {
    res.status(400).json({ message: "missing required name field" })
  }}

async function validatePost(req, res, next) {
  const { text } = await req.body;
  if (text) {
    next()
  } else {
    res.status(400).json({ message: "missing required text field" })
  }}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}