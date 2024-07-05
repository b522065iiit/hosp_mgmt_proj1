require("dotenv").config(); {/* Security Middleware */ }
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const JWT_SECRET = "qwertyuio234567890sdfghjkl!@#$%^&*(zxcvbn@Je$u$"

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// Import models
// const { emp_masters, medicine_masters, Preach } = require('./Models');
const { emp_masters, medicine_masters, disp_masters,
    encounters, path_masters, disp_h, req_masters
 } = require('./Models');

// const { prescriptionSchema } = require('./Models');
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
.then(()=>{console.log("db connected");})
.catch((e)=>{console.log(e);})

const server = express();
let dt = new Date().toLocaleDateString();
if(dt.length === 8){
    dt = "0"+dt.slice(0,3)+"0"+dt.slice(3,);
}
else if(dt.length === 9){
    dt = dt.slice(0, 3) + "0" + dt.slice(3,);
}
// console.log(dt);
// forgot password functionality
server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: false }));

{/* Middleware */ }
server.use(cors());
server.use(bodyParser.json());


// encounterid
// function to get the max slno
const getMaxslno = async (reg_date) => {
    try{
    const ent = await encounters.aggregate([
        {
            $match: { reg_date }
        },
        {
            $group: {
                _id: null,
                maxslno: { $max: "$slno" }
            }
        }
    ]);
    if(ent.length > 0){
        return ent[0].maxslno;
    }
    else{
        return 0;
    }}
    catch(error){
        console.log(error);
        return -1;
    }
}
// Check and store encounter id
server.post('/slnum', async(req,res) => {
    const { reg_date, emp_id, enc_id, slno } = req.body;
    try {
        if(enc_id === null){
        const isreg = await encounters.findOne({reg_date, emp_id});
        if(isreg){
            return res.json({enc: isreg.enc_id});
        }
        else{
        const maxslno = await getMaxslno(reg_date);// encounters.find({}).sort({slno: -1}); similar output
        // console.log(maxslno);
        if(maxslno !== -1){
        return res.json({ enc: false, slno: maxslno });} }
        }
        if(enc_id){
        const isreg = await encounters.findOne({ reg_date, emp_id });
        if (isreg) { return res.json({ 'stat': null }); }
        const reg = await encounters.insertMany([{reg_date,emp_id,enc_id,slno}]);
        console.log(await encounters.findOne({enc_id}));
        if(reg){return res.json({'stat': true, 'reg_date': reg_date});}
        }
    } catch (error) {
        console.log(error);
    }
})
// doctor

// // fetching for doctor page
// server.post('/encounter', async(req, res) => {
//     const { enc_id, doc_id } = req.body;
//     try {
//         const curpatient = await encounters.findOne({enc_id});
//         let patientdet = await emp_masters.findOne({emp_id : curpatient.emp_id});
//         return res.json(patientdet);
//     } catch (error) {
//         console.log(error);
//         return res.json({'error': error});
//     }
// })

