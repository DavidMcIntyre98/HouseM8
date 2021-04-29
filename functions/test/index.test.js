const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

describe('Testing posting comment', function() {
    this.timeout(100000);

    it('Tests if the database can save comments successfully', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/postcomments')
        .set('content-type','application/json')
        .send({handle: 'HouseM8_Tester', comment:'Automated test comment'});
    });
});

describe('Testing get comments', function() {
    this.timeout(100000);

    it('Tests if there are comments that can be retrieved from the database', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').get('/getcomments');

        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('Array');
        expect(result.body[0]).haveOwnProperty('comment');
    });
});

describe('Testing delete comment', function() {
    this.timeout(100000);

    it('Tests that a comment cannot be deleted without a valid comment query ID', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').delete('/deletecomment');

        expect(result.statusCode).to.not.equal(200);
    });
});

describe('Testing update comment', function() {
    this.timeout(100000);

    it('Tests that a comment cannot be updated without a valid comment query ID', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').put('/updatecomment');

        expect(result.statusCode).to.not.equal(200);
    })
})

describe('Testing that a tenant can make an account', function() {
    this.timeout(100000);

    it('Tests that a tenant can create an account and store it in the database', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/createprofile')
        .set('content-type','application/json')
        .send({uid : 'HouseM8_Test_Tenant_Profile', name : 'HouseM8_Test_Tenant_Profile', age : '0', studying : 'Yes', city : 'Galway', cName : 'HouseM8_Test_Tenant_Profile'});
    })
})

describe('Testing that a landlord can make an account', function() {
    this.timeout(100000);

    it('Tests that a landlord can create an account and store it in the database', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/createLprofile')
        .set('content-type','application/json')
        .send({uid : 'Housem8_Test_Landlord_Profile', numRoom : '0', location : 'Galway', minAge : '0', maxAge : '0', price : '0'});
    })
})

describe('Testing authorizedendpoint', function() {
    this.timeout(100000);

    it('Tests that only authorized users may access secure content', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').get('/authorizedendpoint');

        expect(result.statusCode).to.equal(403);
    });
});
