module.exports = (sequelize,Sequelize) => {
    const AssetCategory = sequelize.define('asset_category', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });

    return AssetCategory;
};