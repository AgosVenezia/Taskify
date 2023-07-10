import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pos: {
    type: Number,
    required: true,
    default: 99999
  },
  label: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export { Task, taskSchema };
