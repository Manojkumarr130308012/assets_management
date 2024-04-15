const errorHandler = require('./../utils/error.handler');
const db = require("../middleware/middleware");
const employeeSchema = db.employees;
const Op = db.Sequelize.Op;

class EmployeeController {


    async add(body) {
        try {
            await employeeSchema.create(body);
            return {
                status: 'success',
                msg: 'Employee created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Employee creation failed'
            }
        }
    }



    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await employeeSchema.findAll({ 
                include :[{
                    model : db.branch,
                }],
                where: condition });
            let count = Object.keys(response).length;
            return {
                response: response,
                count: count
            };
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }


    async fetchdata(id) {
        try {
            let response = await employeeSchema.findByPk(id);
            return response;
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async delete(id) {
        try {
            let response = await employeeSchema.destroy({
                where: { id: id }
            });
            return {
                status: "success",
                response: response
            };
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async update(id, body) {

        console.log("id",id);
        console.log("body",body);

        try {
            let response = await employeeSchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "Employee Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }
}

db.branch.hasMany(employeeSchema, {
    foreignKey: "branchId",
    targetKey: "id",
});

employeeSchema.belongsTo(db.branch, {
    foreignKey: "branchId",
    targetKey: "id",
});

module.exports = new EmployeeController();