let counter1=0
let counter2=0
let path=null
exports.FindLowestIndex= async(req,res,next)=>{
    try {
       
        let magic= req.body.magic
        let distance= req.body.distance
        if(!Array.isArray(magic)){
            return await res.status(400).json({
                success:false,
                message:"magic path must be of array type"
            })   
        }
        if(!Array.isArray(distance)){
            return await res.status(400).json({
                success:false,
                message:"distance path must be of array type"
            })   
        }
        if(distance.length < 1 || magic.length < 1){
            return await res.status(400).json({
                success:false,
                message:"distance path or magic must not be an empty array type"
            }) 
        }
        if(distance.length !== magic.length){
            return await res.status(400).json({
                success:false,
                message:"distance path length must be equal to magic path length"
            }) 
        }
        let index= await findpathRecurrsion()
        async function findpathRecurrsion(){
            if(counter2 == (distance.length-1)){
                path=path-distance[counter2]
                if(path >0){
                    return counter1
                }
                if(path <= 0 ){
                    path=null
                    counter2=0
                    counter1++
                    if(counter1<magic.length){
                        return  findpathRecurrsion()
                    }
                    else{
                       return -1          
                    }
                }     
            }
            if(path==null){
                path=magic[counter1]-distance[counter2]+magic[counter2+1]
                counter2++
                return  findpathRecurrsion()
            }
             path=path-distance[counter2]+magic[counter2+1]
             counter2++ 
             return findpathRecurrsion()
        }
        if(index == -1){
            return await res.status(200).json({
                success:true,
                message:"no solution found"
            }) 
        }
        else{
            return await res.status(200).json({
                success:true,
                message:"solution found",
                solution:index
            }) 
        }
    } catch (error) {
        console.log(error)
        return await res.status(500).json({
            success:false,
            message:"error finding solution found",
        }) 
    }
}

