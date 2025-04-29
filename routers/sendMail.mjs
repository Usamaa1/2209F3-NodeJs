// sendEmailRoute.js
import { Router } from 'express';
import { createTransport } from 'nodemailer';
const mailRouter = Router();

// POST /api/send-email
mailRouter.post('/send-email', async (req, res) => {
    console.log(req.body)

    // res.send("send")
  const { to, subject, message } = req.body;


  try {
    // Set up transporter
    const transporter = createTransport({
      service: 'gmail', // or "hotmail", etc.
      auth: {
        user: 'usamariaz@aptechnorth.edu.pk',
        pass: 'mgdt nvex rhiy wnat' // use App Password if 2FA is enabled
      }
    });

    // Email options
    // const mailOptions = {
    //   from: 'usamariaz@aptechnorth.edu.pk',
    //   to: 'usamariaz@aptechnorth.edu.pk',
    //   subject: 'subject',
    //   text: 'message'
    // };

    let randomCode = parseInt(Math.random() * 1000);

    // Send the email
    await transporter.sendMail({
      from: 'usamariaz@aptechnorth.edu.pk',
      to: to,
      subject: subject,
      text: `${message} ${randomCode}`
    });

    res.send({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Failed to send email' });
  }
});

export default mailRouter;
