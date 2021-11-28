module.exports = (sequelize, DataTypes) => {
	const posts = sequelize.define("posts", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	});
	return posts;
};