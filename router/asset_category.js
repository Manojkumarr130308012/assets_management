const router = require('express').Router();
const assetsCategoryController = require('./../controller/asset_category');


router.post('/add', async (req, res) => {
	let addAssetsCategory = await assetsCategoryController.add(req.body);
	if(addAssetsCategory){
		res.redirect('/assetsCategory');
	}else{
        res.send({response : "error"})
	}
});

router.get('/', async (req, res) => {
	let assetsCategoryDetails = await assetsCategoryController.fetch(req.query.name);
 	res.render('assetsCategory',{data : assetsCategoryDetails.response});
});
router.get('/assetsCategorybyId', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await assetsCategoryController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/delete', async (req, res) => {
	const response = await assetsCategoryController.delete(req.query.id);
	if(response){
		res.redirect('/assetsCategory');
	}else{
        res.send({response : "error"})
	}
})
router.post('/update', async (req, res) => {
	const response = await assetsCategoryController.update(req.query.id, req.body);
	if(response){
		res.redirect('/assetsCategory');
	}else{
        res.send({response : "error"})
	}
})

module.exports = router;