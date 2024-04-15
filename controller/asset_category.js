const errorHandler = require('./../utils/error.handler');
const db = require("../middleware/middleware");
const assetsCategorySchema = db.assetsCategory;
const Op = db.Sequelize.Op;

class AssetCategoryController {


    async add(body) {
        try {
            await assetsCategorySchema.create(body);
            return {
                status: 'success',
                msg: 'AssetCategory created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'AssetCategory creation failed'
            }
        }
    }


    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await assetsCategorySchema.findAll({ where: condition });
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
            let response = await assetsCategorySchema.findByPk(id);
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
            let response = await assetsCategorySchema.destroy({
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
            let response = await assetsCategorySchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "AssetCategory Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}



module.exports = new AssetCategoryController();