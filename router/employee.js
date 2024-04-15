const router = require('express').Router();
const employeeController = require('./../controller/employee');


router.post('/add', async (req, res) => {
	console.log(req.body)
	let addEmployee = await employeeController.add(req.body);
	console.log(addEmployee)
	if(addEmployee){
		res.redirect('/employee');
	}else{
        res.send({response : "error"})
	}
});

router.get('/', async (req, res) => {
     let employeeDetails = await employeeController.fetch(req.query.name);
 	res.render('employee',{data : employeeDetails.response});
});
router.get('/findById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await employeeController.fetchdata(req.query.id);
	console.log(response);
	if(response){
		res.render("/employee-edit",{data : response});
	}else{
        res.send({response : "error"})
	}
})
router.get('/test/delete/:id', async (req, res) => {
	const response = await employeeController.delete(req.params.id);
	if(response){
		res.redirect('/employee');
	}else{
        res.send({response : "error"})
	}
})
router.post('/update', async (req, res) => {
	const response = await employeeController.update(req.query.id, req.body);
	console.log(response);
	if(response){
		res.redirect('/employee');
	}else{
        res.send({response : "error"})
	}
})

module.exports = router;