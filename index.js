const express = require('express');
const app = express();
const path = require("path")
const config=require('./config/config.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require("./middleware/middleware.js");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


  const employeeRouter = require('./router/employee.js');
  const assetCategoryRouter = require('./router/asset_category.js');
  const assetRouter = require('./router/assets.js');
  const branchRouter = require('./router/branch.js');


  const branchController = require('./controller/branch.js');
  const employeeController = require('./controller/employee.js');
  const assetCategoryController = require('./controller/asset_category.js');
  const assetController = require('./controller/assets.js');


  app.use("/employee", employeeRouter);
  app.use("/assetsCategory", assetCategoryRouter);
  app.use("/asset", assetRouter);
  app.use("/branch", branchRouter);


  app.set("view engine", "pug");

// Set the views directory
  app.set("views", path.join(__dirname, "views"));
  app.get("/", (req, res) => {
    res.render("layout");
  });
  app.get("/dashboard", (req, res) => {
    res.render("dashboard");
  });
  app.get("/employee-add", async(req, res) => {
     let branch = await branchController.fetch();
     console.log(branch)
    res.render("employee-add",{data : branch.response});
  });

  app.get("/employee-edit/:id", async(req, res) => {
    let response = await employeeController.fetchdata(req.params.id);
    let branch = await branchController.fetch();
     console.log(branch)
   res.render("employee-edit",{data : response,branch :branch.response});
 });

 app.get("/branch-add", async(req, res) => {
 res.render("branch-add");
});

 app.get("/branch-edit/:id", async(req, res) => {
  let response = await branchController.fetchdata(req.params.id);
 res.render("branch-edit",{data : response});
});

app.get("/assetsCategory-add", async(req, res) => {
  res.render("assetsCategory-add");
 });

app.get("/assetsCategory-edit/:id", async(req, res) => {
  let response = await assetCategoryController.fetchdata(req.params.id);
 res.render("assetsCategory-edit",{data : response});
});

app.get("/assets-add", async(req, res) => {
  let branch = await branchController.fetch();
  let assetCategory = await assetCategoryController.fetch();
 res.render("assets-add",{assetCategory : assetCategory.response,branch:branch.response});
});

app.get("/assets-edit/:id", async(req, res) => {
  let response = await assetController.fetchdata(req.params.id);
  let branch = await branchController.fetch();
  let assetCategory = await assetCategoryController.fetch();
 res.render("assets-edit",{data : response,assetCategory : assetCategory.response,branch:branch.response});
});

app.get("/issue_asset_add/:id", async(req, res) => {
  let response = await assetController.fetchdata(req.params.id);
  let employee = await employeeController.fetch();
 res.render("issue_asset_add",{data : response,employee : employee.response});
});

app.get("/return_asset_add/:id", async(req, res) => {
  let response = await assetController.fetchdata(req.params.id);
  let employee = await employeeController.fetch();
 res.render("return_asset_add",{data : response,employee : employee.response});
});

app.listen(config.PORT, () => console.log(`url-shortener listening on port ${config.PORT}!`));