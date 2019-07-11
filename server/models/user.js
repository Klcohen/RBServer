module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type:DataTypes.STRING,
            allowNull: false
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type:DataTypes.STRING,
            allowNull: true,
        }

    });
    return User;
}