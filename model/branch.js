module.exports = (sequelize,Sequelize) => {
    const BranchCategory = sequelize.define('branch', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });

    return BranchCategory;
};