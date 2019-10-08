var helper= require("./helpers")

describe('Test the path api', () => {
  
    test('It should successfully find a path', async () => {
      response= await helper.Post('/api/path',{magic:[3, 2, 5, 4],distance:[2,3,4,2]},null).expect(200)
      expect(response.body.success).toBeTruthy();
        expect(response.body.solution).toBeGreaterThanOrEqual(0)
      
    });
    test('It should not successfully find a path index solution', async () => {
        response= await helper.Post('/api/path',{magic:[2,3,4,2],distance:[3, 2, 5, 4]},null).expect(200)
        expect(response.body.success).toBeTruthy();
          expect(response.body.solution).toBeUndefined()
          expect(response.body.message).toMatch("no solution found")
      });
      test('It should not successfully find a solution with a non-array', async () => {
        response= await helper.Post('/api/path',{magic:"eghre",distance:[2,3,4,2]},null).expect(400)
        expect(response.body.success).toBeFalsy();
          expect(response.body.solution).toBeUndefined()
          expect(response.body.message).toMatch("magic path must be of array type")
      });
    test('It should throw error with empty array',async ()=>{
        response= await helper.Post('/api/path',{magic:[],distance:[2,3,4,2]},null).expect(400)
        expect(response.body.success).toBeFalsy();
          expect(response.body.solution).toBeUndefined()
          expect(response.body.message).toMatch("distance path or magic must not be an empty array type")
    })
    test('It should throw error with unequal arrays',async ()=>{
        response= await helper.Post('/api/path',{magic:[1,2],distance:[2,3,4,2]},null).expect(400)
        expect(response.body.success).toBeFalsy();
          expect(response.body.solution).toBeUndefined()
          expect(response.body.message).toMatch("distance path length must be equal to magic path length")
    })
   
  
});