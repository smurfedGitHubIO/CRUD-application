module.exports = (sequelize, DataTypes) => {
	const posts = sequelize.define("posts", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		daily_star: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		weekly_star: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		overall_star: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	});
	return posts;
};