module.exports = (sequelize, DataTypes) => {
    const Art = sequelize.define('art', {
        image: {
            type:DataTypes.STRING,
            allowNull: false
        },
        title: {
            type:DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type:DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type:DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Art;
}