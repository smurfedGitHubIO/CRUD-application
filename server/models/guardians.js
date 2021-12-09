module.exports = (sequelize, DataTypes) => {
	const posts = sequelize.define("posts", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		connection: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});
	return posts;
};