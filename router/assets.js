const router = require('express').Router();
const assetsController = require('../controller/assets');
const assetsCategoryController = require('../controller/asset_category');
const branchController = require('../controller/branch');
const employeeController = require('../controller/employee');


router.post('/add', async (req, res) => {
	let addAssets = await assetsController.add(req.body);
	if(addAssets){
		res.redirect('/asset');
	}else{
        res.send({response : "error"})
	}
});


router.post('/issue_asset/add', async (req, res) => {
	let issuedAsset = await assetsController.issueStock(req.query.id,req.body);
	if(issuedAsset){
		res.redirect('/asset/issued_asset/');
	}else{
        res.send({response : "error"})
	}
});

router.post('/reurn_asset/add', async (req, res) => {
	retuenAsset = await assetsController.returnStock(req.query.id,req.body);
	if(retuenAsset){
		res.redirect('/asset/return_asset/');
	}else{
        res.send({response : "error"})
	}
});


router.get('/', async (req, res) => {
	let assetsDetails = await assetsController.fetch(req.query.name);
	let assetsCategoryDetails = await assetsCategoryController.fetch(req.query.name);

	console.log(assetsCategoryDetails.response);
 	res.render('assets',{data : assetsDetails.response,assetsCategoryDetails : assetsCategoryDetails.response});
});

router.get('/dashboard', async (req, res) => {
	let employeeDetails = await employeeController.fetch(req.query.name);
	let employeeCount = Object.keys(employeeDetails.response).length;
	let assetsDetails = await assetsController.fetch(req.query.name);
	let asstsCount = Object.keys(assetsDetails.response).length;
	let stocksDetails = await assetsController.fetchStocks(req.query.name);
	let stockCount = Object.keys(stocksDetails.response).length;
	let issuedDetails = await assetsController.issuedAsset();
	let issuedCount = Object.keys(issuedDetails.response).length;
	let returnDetails = await assetsController.returnAsset();
	let returnCount = Object.keys(returnDetails.response).length;
	let obsoleteDetails = await assetsController.obsoleteCountAsset();
	let obsoleteCount = Object.keys(obsoleteDetails.response).length;

	let dataCount  = {
		"employeeCount" : employeeCount,
		"asstsCount" : asstsCount,
		"stockCount" : stockCount,
		"issuedCount" : issuedCount,
		"returnCount" : returnCount,
		"obsoleteCount" : obsoleteCount,
	}

	console.log(dataCount);

 	res.render('dashboard',{data : dataCount});
});


router.get('/stocks/', async (req, res) => {
	let assetsDetails = await assetsController.fetchStocks(req.query.name);
	let assetsCategoryDetails = await assetsCategoryController.fetch(req.query.name);
	let branchDetails = await branchController.fetch(req.query.name);
 	res.render('stocks-view',{data : assetsDetails.response,assetsCategoryDetails : assetsCategoryDetails.response,branchDetails : branchDetails.response});
});

router.get('/issued_asset/', async (req, res) => {
	let assetsDetails = await assetsController.issuedAsset();
	let assetsCategoryDetails = await assetsCategoryController.fetch(req.query.name);
	res.render('issue_asset',{data : assetsDetails.response,assetsCategoryDetails : assetsCategoryDetails.response});
});

router.get('/return_asset/', async (req, res) => {
	let assetsDetails = await assetsController.returnAsset();
	let assetsCategoryDetails = await assetsCategoryController.fetch(req.query.name);
	res.render('return_asset',{data : assetsDetails.response,assetsCategoryDetails : assetsCategoryDetails.response});
});

router.get('/obsolete_asset/', async (req, res) => {
	let assetsDetails = await assetsController.obsoleteAsset();
	let assetsCategoryDetails = await assetsCategoryController.fetch(req.query.name);
	let branchDetails = await branchController.fetch(req.query.name);
	res.render('obsolete_view',{data : assetsDetails.response,assetsCategoryDetails : assetsCategoryDetails.response,branchDetails : branchDetails.response});
});

router.get('/stocks_history/', async (req, res) => {
	let assetsDetails = await assetsController.stocksHistoryAsset();
	let assetsCategoryDetails = await assetsCategoryController.fetch(req.query.name);
	let branchDetails = await branchController.fetch(req.query.name);
	console.log("assetsDetails",assetsDetails);
	res.render('stocks_history',{data : assetsDetails.response,assetsCategoryDetails : assetsCategoryDetails.response,branchDetails : branchDetails.response});
});

router.get('/assetsById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await assetsController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/delete', async (req, res) => {
	const response = await assetsController.delete(req.query.id);
	if(response){
		res.redirect('/asset');
	}else{
        res.send({response : "error"})
	}
})
router.post('/update', async (req, res) => {
	const response = await assetsController.update(req.query.id, req.body);
	if(response){
		res.redirect('/asset');
	}else{
        res.send({response : "error"})
	}
})

module.exports = router;