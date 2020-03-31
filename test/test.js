
const chai = require('chai')
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const chaiclient = chai.request(process.env.BASE_URL + process.env.PORT||3000);

describe("Middleware Test",()=>{
    
    it("Hello World Test",()=>{
        chaiclient.get("/").end((err,res)=>{
            expect(res.text).to.equal('Hello World!');
        })
    });
});