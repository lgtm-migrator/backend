import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SENDER_NUMBER,
} = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendMessage = (phone, message) => {
  client.messages
    .create({
      body: message,
      from: TWILIO_SENDER_NUMBER,
      to: phone,
    })
    .then(res => res);
};

export default sendMessage;
