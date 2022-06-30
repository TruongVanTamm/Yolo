const router = require('express').Router()
const chatbotCtrl = require('../controllers/chatbotCtrl')

router.route('/webhook')
    .get(chatbotCtrl.getWebhook)
    .post(chatbotCtrl.postWebhook)

 module.exports = router
