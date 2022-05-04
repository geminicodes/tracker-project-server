import mongoose from 'mongoose';

/*
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})
*/

const jobSchema = mongoose.Schema({
    name: String,
    creator: String,
    title: String,
    companyName: String,
    jobUrl: String,
    status: String,
    notes: String,
    tags: [String],
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var JobItem = mongoose.model('JobItem', jobSchema);

export default JobItem;