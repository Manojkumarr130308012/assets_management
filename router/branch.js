const router = require('express').Router();
const branchController = require('./../controller/branch');


router.post('/add', async (req, res) => {
	let addBranch = await branchController.add(req.body);
	if(addBranch){
		res.redirect('/branch');
	}else{
        res.send({response : "error"})
	}
});

router.get('/', async (req, res) => {
	let branchDetails =await branchController.fetch(req.query.name);
 	res.render('branch',{data : branchDetails.response});
});
router.get('/branchById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await branchController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/delete', async (req, res) => {
	const response = await branchController.delete(req.query.id);
	if(response){
		res.redirect('/branch');
	}else{
        res.send({response : "error"})
	}
})
router.post('/update', async (req, res) => {
	const response = await branchController.update(req.query.id, req.body);
	if(response){
		res.redirect('/branch');
	}else{
        res.send({response : "error"})
	}
})

module.exports = router;