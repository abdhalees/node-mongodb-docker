var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var Company = require('../models/Company.model');

var should = chai.should();

chai.use(chaiHttp);

describe('Companies', function() {
  before(function() {
    require('../config/database');
  });

  beforeEach(function(done) {
    Company.remove({}, function(err) {
      done();
    });
  });

  describe('/GET company', function() {
    it('should get all the companies', function(done) {
      chai
        .request(app)
        .get('/api/company')
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST company', function() {
    it('should create company and return it', function(done) {
      var company = { displayName: 'Test Company' };
      chai
        .request(app)
        .post('/api/company')
        .send(company)
        .end(function(err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.displayName.should.eql(company.displayName);
          res.body.name.should.eql(company.displayName.toLowerCase());
          done();
        });
    });

    it('should not create company without display name', function(done) {
      var company = { displayName: '   ' };
      chai
        .request(app)
        .post('/api/company')
        .send(company)
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          done();
        });
    });

    it('should not create company with same existing name', function(done) {
      var company = { displayName: 'Test Company' };
      chai
        .request(app)
        .post('/api/company')
        .send(company)
        .end(function() {
          chai
            .request(app)
            .post('/api/company')
            .send(company)
            .end(function(err, res) {
              should.not.exist(err);
              res.should.have.status(409);
              res.body.should.be.a('object');
              res.body.should.have.property('err');
              done();
            });
        });
    });
  });

  describe('/PUT company', function() {
    it('should update company and return the updated version', function(done) {
      var company = { displayName: 'Test Company' };
      Company.create(company, function(err, result) {
        var updatedCompany = { _id: result._id, displayName: 'Updated Company' };
        chai
          .request(app)
          .put('/api/company')
          .send(updatedCompany)
          .end(function(err, res) {
            res.should.have.status(202);
            res.body.should.be.a('object');
            res.body.displayName.should.eql(updatedCompany.displayName);
            res.body.name.should.eql(updatedCompany.displayName.toLowerCase());
            done();
          });
      });
    });

    it('should not update not existing company', function(done) {
      var updatedCompany = { _id: '5bbf58d8642e1a2d02ac8628', displayName: 'Updated Company' };
      chai
        .request(app)
        .put('/api/company')
        .send(updatedCompany)
        .end(function(err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          done();
        });
    });

    it('id should be exist update', function(done) {
      var updatedCompany = { displayName: 'Updated Company' };
      chai
        .request(app)
        .put('/api/company')
        .send(updatedCompany)
        .end(function(err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          done();
        });
    });

    it('id should be valid when update', function(done) {
      var updatedCompany = { _id: 'aaaaaaaaa', displayName: 'Updated Company' };
      chai
        .request(app)
        .put('/api/company')
        .send(updatedCompany)
        .end(function(err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          done();
        });
    });
  });

  describe('/Get:_id company', function() {
    it('should get one company by id', function(done) {
      var company = { displayName: 'Test Company' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .get('/api/company/' + result._id)
          .end(function(err, res) {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.displayName.should.eql(company.displayName);
            done();
          });
      });
    });

    it('should be a valid id', function(done) {
      chai
        .request(app)
        .get('/api/company/' + 'sssssss')
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          done();
        });
    });
  });
});
