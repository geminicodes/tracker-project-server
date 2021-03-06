import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
    name: String,
    creator: String,
    title: String,
    companyName: String,
    jobUrl: String,
    status: String,
    tags: [String],
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var JobItem = mongoose.model('JobItem', jobSchema);

export default JobItem;