const prescriptionSchema = new mongoose.Schema({
    date: String,//
    Medicine: String,
    Test: String,
    order_qty: Number,
    Issue: Number,//
    duration: String,
    frequency: String,
    Instruction: String,
    Doctor: String,
    Repeat: String,
    Test_result: String
});
const docSchema = new mongoose.Schema({
    date: String,//
    Medicine: String,
    Test: String,
    order_qty: Number,
    duration: String,
    frequency: String,
    Instruction: String,
    Patient: String,
    PatientID: String,
    Repeat: String
});
// fetching patient data
server.post('/checkenc', async (req, res) => {
    const { encid } = req.body;
    try {
        const patient = await encounters.findOne({ enc_id: encid });
        console.log(patient);
        if (patient) {
            const emp_id = patient.emp_id;
            const patientdet = await emp_masters.findOne({ emp_id });
            const pat_pres = mongoose.model('p' + emp_id, prescriptionSchema);
            const med_hist = await pat_pres.find({ Medicine: { $exists: true } });
            const test_hist = await pat_pres.find({ Test: { $exists: true } });
            res.json({patdata: patientdet, medHist: med_hist, testHist: test_hist});
        }
        else { return res.json({ 'invalid': true }); }
    } catch (error) {
        console.log(error);
    }
})
async function path_pres(id,pres){
    try{
        const ppres = await path_masters.insertMany([{
        date: pres.date,
        Test: pres.Test,
        Instruction: pres.Instruction,
        Doctor: pres.Doctor,
        Test_result: pres.Test_result,
        emp_id: id,
    }]);
    return ppres;}
    catch(error){
        console.log(error);
    }
}
// uploading prescription into database
server.post('/doc_pres', async(req,res) => {
    const { doc_id, pat_id, pat_name, medicinePres, testPres } = req.body;
    const pat_pres = mongoose.model('p'+pat_id, prescriptionSchema);
    const doc_pres = mongoose.model('d'+doc_id, docSchema);
    const doc_det = await emp_masters.findOne({emp_id: doc_id});
    let pres_doc = [];
    try{
        medicinePres.forEach(p => {
            p.date = dt;
            p.Issue = null;
            p.Doctor = doc_det.name;
            pres_doc.push({
                date: dt,
                Medicine: p.Medicine,
                order_qty: p.order_qty,
                duration: p.duration,
                frequency: p.frequency,
                Instruction: p.Instruction,
                Patient: pat_name,
                PatientID: pat_id,
                Repeat: p.Repeat
            });
        });
        testPres.forEach(p => {
            p.date = dt;
            p.Doctor = doc_det.name;
            p.Test_result = 'pending';
            pres_doc.push({
                date: dt,
                Test: p.Test,
                Instruction: p.Instruction,
                Patient: pat_name,
                PatientID: pat_id
            });
            console.log(path_pres(pat_id,p));
        });

        // insert the data into db
        const ins_patm = await pat_pres.insertMany(medicinePres);
        console.log(ins_patm);
        const ins_patt = await pat_pres.insertMany(testPres);
        console.log(ins_patt);
        const ins_doc = await doc_pres.insertMany(pres_doc);
        console.log(ins_doc);
        return res.json({'stat':'success'});
    }
    catch(error){
        console.log(error);
        return res.json({'stat': 'error'});
    }
    
})

// doctor: diagnosis history
server.post('/dhistory', async (req, res) => {
    const { doc_id } = req.body;
    try {
        const doc_pres = mongoose.model('d' + doc_id, docSchema);
        const doc_hist = await doc_pres.find({});
        return res.json(doc_hist);
    } catch (error) {
        console.log(error);
        return res.json({ 'error': error });
    }
})

// medicine_masters
// StockRep
server.post('/medstore_Stockrep', async (req, res) => {
    const { desg } = req.body;
    try {
        const medstore_Stockrep = await medicine_masters.find({});
        const ms_office = await emp_masters.findOne({designation: desg},{emp_id: 1, name: 1});
        if(ms_office){
            return res.json({ status: "ok", data: medstore_Stockrep, desg: ms_office });
        }
        res.json({ status: "ok", data: medstore_Stockrep });
    } catch (error) {
        console.log(error);
    }
})

