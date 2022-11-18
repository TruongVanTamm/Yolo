const mongoose = require("mongoose");

const test = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("test", test);
