const nodemailer = require('nodemailer');
const config = require('../config.js');

class Mailer {
	
		constructor(){
			this.transporter = nodemailer.createTransport({
				service: config.mailerServer,
				auth: {
				user: config.mailerAddress,
				pass: config.mailerPassword
				}
			});
		}

		sendMail(receiver, subject, content) {	
			let mailOptions = {
				from: config.mailerAddress,
				to: receiver,
				subject: subject,
				html: content
			};
			
			this.transporter.sendMail(mailOptions);
		}
}

module.exports = Mailer;