import { application } from 'express';
import ResponseObject from '../error_handle/ResponseObject.js';
import ApplicationInfo from '../models/ApplicationInfo.js';

export const createApplication = async (req, res) =>{
    const application = req.body;
    console.log(req.body);

    const findApp = await ApplicationInfo.findOne({ApplicationName: application.ApplicationName, BusinessOwnerEmail: application.BusinessOwnerEmail});
    if(findApp){
        const response = new ResponseObject(400, "Failure", "That application already exists!");
        res.status(400).json(response);
    }

    //verify all fields in the request
    verifyApplicationName(application.ApplicationName, res);
    verifyApplicationType(application.ApplicationType, res);
    verifyTechnology(application.Technology, res);
    verifyTechnologyVersion(application.TechnologyVersion, res);
    verifyServerPlatform(application.ServerPlatform, res);
    verifyServerPlatformVersion(application.ServerPlatformVersion, res);
    verifyBusinessUnitName(application.BusinessUnitName, res);
    verifyBusinessOwnerEmail(application.BusinessOwnerEmail, res);
    verifySourceURL(application.SourceURL, res);
    verifyTreatmentType(application.TreatmentType, res);
    //Completed verification

    //if no errors, push application to database
    if(!res.headersSent){
        const newApp = new ApplicationInfo({
            ApplicationName: application.ApplicationName,
            ApplicationType: application.ApplicationType,
            Technology: application.Technology,
            TechnologyVersion: application.TechnologyVersion,
            ServerPlatform: application.ServerPlatform,
            ServerPlatformVersion: application.ServerPlatformVersion,
            BusinessUnitName: application.BusinessUnitName,
            BusinessOwnerEmail: application.BusinessOwnerEmail,
            SourceURL: application.SourceURL,
            TreatmentType: application.TreatmentType
        });

        try{
            await newApp.save();
            const response = new ResponseObject(200, "Success", `Success! Added ${application.ApplicationName} to the database`);
            res.status(200).json(response);
        }
        catch(err){
            const response = new ResponseObject(500, "Failure", err);
            res.status(500).json(response);
        }
    }
}


//Gets all applications in the database and sorts alphabetically
export const getAllApplications = async (req, res)=>{
    try{
        const sort = {ApplicationName: 1};
        const applications = await ApplicationInfo.find({}).sort(sort);

        if(!applications){
            const response = new ResponseObject(404, "Failure", "Applications not found!");
            res.status(404).json(response);
        }
        else{
            const response = new ResponseObject(200, "Success", {Applications: applications});
            res.status(200).json(response);
        }
    }
    catch(err){
        const response = new ResponseObject(500, "Failure", err);
        res.status(500).json(response);
    }
}

//Get applications associated by email
export const getAssociatedApplications = async (req, res) =>{
    try{
        const sort = {ApplicationName: 1};
        const applications = await ApplicationInfo.find({BusinessOwnerEmail: req.params.BusinessOwnerEmail}).sort(sort);

        if(!applications){
            const response = new ResponseObject(404, "Failure", "Applications not found!");
            res.status(404).json(response);
        }
        else{
            const response = new ResponseObject(200, "Success", {Applications: applications});
            res.status(200).json(response);
        }
    }
    catch(err){
        const response = new ResponseObject(500, "Failure", err);
        res.status(500).json(response);
    }
}

//Get a specific application by email and application name
export const getSpecificApplication = async (req, res) =>{
    console.log(req.params);

    try{
        const application = await ApplicationInfo.findOne(req.params);
        
        if(!application){
            const response = new ResponseObject(404, "Failure", `The ${req.params.ApplicationName} application associated with ${req.params.BusinessOwnerEmail} does not exist`);
            res.status(404).json(response);
        }
        else{
            const response = new ResponseObject(200, "Success", {Application: application});
            res.status(200).json(response);
        }

    }
    catch(err){
        const response = new ResponseObject(500, "Failure", err);
        res.status(500).json(response);
    }
}

//Update a specific application by email and name
export const updateSpecificApplication = async (req, res) =>{
    console.log(req.params);
    const modifyApp = req.body;
    console.log("REQUEST BODY");
    console.log(req.body);
    try{
        const application = await ApplicationInfo.findOne(req.params);

        if(!application){
            const response = new ResponseObject(404, "Failure", `The ${req.params.ApplicationName} application associated with ${req.params.BusinessOwnerEmail} does not exist`);
            res.status(404).json(response);
        }
        else if(JSON.stringify(req.body) === "{}" || !req.body){
            const response = new ResponseObject(400, "Failure", "Request is empty!");
            res.status(400).json(response);
        }
        else{
            await ApplicationInfo.findOneAndUpdate(req.params, modifyApp, {
                new: true
            });
            const response = new ResponseObject(200, "Success", `The ${req.params.ApplicationName} application has been updated!`);
            res.status(200).json(response);
        }
    }
    catch(err){
        const response = new ResponseObject(500, "Failure", `Failed to update ${req.params.ApplicationName} application`);
        res.status(500).json(response);
    }
}

//Delete an application

export const deleteApplication = async (req, res) =>{
    try{
        const app = await ApplicationInfo.findOne(req.params);

        if(!app){
            const response = new ResponseObject(400, "Failure", `Could not find an application named ${req.params.ApplicationName} associated with the email: ${req.params.BusinessOwnerEmail}`)
            res.status(400).json(response);
        }
        else{
            await ApplicationInfo.deleteOne(req.params);
            const response = new ResponseObject(200, "Success", `Application ${req.params.ApplicationName} has been removed from the database!`);
            res.status(200).json(response)
        }
    }
    catch(err){
        const response = new ResponseObject(500, "Failure", err);
        res.status(500).json(response);
    }
}


//Verification functions
function verifyApplicationName(appName, res){
    if(!appName && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Application Name was empty in the request!");
        res.status(400).json(response);
    }
}

function verifyApplicationType(appType, res){
    if(!appType && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Application Type was empty in the request!");
        res.status(400).json(response);
    }
}

function verifyTechnology(appTech, res){
    if(!appTech && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Application Tech was empty in the request!");
        res.status(400).json(response);
    }
}

function verifyTechnologyVersion(appTechV, res){
    if(!appTechV && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Application Tech Version was empty in the request!");
        res.status(400).json(response);
    }
}

function verifyServerPlatform(appServerPlatform, res){
    if(!appServerPlatform && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Server Platform was empty in the request!");
        res.status(400).json(response);
    }
}

function verifyServerPlatformVersion(appServerV, res){
    if(!appServerV && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Server Platform Version was empty in the request!");
        res.status(400).json(response);
    }
}

function verifyBusinessUnitName(appBizName, res){
    if(!appBizName && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Application Business Name was empty in the request!");
        res.status(400).json(response);
    }
}

function verifyBusinessOwnerEmail(appBizEmail, res){
    if(!appBizEmail && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Application Business Email was empty in the request!");
        res.status(400).json(response);
    }
}

function verifySourceURL(appURL, res){
    if(!appURL && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Source URL was empty in the request!");
        res.status(400).json(response);
    }
}

function verifyTreatmentType(appTreatment, res){
    if(!appTreatment && !res.headersSent){
        const response = new ResponseObject(400, "Failure", "Application Treatment Type was empty in the request!");
        res.status(400).json(response);
    }
}