const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    user: { type: String, required: true},
    text: { type: String, required: true }
  }
)

mongoose.model(MessageSchema);