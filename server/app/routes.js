
 
var PathController = require('./controllers/path')
var ValidationController=require("./controllers/validation")

var express = require('express')
 //API Routes 
 module.exports = function(app){
    const apiRoutes = express.Router()
     const  pathRoutes = express.Router()
      const  validationRoutes = express.Router()
     
    // Path Routes
    apiRoutes.use('/path', pathRoutes);

    pathRoutes.post('/', PathController.FindLowestIndex);
    
//Validation Routes
apiRoutes.use('/validate',validationRoutes)
validationRoutes.post('/',ValidationController.ValidateInput)
validationRoutes.post('/remove',ValidationController.RemoveInputItem)
app.use('/api', apiRoutes);
}