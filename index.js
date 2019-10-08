var port= process.env.PORT || 3100 ;
const app=require('./server/app/app')


app.listen(port,(()=>{
  console.log('new server working',port)
}));

// module.exports = {
//     api
//   }


