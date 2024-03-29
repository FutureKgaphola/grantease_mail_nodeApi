const nodemailer = require("nodemailer");

module.exports.senduserMail = async (email,name,message,subject) => {
	
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: 587,
			secure: true,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			
			html:`<p>Hi ${name}, ${message}</p><br>
			<p>Kind Regards,</p><br> <strong>GrantEase Team</strong>`
		});
	
};