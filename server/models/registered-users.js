module.exports = (sequelize, DataTypes) => {
	const posts = sequelize.define("posts", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		usertype: {
			type: DataTypes.STRING,
			allowNull: false,
		}

	});
	return posts;
};