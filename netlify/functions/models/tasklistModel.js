import mongoose from "mongoose";
import { taskSchema } from "./taskModel";

const tasklistSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    pos: {
      type: Number,
      required: true,
      default: 666,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [ taskSchema ]
  },
  {
    timestamps: true
  }
);

const Tasklist = mongoose.model('Tasklist', tasklistSchema);

export { Tasklist, tasklistSchema };
