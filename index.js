const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();

const port = process.env.PORT || 5000;

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'arvindmanjukurada@gmail.com',
        pass: 'xxchffknxjzqupzp',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

route.get('/', (req, res)=> {
    console.log("get request");
})

route.post('/text-mail', (req, res) => {
    const { to, subject, text } = req.body;
    const mailData = {
        from: 'arvindmanjukurada@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: text,
    };
    console.log(to);
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});


route.post('/attachments-mail', (req, res) => {
    const { to, subject, text } = req.body;

    const mailData = {
        from: 'arvindmanjukurada@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: text,
        attachments: [
            {   // file on disk as an attachment
                filename: 'MVD_India.jpg',
                path: 'MVD_India.jpg'
            },
            {   // file on disk as an attachment
                filename: 'Crash_Car.png',
                path: 'Crash_Car.png'
            },


            {   // file on disk as an attachment
                filename: 'Traffic_rules.pdf',
                path: 'Traffic_rules.pdf'
            }
        ]
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});