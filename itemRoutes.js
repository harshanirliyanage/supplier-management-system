// itemRoutes.js

import express from 'express';
const router = express.Router();

import { getAllItems } from '../controllers/itemController.js';

// Route to get all items
router.get('/', getAllItems);

export default router;
