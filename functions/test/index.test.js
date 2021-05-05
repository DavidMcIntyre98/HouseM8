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
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').delete('/deletecomment?id=1234');

        expect(result.statusCode).to.equal(200);
    });
});

describe('Testing update comment', function() {
    this.timeout(100000);

    it('Tests that a comment cannot be updated without a valid comment query ID', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').put('/updatecomment')
        .set('content-type','application/json')
        .send({comment: 'Updated test comment'});

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

describe('Testing get rooms', function() {
    this.timeout(100000);

    it('Tests that tenants can view landlord rooms currently available', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/getrooms')
        .set('content-type','application/json')
        .send({uid : '1234'});

        expect(result.statusCode).to.equal(200);
    });
});

describe('Testing get tenants', function(){
    this.timeout(100000);

    it('Tests that landlords can view tenants currently available', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/gettenants')
        .set('content-type','application/json')
        .send({uid : '1234'});

        expect(result.statusCode).to.equal(200);
    });
});

describe('Testing like', function(){
    this.timeout(100000);

    it('Tests that users can like each other', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/like')
        .set('content-type','application/json')
        .send({lid: '1234', tid: '1234'});

        expect(result.statusCode).to.equal(200);
    });
});

describe('Testing useen', function() {
    this.timeout(100000);

    it('Tests that profiles seen by a user are stored', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/useen')
        .set('content-type','application/json')
        .send({lid: '1234', tid: '1234'});

        expect(result.statusCode).to.equal(200);
    });
});

describe('Testing lseen', function() {
    this.timeout(100000);

    it('Tests that profiles seen by a landlord are stored', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/lseen')
        .set('content-type','application/json')
        .send({lid: '1234', tid: '1234'});
    });
});

describe('Testing check type', function() {
    this.timeout(100000);

    it('Tests that an account can be checked for either a tenant or landlord type', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/checktype')
        .set('content-type','application/json')
        .send({uid: '1234'});

        expect(result.statusCode).to.equal(200);
    });
});

describe('Testing image data', function() {
    this.timeout(100000);

    it('Tests that image data can be stored and accessed from firestore', async() => {
        const result = await chai.request('http://localhost:5001/housem8-8b9bf/us-central1').post('/image_data')
        .set('content-type','application/json')
        .send({name: "test", "Picture URL": "myimage.test", "User ID": "1234"});

        expect(result.statusCode).to.equal(200);
    });
});
