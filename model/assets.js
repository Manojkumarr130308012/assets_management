module.exports = (sequelize,Sequelize) => {
    const Asset = sequelize.define('asset', {
        serialNumber: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        make: {
            type: Sequelize.STRING,
            allowNull: false
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        asset_categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        branchId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('Available', 'Issued', 'Return' ,'Obsolete'),
            allowNull: false,
            defaultValue: 'Available'
        }
    });
    return Asset;
};

