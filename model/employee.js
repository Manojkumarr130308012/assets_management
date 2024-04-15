module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phoneNo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    designation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    branchId: {
      type: Sequelize.INTEGER,
      allowNull: true
     },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active'
    }
  });

  return Employee;
};