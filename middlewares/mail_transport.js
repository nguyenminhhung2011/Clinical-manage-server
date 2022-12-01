const express = require('express');
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

// let mailTransporter = nodemailer.createTransport({
//     service:"gmail",
//     auth : {
//     }
// });

const CLIENT_ID = '51863514190-l45u9ulnsrv2de53pcmosf9ao4nnaumh.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04fFPRg0fF1g7CgYIARAAGAQSNwF-L9Irpl5dTCCtBfdwyGg-qgnBpNlbKxn3uQJ-fHfkq4KBpui_jbbfgYIXuKQ5nQshQdHItKI'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendMail = async function sendMail(link,email) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type:'OAUTH2',
                user:'hoangankin123@gmail.com',
                clientId:  CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        })

        const mailOption = {
            from: 'Clinic Management',
            to: email,
            subject:"Verification Email",
            text: "dit cu may",
            html: `Click the flowing link to restore your password: ${link}`
        };

        const result = transport.sendMail(mailOption)
        return result;
    } catch (error) {
        return error;
    }
}

module.exports =  sendMail