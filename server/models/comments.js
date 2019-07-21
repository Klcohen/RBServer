module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comments', {
        comment: {
            type:DataTypes.STRING,
            allowNull: false
        },
        username: {
            type:DataTypes.STRING,
            allowNull: true
        },
        post: {
            type:DataTypes.INTEGER,
            allowNull: true
        },
        owner: {
            type:DataTypes.INTEGER,
            allowNull: true
        }
    });
    return Comments;
}