// disp_masters
// fetch prescription
server.post('/fetchPres', async(req, res) => {
    const { encid } = req.body;
    try{
        const encounter = await encounters.findOne({enc_id: encid});
        if(!encounter){
            return res.json({'stat':'not found'});
        }
        const pat_pres = mongoose.model('p' + encounter.emp_id, prescriptionSchema);
        const presc = await pat_pres.find({ date: encounter.reg_date, Medicine: { $exists: true } });
        // console.log(presc);
        const pat_data = await emp_masters.findOne({emp_id: encounter.emp_id});
        return res.json({pres: presc,
            pat_det: {name: pat_data.name, emp_id: pat_data.emp_id, encdt: encounter.reg_date, age: pat_data.age}
        });
    }catch(error){
        console.log(error);
        return res.json({'stat':'error'});
    }
})
// Issue medicines in the prescription
async function issueMed(name, medicine, emp_id){
    try{
        let med = null;
        if(!medicine.Issue){
            med = await disp_masters.findOneAndUpdate(
            {name : medicine.Medicine, Qty: {$gte: medicine.order_qty}},
            {$inc: {Qty: -medicine.order_qty}},// $inc to make atomic changes
            {new:true});
        }

    if(!med){return medicine;}
    // If issued successfully
    const pat_pres = mongoose.model('p' + emp_id, prescriptionSchema);
    const pres_up = await pat_pres.findOneAndUpdate({ Medicine: medicine.Medicine }, { Issue: medicine.order_qty }, {new:true});
    return disp_h.insertMany([{
        date: pres_up.date,
        Medicine: pres_up.Medicine,
        Issue: pres_up.Issue,
        emp_id: emp_id,
        name: name
    }]);

    }catch(error){
        console.log(error);
    }
}
server.post('/IssuePres', async(req,res) => {
    const { emp_id, date } = req.body;
    try {
        const pat_pres = mongoose.model('p' + emp_id, prescriptionSchema);
        const medList = await pat_pres.find({date, Medicine: {$exists: true}});
        const emp_det = await emp_masters.findOne({emp_id});
        medList.forEach(p => {
            issueMed(emp_det.name, p, emp_id);//
        })
        const enc = await encounters.findOne({reg_date: date,emp_id});
        return res.json({'encid':enc.enc_id});
    } catch (error) {
        console.log(error);
        res.json({'stat': 'error'});
    }
})
// fetch the tests to be performed
server.post('/fetchTest', async(req,res) => {
    const { emp_id, day, send } = req.body;
    try {
        if(send === 'test'){
            const test = await path_masters.find({ Test_result: "pending", sampleno: {$exists: true} });
            return res.json({tests: test});
        }
        if(send === 'testRes'){
            const test = await path_masters.find({ Test_result: { $ne: "pending" } });
            return res.json(test);
        }
        const pat = await emp_masters.findOne({emp_id});
        const test = await path_masters.find({emp_id, Test_result: "pending"});
        return res.json({pat_det: pat, tests: test});
    } catch (error) {
        console.log(error);
        res.json({'stat':'error'});
    }
})
async function setSampleNo(Test){
    const t_updt = await path_masters.findOneAndUpdate({emp_id : Test.emp_id, Test_result: 'pending', Test: Test.Test},{sampleno : Test.sampleno},{new: true});
    if(t_updt){return t_updt;}
}
server.post('/setTest', async (req, res) => {
    const { emp_id, samples, save } = req.body;
    try {
        if(save){
            const save_test = await path_masters.findOneAndUpdate({sampleno: samples.sampleno},{Test_result: samples.Test_result},{new: true});
            const pat_pres = mongoose.model('p' + samples.emp_id, prescriptionSchema);
            const uppat = await pat_pres.findOneAndUpdate({ date: samples.date, Test: samples.Test }, { Test_result: samples.Test_result }, { new: true });
            if(save_test.acknowledged === true && save_test.modifiedCount === 1){
                
                if(uppat.acknowledged === true && uppat.modifiedCount === 1){
                    return res.json({saved: true});//
                }
            }else{
                return res.json({saved: false});//
            }
        }
        samples.forEach(s => {
            const test_update = setSampleNo(s);
            console.log(test_update);
            // const test = await path_masters.findOneAndUpdate({ emp_id, Test_result: "pending" });
        })
        
        return res.json({ 'stat': true});
    } catch (error) {
        console.log(error);
        res.json({ 'stat': 'error' });
    }
})
// stock
server.post('/disp_stock', async(req,res) => {
    const {send, desg} = req.body;
    try {
        if(desg){
            const disp_stock = await disp_masters.find({});
            const office = await emp_masters.findOne({designation: desg});
            return res.json({ status: "ok", data: disp_stock, desg: office });
        }
        if(send === true){
        const disp_stock = await disp_masters.find({});
        return res.json({ status: "ok", data: disp_stock });
        }else if(send === 'hist'){
            const disp_hist = await disp_h.find({});
            return res.json({disp_hist: disp_hist});
        }
        else if(send === 'req_app'){
            const disp_stock1 = await req_masters.find({status: {$exists: false}});
            const disp_stock2 = await req_masters.find({ status: 'pending' });
            
            const disp_stock = [...disp_stock1, ...disp_stock2];
            return res.json({ status: "ok", stock: disp_stock });
        }
    } catch (error) {
        console.log(error);
    }
})

