const nodemailer = require('nodemailer');
const config = require('../config.js');

function Mailer(){
	this.transporter = nodemailer.createTransport({
	  service: config.mailerServer,
	  auth: {
		user: config.mailerAddress,
		pass: config.mailerPassword
	  }
	});
	
	this.sendMail = (receiver, subject, content) => {	
		var mailOptions = {
		  from: config.mailerAddress,
		  to: receiver,
		  subject: subject,
		  html: content
		};
		
		this.transporter.sendMail(mailOptions);
	}
}




module.exports = Mailer;