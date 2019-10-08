var helper= require("./helpers")

describe('Test the validation api', () => {
  
    test('It should not successfully find a missing rule', async () => {
      response= await helper.Post('/api/validate',{data:{ type: 'durban', crux: 'Indices', color: 'green', title: 'Indict the idiot' }
      ,rules:["type","crux","color","title"]},null).expect(200)
      expect(response.body.success).toBeTruthy();
        expect(response.body.message).toMatch("data object is valid")
      
    });
    test('It should successfully find a missing rule from data', async () => {
        response= await helper.Post('/api/validate',{data:{crux: 'Indices', color: 'green', title: 'Indict the idiot' }
        ,rules:["type","crux","color","title"]},null).expect(200)
        expect(response.body.success).toBeTruthy();
          expect(response.body.missingItems).toContain("type")
      });
      test('It should not successfully validate with non array type rules', async () => {
        response= await helper.Post('/api/validate',{data:{ type: 'durban', crux: 'Indices', color: 'green', title: 'Indict the idiot' }
        ,rules:"ggt"},null).expect(400)
        expect(response.body.success).toBeFalsy();
          expect(response.body.message).toMatch("Rules must be of array type")
      });
    test('It should throw error with missing data object',async ()=>{
        response= await helper.Post('/api/validate',{
        rules:["type"]},null).expect(400)
        expect(response.body.success).toBeFalsy();
          expect(response.body.message).toMatch("data object missing or empty from request body")
    })
    test('It should succesfully delete an item for data body',async ()=>{
        response= await helper.Post('/api/validate/remove',{data:{ type: 'durban', crux: 'Indices', color: 'green', title: 'Indict the idiot' }
        ,item:"color"},null).expect(200)
        expect(response.body.success).toBeTruthy();
          expect(response.body.message).toMatch("attribute deleted from data object")
          expect(response.body.data['color']).toBeUndefined()
    })
    test('It should not succesfully delete a non exisitng item for data body',async ()=>{
        response= await helper.Post('/api/validate/remove',{data:{ type: 'durban', crux: 'Indices', color: 'green', title: 'Indict the idiot' }
        ,item:"jazz"},null).expect(400)
        expect(response.body.success).toBeFalsy();
          expect(response.body.message).toMatch("attribute missing from data object")
    })
  
});