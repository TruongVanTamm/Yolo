require("dotenv").config();
const request= require("request");

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const chatbotCtrl = {
	getWebhook: (req, res) => {
		// Your verify token. Should be a random string.

		// Parse the query params
		let mode = req.query["hub.mode"];
		let token = req.query["hub.verify_token"];
		let challenge = req.query["hub.challenge"];

		// Checks if a token and mode is in the query string of the request
		if (mode && token) {
			// Checks the mode and token sent is correct
			if (mode === "subscribe" && token === VERIFY_TOKEN) {
				// Responds with the challenge token from the request
				console.log("WEBHOOK_VERIFIED");
				res.status(200).send(challenge);
			} else {
				// Responds with '403 Forbidden' if verify tokens do not match
				res.sendStatus(403);
			}
		}
	},
	postWebhook: (req, res) => {
		let body = req.body;

		// Checks this is an event from a page subscription
		if (body.object === "page") {
			// Iterates over each entry - there may be multiple if batched
			body.entry.forEach(function (entry) {
				// Gets the body of the webhook event
				let webhook_event = entry.messaging[0];
				console.log(webhook_event);

				// Get the sender PSID
				let sender_psid = webhook_event.sender.id;
				console.log("Sender PSID: " + sender_psid);

				// Check if the event is a message or postback and
				// pass the event to the appropriate handler function
				if (webhook_event.message) {
					handleMessage(
						sender_psid,
						webhook_event.message
					);
				} else if (webhook_event.postback) {
					handlePostback(
						sender_psid,
						webhook_event.postback
					);
				}
			});

			res.status(200).send("EVENT_RECEIVED");
		} else {
			res.sendStatus(404);
		}
	},
};
// Handles messages events
function handleMessage(sender_psid, received_message) {
	let response;
	// Checks if the message contains text
	if (received_message.text) {    
	  // Create the payload for a basic text message, which
	  // will be added to the body of our request to the Send API
	  response = {
		"text": `You sent the message: "${received_message.text}". Now send me an attachment!`
	  }
	} else if (received_message.attachments) {
	  // Get the URL of the message attachment
	  let attachment_url = received_message.attachments[0].payload.url;
	  response = {
		"attachment": {
		  "type": "template",
		  "payload": {
			"template_type": "generic",
			"elements": [{
			  "title": "Đây có phải bức ảnh của bạn",
			  "subtitle": "Bấm nút ở dưới để trả lời.",
			  "image_url": attachment_url,
			  "buttons": [
				{
				  "type": "postback",
				  "title": "Yes!",
				  "payload": "yes",
				},
				{
				  "type": "postback",
				  "title": "No!",
				  "payload": "no",
				}
			  ],
			}]
		  }
		}
	  }
	} 
	
	// Send the response message
	callSendAPI(sender_psid, response);    
  }

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
	let response;
	
	// Get the payload for the postback
	let payload = received_postback.payload;
  
	// Set the response based on the postback payload
	if (payload === 'yes') {
	  response = { "text": "Cảm ơn!" }
	} else if (payload === 'no') {
	  response = { "text": "Oops, hãy thử lại." }
	}
	// Send the message to acknowledge the postback
	callSendAPI(sender_psid, response);
  }

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
	// Construct the message body
	let request_body = {
		recipient: {
			id: sender_psid,
		},
		message: response,
	};

	// Send the HTTP request to the Messenger Platform
	request(
		{
			uri: "https://graph.facebook.com/v2.6/me/messages",
			qs: { access_token: MY_VERIFY_TOKEN },
			method: "POST",
			json: request_body,
		},
		(err, res, body) => {
			if (!err) {
				console.log("Đã gửi tin nhắn !");
			} else {
				console.error("Unable to send message:" + err);
			}
		}
	);
}

module.exports = chatbotCtrl;
