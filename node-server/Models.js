const mongoose = require("mongoose");

const usrSchema = new mongoose.Schema({
    emp_id: { type: String, unique: true },
    name: String,
    designation: String,
    date_of_birth: String,
    age: String,
    gender: String,
    address: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    supkey: String,
    specialization: String
},
    {
        collection: "emp_masters"
    }
);
exports.emp_masters = mongoose.model('emp_masters', usrSchema);


const medSchema = new mongoose.Schema({
    name: String,
    company: String,
    type: String,
    medicine_code: { type: String, unique: true },
    Threshold: Number,
    Qty: Number,
    company_code: String
},
    {
        collection: "medicine_masters"
    }
);

exports.medicine_masters = mongoose.model('medicine_masters', medSchema);

const reqSchema = new mongoose.Schema({
    req_no: String,
    medicine_code: String,
    name: String,
    type: String,
    req_qty: Number,
    Status: String
},
    {
        collection: "req_masters"
    }
);

exports.req_masters = mongoose.model('req_masters', reqSchema);

const dispSchema = new mongoose.Schema({
    name: String,
    company: String,
    type: String,
    medicine_code: { type: String, unique: true },
    Threshold: Number,
    Qty: Number,
    company_code: String,
    status: String,
    req_no: String
},
    {
        collection: "disp_masters"
    }
);

exports.disp_masters = mongoose.model('disp_masters', dispSchema);

const disp_hSchema = new mongoose.Schema({
    date: String,
    Medicine: String,
    Issue: Number,
    emp_id: String,
    name: String
}, 
{
    collection: "disp_histories"
}
);

exports.disp_h = mongoose.model('disp_histories',disp_hSchema);

const encounterSchema = new mongoose.Schema({
    enc_id: {type: String, unique: true},
    emp_id: String,
    reg_date: String,
    slno: Number
});

exports.encounters = mongoose.model('encounters', encounterSchema);

const pathSchema = new mongoose.Schema({
    date: String,
    Test: String,
    Instruction: String,
    Doctor: String,
    Test_result: String,
    emp_id: String,
    sampleno: String
});

exports.path_masters = mongoose.model('path_masters', pathSchema);







// const GospelSchema = new mongoose.Schema({
//     Reference: String,
//     Verse: String
// },
// {
//     collection: "message"
// });

// exports.Preach = mongoose.model("message",GospelSchema);