server.post('/applyRequisition', async(req,res) => {
    const { medicine_code, status } = req.body;
    // console.log(req.body);
    try {
        // const update = await disp_masters.updateOne({ medicine_code }, { status });
        // console.log(update);
        // await disp_masters.updateOne({ medicine_code }, { status, req_no: dt },{new: true});
        const medicine = await disp_masters.findOneAndUpdate({ medicine_code }, { status, req_no: dt }, { new: true });;
        await req_masters.insertMany([{
            req_no: dt,
            medicine_code,
            name: medicine.name,
            type: medicine.type,
            req_qty: medicine.Threshold - medicine.Qty + 10
        }]);
        res.json({updated: true});
    } catch (error) {
        console.log(error);
        return res.json({updated: false});
    }
})
// Requisition approval by MedStore
server.post('/approveRequisition', async (req, res) => {
    const { med_code, stat, req_n } = req.body;
    // console.log(req.body);
    try {
        // const update = await disp_masters.updateOne({ medicine_code }, { status });
        // console.log(update);
        // await disp_masters.updateOne({ medicine_code }, { status, req_no: dt },{new: true});

        // if status === 'success', then final update
        if (stat === 'success') {
            const disp_update = await disp_masters.findOneAndUpdate({ medicine_code: med_code }, { $inc: { Qty: +medicine.req_qty } }, { new: true });
            console.log(disp_update);
            const medStore_update = await medicine_masters.findOneAndUpdate({ medicine_code: med_code }, { $inc: { Qty: -medicine.req_qty } }, { new: true });
            console.log(medStore_update);
            res.json({ updated: true });
        }

        const medstock = await medicine_masters.findOne({medicine_code: med_code});
        let medicine = await req_masters.findOne({ medicine_code: med_code, req_no: req_n });
        if(medstock.Qty >= medicine.req_qty){
            medicine = await req_masters.updateOne({ medicine_code: med_code }, { status:stat } , { new: true });
            console.log(medicine);
            if(!(medicine.acknowledged && medicine.modifiedCount === 1)) {
                return res.json({ updated: false, medicine_code: med_code });
            }
        }
        else { return res.json({ updated: false, medicine_code: med_code }); }
        
        res.json({ updated: true });
    } catch (error) {
        console.log(error);
        return res.json({ updated: false });
    }
})

