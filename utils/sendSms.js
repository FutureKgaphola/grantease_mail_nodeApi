const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.SMSAPIKEY,
  apiSecret: process.env.SMSAPISECRET
})

const from = "GrantEase"
const to = "27738285578"

module.exports.sendSMS=async(paydate)=> {
    const text = `GrantEase.\n Your next expected grant payment date - ${String(paydate)}.\n\n.`;
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}
