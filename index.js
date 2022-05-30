const express = require('express');
const morgan = require('morgan');
// const { UserModel } = require('./models/userSchema');
const app = express()
const port = 51592;
const host = "192.168.18.51";
app.use(morgan('dev'));
// const port = 3000;
// const host = "localhost";
// const multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     }
// })
var mongoose = require('mongoose');
const { VendorModel } = require('./n_schemas/vendor_model');
const { USERS } = require('./constants/users');
const { CustomerModel } = require('./n_schemas/customer_model');
const { AdminModel } = require('./n_schemas/admin_model');
const blockedUsers = require('./models/blockedUsersSchema')
const feedbacks = require('./models/feedback')
const { UserModel } = require('./models/userSchema');
const { VendorProductmodel } = require('./models/vendorproductSchema');


var mongoDB = 'mongodb://localhost:27017/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => console.log("CONNECTED!")).catch(err => console.log(err));

//Get the default connection
var db = mongoose.connection;



let products = [{ name: "", layout: "", description: "", imgLink: "" },]

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from server')
})
app.get('/ahmad', (req, res) => {
    res.send('welcome ahmad!')
});

const UMODELS = {
    "customer": CustomerModel,
    "vendor": VendorModel
}

app.get('/get_all/:user', async (req, res) => {
    try {
        let userType = req.params.user;
        let data = await UserModel.find({ userType: userType.toUpperCase() });
        res.status(200).send(data);

    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err });
    }
})

async function createUser(user, usertype) {
    // console.log(UserModel);s
    console.log(VendorModel);
    switch (usertype) {
        case USERS.VENDOR:
            {
                let newUser = await VendorModel.create(user);
                return newUser;
            }
        case USERS.CUSTOMER:
            {
                let newUser = await CustomerModel.create(user);
                return newUser;
            }
        case USERS.ADMIN:
            {
                let newUser = await AdminModel.create(user);
                return newUser;
            }
    }
}



app.post('/user/login', async (req, res) => {

    try {
        let { email, password } = req.body;

        console.log(email, password);
        let foundUser = await UserModel.findOne({ email: email })
        console.log(foundUser)
        if (password === foundUser.password) { return res.status(200).send(foundUser) }

        return res.status(400).send({ message: 'invalid password' })


    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err })
    }

})

app.post('/user/signup', async (req, res) => {
    try {

        let { firstName, lastName, email, password, userType } = req.body;
        let newUser = new UserModel({
            firstName, lastName, email, password, userType
        })

        newUser = await newUser.save()

        res.status(200).send({ data: newUser, message: "User Added Sucessfully" })
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err })
    }

})

app.post('/user/viewProfile', async (req, res) => {

    try {
        let { userId } = req.body;

        console.log(userId);
        let foundUser = await UserModel.findOne({ _id: userId }, { password: 0 })
        if (foundUser) {
            return res.status(200).send({ data: foundUser, message: "user found sucessfully" })
        }
        return res.status(400).send({ message: 'user not found' })


    } catch (err) {
        return res.status(400).send({ message: err })
    }
})

app.post('/user/editProfile', async (req, res) => {

    try {
        let { userId, firstName, lastName, password, email } = req.body;

        console.log({ userId, firstName, lastName, password, email })

        let foundUser = await UserModel.findOne({ _id: userId })
        if (foundUser) {
            if (firstName) {
                foundUser.firstName = firstName
            }
            if (lastName) {
                foundUser.lastName = lastName
            }
            if (password) {
                foundUser.password = password
            }
            if (email) {
                foundUser.email = email
            }
            let newData = await foundUser.save()
            return res.status(200).send({ data: newData, message: "profile updated sucessfully" })
        }
        return res.status(400).send({ message: 'user not found' })


    } catch (err) {
        return res.status(400).send({ message: err })
    }
})

