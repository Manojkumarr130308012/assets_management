const errorHandler = require('../utils/error.handler');
const db = require("../middleware/middleware");
const assetsSchema = db.assets;
const stock_historySchema = db.stockHistory;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid')


class AssetController {


    async add(body) {
        try {
            let uuid = uuidv4();
            body.serialNumber = uuid;
            let asset = await assetsSchema.create(body);

            let stockhistory = {
                "assetId": asset.id,
                "action": asset.status
            }

            await stock_historySchema.create(stockhistory);

            return {
                status: 'success',
                msg: 'Asset created'
            }
        } catch (err) {
            console.log("err",err);
            return {
                status: 'error',
                msg: 'Asset creation failed'
            }
        }
    }


    async issueStock(assetId,body) {
        try {

            let asset = {
                "status": body.status
            }

            await assetsSchema.update(asset, {
                where: { id: assetId }
            });

            let stockhistory = {
                "assetId": assetId,
                "employeeId": body.employeeId,
                "action": body.status,
                "reason": body.reason
            }

            await stock_historySchema.create(stockhistory);

            return {
                status: 'success',
                msg: 'Asset created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Asset creation failed'
            }
        }
    }


    async returnStock(assetId,body) {
        try {

            let asset = {
                "status": body.status
            }

            await assetsSchema.update(asset, {
                where: { id: assetId }
            });

            let stockhistory = {
                "assetId": assetId,
                "employeeId": body.employeeId,
                "action": body.status,
                "reason": body.reason
            }

            await stock_historySchema.create(stockhistory);

            return {
                status: 'success',
                msg: 'Asset created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Asset creation failed'
            }
        }
    }


    async ObsoleteStock(body) {
        try {
            let asset = {
                "status": body.action
            }

            await assetsSchema.update(asset, {
                where: { id: body.assetId }
            });

            let stockhistory = {
                "assetId": body.assetId,
                "employeeId": body.employeeId,
                "action": body.action,
                "reason":body.reason
            }

            await stock_historySchema.create(stockhistory);

            return {
                status: 'success',
                msg: 'Asset created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Asset creation failed'
            }
        }
    }





    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await assetsSchema.findAll({
                include: [{
                    model: db.assetsCategory
                },
                {
                    model: db.branch,
                }],
                where: condition
            });
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

    async fetchStocks(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await assetsSchema.findAll({
                include: [{
                    model: db.assetsCategory
                },
                {
                    model: db.branch,
                }],
                where: { status: "Available" }
            });
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



    async issuedAsset() {
        try {
            let response = await assetsSchema.findAll({
                include: [{
                    model: db.assetsCategory
                },
                {
                    model: db.branch,
                }],
                where: { status: ["Available","Issued"] }
            });
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


    async returnAsset() {
        try {
            let response = await assetsSchema.findAll({
                include: [{
                    model: db.assetsCategory
                },
                {
                    model: db.branch,
                }],
                where: { status: ["Return","Issued"] }
            });
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

    async obsoleteAsset() {
        try {
            let response = await assetsSchema.findAll({
                include: [{
                    model: db.assetsCategory
                },
                {
                    model: db.branch,
                }],
                where: { status:["Available","Return","Issued","Obsolete"]}
            });
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


    async obsoleteCountAsset() {
        try {
            let response = await assetsSchema.findAll({
                include: [{
                    model: db.assetsCategory
                },
                {
                    model: db.branch,
                }],
                where: { status:["Obsolete"]}
            });
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


    async stocksHistoryAsset() {
        try {
            let response = await stock_historySchema.findAll({
                include: [{
                    model: db.assets
                },
                {
                    model: db.employees,
                }
            ],
                where: { action:["Available","Return","Issued","Obsolete"]}
            });
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
            let response = await assetsSchema.findByPk(id);
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
            let response = await assetsSchema.destroy({
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
            let response = await assetsSchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "Asset Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}

db.assetsCategory.hasMany(assetsSchema, {
    foreignKey: "asset_categoryId",
    targetKey: "id",
});

assetsSchema.belongsTo(db.assetsCategory, {
    foreignKey: "asset_categoryId",
    targetKey: "id",
});


db.branch.hasMany(assetsSchema, {
    foreignKey: "branchId",
    targetKey: "id",
});

assetsSchema.belongsTo(db.branch, {
    foreignKey: "branchId",
    targetKey: "id",
});

assetsSchema.hasMany(db.stockHistory, {
    foreignKey: "assetId",
    targetKey: "id",
});

db.stockHistory.belongsTo(assetsSchema, {
    foreignKey: "assetId",
    targetKey: "id",
});

db.employees.hasMany(db.stockHistory, {
    foreignKey: "employeeId",
    targetKey: "id",
});

db.stockHistory.belongsTo(db.employees, {
    foreignKey: "employeeId",
    targetKey: "id",
});



module.exports = new AssetController();