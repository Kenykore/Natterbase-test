let magic=[3, 2, 5, 4]
let dist= [2, 3, 4, 2]

function findpath(){
    let index=null
    let path=null
    for(let m=0;m<magic.length;m++){

        for(let d=0;d<dist.length;d++){
            if(path==null){
                path=magic[m]-dist[d]+magic[d+1]
                console.log(path,"1",m,"1")
                continue
            }
            if(path==0){
                path=null
                break
            }
            if(d==(dist.length-1)){
                path=path-dist[d]
                console.log(path,"3",m,"3")
                break
            }
            path=path-dist[d]+magic[d+1]
            console.log(path,"others",m,"others")

        }
        if(path >0){
            index=m
            break
        }
        if(path <0){
            path=null
        }
    }
    if(path >0){
        return index
    }
    else{
        return -1
    }
}
// console.log(findpath())
let counter1=0
let counter2=0
let path=null
async function findpathRecurrsion(){

    if(counter2 == (dist.length-1)){
       console.log("counter2C",counter2,"counter1C",counter1,path,"C")
        path=path-dist[counter2]
        console.log("last path",path)
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
        path=magic[counter1]-dist[counter2]+magic[counter2+1]
        counter2++
        console.log("counter2A",counter2,"counter1A",counter1,path,"A")
        return  findpathRecurrsion()
    }
     path=path-dist[counter2]+magic[counter2+1]
     console.log("counter2B",counter2,"counter1B",counter1,path,"B")
     counter2++
    
     return findpathRecurrsion()
}
findpathRecurrsion().then((result)=>{
console.log(result)
})