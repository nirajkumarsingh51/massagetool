const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nirajsingh9570460932@gmail.com',
            pass: 'your-email-password' // Replace with your actual password or app-specific password
        }
    });

    const mailOptionsUser = {
        from: 'nirajsingh9570460932@gmail.com',
        to: email,
        subject: 'Thank You for Contacting Us!',
        text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and appreciate you taking the time to get in touch. Your inquiry is very important to us, and we will get back to you as soon as possible.\n\nIf your matter is urgent, please feel free to call us at [Your Phone Number] for immediate assistance.\n\nWarm regards,\nNiraj Kumar Singh\nYour Position\nYour Company Name\nnirajsingh9570460932@gmail.com\nYour Phone Number`
    };

    const mailOptionsAdmin = {
        from: 'nirajsingh9570460932@gmail.com',
        to: 'nirajsingh9570460932@gmail.com',
        subject: 'New Message Received on Your Website',
        text: `You have received a new message from your website contact form. Here are the details:\n\n- Sender's Name: ${name}\n- Sender's Email: ${email}\n- Message:\n${message}`
    };

    transporter.sendMail(mailOptionsUser, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error sending email to user.' });
        }
        transporter.sendMail(mailOptionsAdmin, (error, info) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Error sending email to admin.' });
            }
            res.status(200).json({ success: true, message: 'Emails sent successfully.' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
