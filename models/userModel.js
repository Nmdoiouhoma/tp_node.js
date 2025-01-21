export class UserModel {
    UserModel() {
        const User = sequelize.define('User', {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        }, {
            timestamps: true,
            paranoid: true,
            deletedAt: 'destroyTime',
        });

    }
}