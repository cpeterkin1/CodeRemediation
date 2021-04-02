import mongoose from 'mongoose';

const applicationInfoSchema = mongoose.Schema({

    ApplicationName:{
        type: String,
        required: true
    },
    ApplicationType:{
        type: String,
        required: true
    },
    Technology:{
        type: String,
        required: true
    },
    TechnologyVersion:{
        type: String,
        required: true
    },
    ServerPlatform:{
        type: String,
        required: true
    },
    ServerPlatformVersion:{
        type: String,
        required: true
    },
    BusinessUnitName:{
        type: String,
        required: true
    },
    BusinessOwnerEmail:{
        type: String,
        required: true
    },
    SourceURL:{
        type: String,
        required: true
    },
    TreatmentType:{
        type: String,
        required: true
    }
});


export default mongoose.model('ApplicationInfo', applicationInfoSchema);