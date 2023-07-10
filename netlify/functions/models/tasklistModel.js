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
      required: true
    },
    tasks: [ taskSchema ]
  },
  {
    timestamps: true
  }
);

const Tasklist = mongoose.model('Tasklist', tasklistSchema);

export { Tasklist, tasklistSchema };
