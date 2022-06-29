const router = require('express').Router()
const heroSilderCtrl = require('../controllers/heroSilerCtrl')

router.route('/hero-slider')
    .get(heroSilderCtrl.getHeroSilder)
    .post(heroSilderCtrl.createHeroSilder)

module.exports = router