app.post('/user/blockUser', async (req, res) => {

    try {
        let { blockedBy, blockedUser } = req.body;

        console.log({ blockedBy, blockedUser })

        let newUser = new blockedUsers({
            blockedBy,
            blockedUser
        })
        newUser = await newUser.save()
        return res.status(200).send({ message: "user blocked sucessfully" })

    } catch (err) {
        return res.status(400).send({ message: err })
    }
})

app.post('/user/unblockUser', async (req, res) => {

    try {
        let { blockedBy, blockedUser } = req.body;

        console.log({ blockedBy, blockedUser })

        let deleted = await blockedUsers.findOneAndDelete({ blockedBy, blockedUser })
        if (deleted) {
            return res.status(200).send({ message: "user unblocked sucessfully" })
        }
        return res.status(400).send({ message: 'user not unblocked' })


    } catch (err) {
        return res.status(400).send({ message: err })
    }
})

app.post('/user/checkBlockedUser', async (req, res) => {

    try {
        let { blockedBy, blockedUser } = req.body;

        console.log({ blockedBy, blockedUser })

        let userFound = await blockedUsers.findOne({ blockedBy, blockedUser })
        if (userFound) {
            return res.status(200).send({ message: "user is blocked", data: true })
        }
        return res.status(200).send({ message: 'user is not blocked', data: false })

    } catch (err) {
        return res.status(400).send({ message: err })
    }
})

app.post('/feedback/postFeedback', async (req, res) => {

    try {
        let { feedbackBy, feedback, feebackResponse } = req.body;

        console.log({ feedbackBy, feedback, feebackResponse })

        let newFeedback = new feedbacks({
            feedbackBy,
            feedback,
            feebackResponse
        })

        newFeedback = await newFeedback.save()
        return res.status(200).send({ message: "feedBack posted sucessfully", data: newFeedback })

    } catch (err) {
        console.log("err: ", err)
        return res.status(400).send({ message: err })
    }
})

app.post('/feedback/deleteFeedback', async (req, res) => {

    try {
        let { feedbackId } = req.body;

        console.log({ feedbackId })

        let deleted = await feedbacks.findOneAndDelete({ _id: feedbackId })
        if (deleted) {
            return res.status(200).send({ message: "feedback deleted sucessfully" })
        }
        return res.status(400).send({ message: 'feedback could not be deleted' })

    } catch (err) {
        return res.status(400).send({ message: err })
    }
})

app.post('/feedback/getAllFeedbacks', async (req, res) => {

    try {
        let feedbacks = await feedbacks.find({})
        if (feedbacks) {
            return res.status(200).send({ message: "", data: feedbacks })
        }

    } catch (err) {
        return res.status(400).send({ message: err })
    }
})

async function createProduct(params) {
    let res = await VendorProductmodel.create(params);
    return res;
}

async function getAllProducts() {
    return VendorProductmodel.find({});
}

async function deleteProduct(params) {
    let res = await VendorProductmodel.deleteOne({ _id: params.productID });
    return res;
}

async function findProducts(params) {
    let res = await VendorProductmodel.find(params);
    return res;
}

async function updateProduct(params) {
    let _id = params._id;
    let updateParams = params.update;

    let res = await VendorProductmodel.findOneAndUpdate({ _id: _id }, updateParams, { new: "true" });

    return res;
}


async function productDetails(params) {
    let _id = params._id;
    await UserModel.init();
    let res = await VendorProductmodel.findOne({ _id: _id }).populate("VendorID");
    return res;
}


const productFunctions = {
    'create': createProduct,
    'get_all': getAllProducts,
    'delete': deleteProduct,
    'find': findProducts,
    'update': updateProduct,
    'details': productDetails
}

app.post('/product/:method', async (req, res) => {
    try {
        console.log(req.params.method);
        console.log(req.body);
        let data = await productFunctions[req.params.method](req.body);
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "ERROR" })
    }
})

console.log(host);
app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})
