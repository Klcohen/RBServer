module.exports = (sequelize, DataTypes) => {
    const Art = sequelize.define('art', {
        image: {
            type:DataTypes.JSONB,
            allowNull: true
        },
        title: {
            type:DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type:DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type:DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Art;
}