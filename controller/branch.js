const db = require("../middleware/middleware");
const branchSchema = db.branch;
const Op = db.Sequelize.Op;

class EmployeeController {


    async add(body) {
        try {
            await branchSchema.create(body);
            return {
                status: 'success',
                msg: 'Branch created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Branch creation failed'
            }
        }
    }



    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await branchSchema.findAll({ where: condition });
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
            let response = await branchSchema.findByPk(id);
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
            let response = await branchSchema.destroy({
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
        try {
            let response = await branchSchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "Branch Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}



module.exports = new EmployeeController();