

exports.ValidateInput= async(req,res,next)=>{
    try {
        let data= req.body.data
        let rules= req.body.rules
        if(!Array.isArray(rules)){
            return await res.status(400).json({
                success:false,
                message:"Rules must be of array type"
            })   
        }
        if(!data){
            return await res.status(400).json({
                success:false,
                message:"data object missing or empty from request body"
            })   
        }
      const validationResponse= checkObjectKeys(data,rules)
      if(validationResponse.length ===0){
        return await res.status(200).json({
            success:true,
            message:"data object is valid"
        })   
      }
      else{
        return await res.status(200).json({
            success:true,
            message:"data object is invalid",
            missingItems:validationResponse
        }) 
      }
    } catch (error) {
        return await res.status(500).json({
            success:false,
            message:"error validating inputs"
        })  
    }
}
exports.RemoveInputItem= async(req,res,next)=>{
    try {
        let item =req.body.item
        let data= req.body.data
        if(!data){
            return await res.status(400).json({
                success:false,
                message:"data object missing from request body"
            })   
        }
        let item_found= data.hasOwnProperty(item)
        if(!item_found){
            return await res.status(400).json({
                success:false,
                message:"attribute missing from data object"
            })   
        }
        else{
            delete data[`${item}`]
            return await res.status(200).json({
                success:true,
                message:"attribute deleted from data object",
                data:data
            }) 
        }
    } catch (error) {
        console.log(error)
        return await res.status(500).json({
            success:false,
            message:"error deleting item from input data"
        })  
    }
}
function checkObjectKeys(data={},rules=[]){
    let missingkeys=[]
    for(let r of rules){
        if(!data.hasOwnProperty(r)){
            missingkeys.push(r)
        }
    }
    return missingkeys
}