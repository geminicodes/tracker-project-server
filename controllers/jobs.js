import express from 'express';
import mongoose from 'mongoose';

import JobItem from '../models/jobItem.js';

const router = express.Router();

export const getJobs = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await JobItem.countDocuments({});
        const jobs = await JobItem.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: jobs, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getJobsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const jobs = await JobItem.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: jobs });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createJob = async (req, res) => {
    const job = req.body;

    const newJobItem = new JobItem({ ...job, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newJobItem.save();

        res.status(201).json(newJobItem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateJob = async (req, res) => {
    const { id } = req.params;

    const { title, companyName, jobUrl, status, tags, creator } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No job found with id: ${id}`);

    const updatedJob = { title, companyName, jobUrl, status, tags, creator, _id: id };

    await JobItem.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No job found with id: ${id}`);

    await JobItem.findByIdAndRemove(id);

    res.json({ message: "Job deleted successfully." });
}

export const likeJob = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No job found with id: ${id}`);
    
    const job = await JobItem.findById(id);

    const index = job.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      job.likes.push(req.userId);
    } else {
      job.likes = job.likes.filter((id) => id !== String(req.userId));
    }
    const updatedJob = await JobItem.findByIdAndUpdate(id, job, { new: true });
    res.status(200).json(updatedJob);
}

export default router;