// emp_masters
// you page
server.post('/you', async(req,res) => {
    const { id } = req.body;
    try {
        const emp = await emp_masters.findOne({emp_id: id});
        const pat_pres = mongoose.model('p' + id, prescriptionSchema);
        const med_hist = await pat_pres.find({ Medicine: { $exists: true } });
        const test_hist = await pat_pres.find({ Test: { $exists: true } });
        return res.json({ patdata: emp, medHist: med_hist, testHist: test_hist });
    } catch (error) {
        console.log(error);
    }
})
// existing employee data
server.post('/emp_det', async (req, res) => {
    const { send } = req.body;
    let projection = { emp_id: 1, name: 1, designation: 1, specialization: 1 };
    try {
        if(send === 'doctors'){
            const emp = await emp_masters.find({designation: 'doctor'}, projection);
            return res.json(emp);
        }
        if(send === 'pathologists'){
            const emp = await emp_masters.find({ designation: { $in: ['pathologist', 'asst. pathologist'] } }, projection);
            return res.json(emp);
        }
        const emp = await emp_masters.find({});
        return res.json(emp);
    } catch (error) {
        console.log(error);
    }
})
// add new employee by superadmin
server.post('/add_emp', async (req, res) => {
    const {emp_id, email} = req.body;
    try {
        const e_id = await emp_masters.findOne({ emp_id });
        // console.log(e_id); // null or doc
        if(e_id){return res.json({added:null});}
        const e_email = await emp_masters.findOne({ email });
        if(e_email){return res.json({added:null});}
        const emp = await emp_masters.insertMany([req.body]);
        if(emp){return res.json({added: true});}
        // return res.json(emp);
    } catch (error) {
        res.json({added: false});
        console.log(error);
    }
})
// add a specialization
server.post('/update_doc', async (req, res) => {
    const { emp_id, specialization } = req.body;
    try {
        const updateResult = await emp_masters.updateOne(
            { emp_id },
            { specialization }
        );
        console.log(updateResult);
        if (updateResult.modifiedCount > 0) {
            return res.status(200).json({ updated: true });
        } else {
            return res.status(404).json({ updated: false });
        }
        // console.log(delEmp); // null or doc
    } catch (error) {
        console.log(error);
        return res.json({ updated: false });
    }
})
// delete an employee
server.post('/del_emp', async (req, res) => {
    const { emp_id } = req.body;
    try {
        const delEmp = await emp_masters.findOneAndDelete({emp_id});
        if(delEmp){return res.json({deleted: true});}
        // console.log(delEmp); // null or doc
    } catch (error) {
        console.log(error);
    }
})
// update existing employee details
server.post('/update_emp', async (req, res) => {
    const { emp_id } = req.body;
    try {
        const up_Emp = await emp_masters.updateOne({ emp_id },req.body,{new:true});
        if (up_Emp) { return res.json({ updated: true }); }
        else { return res.json({ updated: false }); }
        // console.log(delEmp); // null or doc
    } catch (error) {
        console.log(error);
        return res.json({ updated: false });
    }
})
// registration
let empid = "";
server.post('/register', async(req,res) => {
    const { emp_id, email } = req.body; // destructuring to access indivisual elements
    // console.log(req.body);
    try {
        const Emp = await emp_masters.findOne({ emp_id });
        // console.log(Emp);
        if(Emp.email != email){
            return res.json({status: "invalid"})
        }
        if(Emp.password){
            return res.json({status: "repeat"});
        }
        // Generate a secret key with a length 
        // of 20 characters 
        const secret = speakeasy.generateSecret({ length: 20 });

        // Generate a TOTP code using the secret key 
        const code = speakeasy.totp({

            // Use the Base32 encoding of the secret key 
            secret: secret.base32,

            // Tell Speakeasy to use the Base32  
            // encoding format for the secret key 
            encoding: 'base32'
        });

        // Log the secret key and TOTP code 
        // to the console 
        console.log('Secret: ', secret.base32);
        console.log('Code: ', code);
        codeotp = code.toString();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'OTP for registration',// add sth else
            text: "OTP for registration is: "+code
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        empid = emp_id;
        return res.json({status: code});
        

    } catch (error) {
        res.json({ status: "error" });
    }
})
server.post('/otpverf', async(req,res) => {
    const { register, password } = req.body;
    if (register === true) { try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        // console.log(encryptedPassword);
        // console.log(empid);
        const updatedEmployee = await emp_masters.updateOne({emp_id: empid}, {password: encryptedPassword}, { new: true });
        // console.log(updatedEmployee);
        if(updatedEmployee.acknowledged && updatedEmployee.modifiedCount === 1){
            empid = "";
            return res.json({status: 'success'});
        }
    } catch (error) {
        console.log(error);
        empid = "";
        return res.json({ status: "error" });
    }}
})

