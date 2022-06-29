const heroSilder =require('../models/heroSilderModel')

const heroSilderCtrl={
    getHeroSilder: async (req, res) => {
		try {
			const slider= await  heroSilder.find();
            res.json(slider);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	createHeroSilder: async (req, res) => {
		try {
			const { product_id, title, price, old_price, description,discount,image, category , color, size} = req.body;
			if (!image) return res.status(400).json({ msg: "No image upload" });
			const slider = await heroSilder.findOne({ product_id });
			if (slider) return res.status(400).json({ msg: "This product already exists." });

			const newSilder= new heroSilder({
				product_id,
				title: title,
				price,
                old_price,
				description,
				discount,
				image,
				category,
				color,
				size,
			});

			await  newSilder.save();
			res.json({ msg: "Created a product" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
}

module.exports = heroSilderCtrl;