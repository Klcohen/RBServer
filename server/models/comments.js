module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comments', {
        comment: {
            type:DataTypes.STRING,
            allowNull: false
        },
        username: {
            type:DataTypes.STRING,
            allowNull: false
        },
        post: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        owner: {
            type:DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Comments;
}