import express from 'express';
import {createApplication, deleteApplication, getAllApplications, getAssociatedApplications, getSpecificApplication, updateSpecificApplication} from '../controllers/applicationController.js';

const router = express.Router();

//Create Application
router.post('/', createApplication);

//Get all applications
router.get('/', getAllApplications);

//Get applications associated with biz email
router.get('/:BusinessOwnerEmail', getAssociatedApplications)

//Get a very specific application
router.get('/:BusinessOwnerEmail/:ApplicationName', getSpecificApplication);

//Update a very specific application
router.patch('/:BusinessOwnerEmail/:ApplicationName', updateSpecificApplication);

//delete a very specific application
router.delete('/:BusinessOwnerEmail/:ApplicationName', deleteApplication)

export default router;