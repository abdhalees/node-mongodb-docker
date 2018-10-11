var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var Company = require('../models/Company.model');
var database;

var should = chai.should();

chai.use(chaiHttp);

describe('Workspaces', function() {
  before(function() {
    database = require('../config/database');
  });
  after(function() {
    database.close();
  });
  beforeEach(function(done) {
    Company.remove({}, function(err) {
      done();
    });
  });

  describe('/POST workspace', function() {
    it('should add workspace to company', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .post('/api/company/' + result.name + '/workspace')
          .send(workspace)
          .end(function(err, res) {
            should.not.exist(err);
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.displayName.should.eql(workspace.displayName);
            res.body.name.should.eql(workspace.displayName.toLowerCase());
            done();
          });
      });
    });

    it('should not create workspace for non existing company', function(done) {
      var workspace = { displayName: 'TestWorkspace' };
      chai
        .request(app)
        .post('/api/company/bla/workspace')
        .send(workspace)
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          done();
        });
    });

    it('should not create workspace without display name', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: '       ' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .post('/api/company/' + result.name + '/workspace')
          .send(workspace)
          .end(function(err, res) {
            should.not.exist(err);
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('err');
            done();
          });
      });
    });

    it('should not add workspace more then one time', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .post('/api/company/' + result.name + '/workspace')
          .send(workspace)
          .end(function(err, res) {
            should.not.exist(err);
            chai
              .request(app)
              .post('/api/company/' + result.name + '/workspace')
              .send(workspace)
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
  });

  describe('/PUT workspace', function() {
    it('should update workspace and return the updated version', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .post('/api/company/' + result.name + '/workspace')
          .send(workspace)
          .end(function(err, res) {
            should.not.exist(err);
            var updatedWS = { _id: res.body._id, displayName: 'UpdatedWorkspace' };
            chai
              .request(app)
              .put('/api/company/' + result.name + '/workspace')
              .send(updatedWS)
              .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(202);
                res.body.should.be.a('object');
                res.body.displayName.should.eql(updatedWS.displayName);
                res.body.name.should.eql(updatedWS.displayName.toLowerCase());
                done();
              });
          });
      });
    });

    it('id should exist update', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .post('/api/company/' + result.name + '/workspace')
          .send(workspace)
          .end(function(err, res) {
            should.not.exist(err);
            var updatedWS = { displayName: 'UpdatedWorkspace' };
            chai
              .request(app)
              .put('/api/company/' + result.name + '/workspace')
              .send(updatedWS)
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

    it('id should be valid when update', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .post('/api/company/' + result.name + '/workspace')
          .send(workspace)
          .end(function(err, res) {
            should.not.exist(err);
            var updatedWS = { _id: 'aaaaaaaaaaa', displayName: 'UpdatedWorkspace' };
            chai
              .request(app)
              .put('/api/company/' + result.name + '/workspace')
              .send(updatedWS)
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
  });

  describe('/Get:name workspace', function() {
    it('should get one workspace by name', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .post('/api/company/' + result.name + '/workspace')
          .send(workspace)
          .end(function(err, res) {
            should.not.exist(err);
            chai
              .request(app)
              .get('/api/company/' + result.name + '/workspace/' + res.body.name)
              .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.displayName.should.eql(workspace.displayName);
                done();
              });
          });
      });
    });
  });

  describe('/Get workspace', function() {
    it('should get all workspaces by name', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .post('/api/company/' + result.name + '/workspace')
          .send(workspace)
          .end(function(err, res) {
            should.not.exist(err);
            chai
              .request(app)
              .get('/api/company/' + result.name + '/workspace/')
              .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.eql(1);
                done();
              });
          });
      });
    });

    it('should return error when company does not exist', function(done) {
      chai
        .request(app)
        .get('/api/company/' + 'ssss' + '/workspace/')
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