// login
server.post('/login', async(req, res) => {
    const { emp_id, password, supkey } = req.body;
    try {
        const Emp = await emp_masters.findOne({ emp_id });
        // console.log(Emp);
        if (Emp) {
            if(Emp.supkey && !supkey){
                return res.json({'loggedIn': false})
            }
            bcrypt.compare(password,Emp.password)
            .then((msg) => {// true/ false
                if(!msg){
                    return res.json({'loggedIn': false})
                }
                if(supkey){
                    bcrypt.compare(supkey, Emp.supkey)
                    .then((msg) => {
                        if(!msg){
                            return res.json({'loggedIn': false})
                        }
                        // return res.json({ 'loggedIn': true, 'user': 'SuperAdmin' }) // Not to be exec
                    })
                }
                return res.json({'loggedIn':true,'user':Emp.designation, 'emp_id': emp_id, 'usrname': Emp.name});
            })
        }
    }
    catch(error){
        res.json({'error':error});
    }
})

// forgot password
server.post('/forgot-password', async(req,res) => {
    const { email } = req.body;
    try {
        const oldEmpl = await emp_masters.findOne({email});
        if(!oldEmpl){
            return res.json({status : "Email not exists!!"});
        }
        const secret = JWT_SECRET + oldEmpl.password;
        const token = jwt.sign({email: oldEmpl.email, id: oldEmpl.emp_id},secret,{expiresIn: '5m'});
        const link = `http://localhost:3000/reset-password/${oldEmpl.emp_id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'Password reset',// add sth else
            text: link
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({status: 'error'});
                return console.log(error);
            } else {
                res.json({status: 'sent'});
                return console.log('Email sent: ' + info.response);
            }
        });
        // console.log(link);
    } catch (error) {
        return console.log(error);
    }
});

server.get('/reset-password/:id/:token', async(req,res)=>{
    const { id, token } = req.params;
    console.log(req.params);
    const oldEmail = await emp_masters.findOne({ emp_id: id });
    if (!oldEmail) {
        return res.json({ status: "Email not exists!!" });
    }
    const secret = JWT_SECRET + oldEmail.password;
    try {
        const verify = jwt.verify(token,secret);
        return res.render("index",{email:verify.email, status: 'Not Verified'});
    } catch (error) {
        return console.log(error);
    }

})
// server.post('/reset-password/:id/:token', async (req, res) => {
//     const pswd1 = req.body.password;
//     if 
//     const pswd2 = req.body.confirm_password;

// })
server.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const oldEmployee = await emp_masters.findOne({ emp_id: id });
    if (!oldEmployee) {
        return res.json({ status: "Email not exists!!" });
    }
    const secret = JWT_SECRET + oldEmployee.password;
    try {
        const verify = jwt.verify(token, secret);
        const encPassword = await bcrypt.hash(password,10);
        const updateSuccess = await emp_masters.updateOne({ emp_id: id }, { password: encPassword }, { new: true });
        // res.json({status: "Password updated"});
        if(updateSuccess.acknowledged && updateSuccess.modifiedCount === 1){
            return res.render("index", { email: verify.email, status: 'verified' });
        } else {
            return res.render("index", { email: verify.email, status: 'not verified' });
        }
    } catch (error) {
        res.json({status: "Something went wrong"});
        return console.log(error);
    }

})
















// // Gospel
// server.post('/register', async (req, res) => {
//     const {name, address} = req.body;
//     console.log(name, address);
//     const encVerse = await bcrypt.hash(address, 10);
//     console.log(encVerse);
//     // try{
//     // await Preach.insertMany([{
//     //     Reference:name,
//     //     Verse: encVerse
//     // }]);
//     // Preach.save();
//     const data = await Preach.findOne({Reference: name});
//     if(!data){
//     return res.json({stat:"Not Found"});}
//     if (await bcrypt.compare(address,data.Verse)){
//         const token = jwt.sign({}, JWT_SECRET);
//         if (res.status(201)) {
//             return res.json({ status: "ok", data: token });
//         } else {
//             return json({ error: "error" });
//         }
//     }
    
//     // }
//     // catch(error){
//     //     res.json({status:error});
//     // }
// })








server.listen(3000,()=>{
    console.log("server started");
})
