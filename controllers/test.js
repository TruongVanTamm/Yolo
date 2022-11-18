const testCtrl = {
	register: async (req, res) => {
		try {
			const { name } = req.body;

			if (!name || !email || !password) return res.status(400).json({ msg: "Please fill in all fields." });

			const user = await Users.findOne({ email });
			if (user) return res.status(400).json({ msg: "This email already exists." });

			const passwordHash = await bcrypt.hash(password, 12);

			const newUser = {
				name,
				email,
				password: passwordHash,
			};

			const activation_token = createActivationToken(newUser);

			const url = `${CLIENT_URL}/user/activate/${activation_token}`;
			sendMail(email, url, "Verify your email address");

			res.json({ activation_token: activation_token });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = uploadCtrl;
