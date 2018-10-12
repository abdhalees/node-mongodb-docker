var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var Company = require('../models/Company.model');

var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
  before(function() {
    database = require('../config/database');
  });
  after(function() {});
  beforeEach(function(done) {
    Company.remove({}, function(err) {
      done();
    });
  });

  describe('/POST user', function() {
    it('should add user workspace to company', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      var user = { email: 'a@a.com', role: 'admin' };
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
              .post('/api/company/' + result.name + '/workspace/' + res.body.name + '/user')
              .send(user)
              .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.email.should.eql(user.email);
                res.body.role.should.eql(user.role);
                done();
              });
          });
      });
    });

    it('should not add user with invalid email', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      var user = { email: 'aa.com', role: 'admin' };
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
              .post('/api/company/' + result.name + '/workspace/' + res.body.name + '/user')
              .send(user)
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

    it('should not add user with invalid role', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      var user = { email: 'a@a.com', role: 'wohooo' };
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
              .post('/api/company/' + result.name + '/workspace/' + res.body.name + '/user')
              .send(user)
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

    it('should not add user with for non existing company', function(done) {
      var user = { email: 'a@a.com', role: 'admin' };
      chai
        .request(app)
        .post('/api/company/' + 'com' + '/workspace/' + 'work' + '/user')
        .send(user)
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          done();
        });
    });

    it('should not add user for no existing workspace', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var user = { email: 'a@a.com', role: 'wohooo' };
      Company.create(company, function(err, result) {
        should.not.exist(err);
        chai
          .request(app)
          .post('/api/company/' + result.name + '/workspace/' + 'workspace' + '/user')
          .send(user)
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

  describe('/DELETE user', function() {
    it('should remove user workspace from company', function(done) {
      var company = { displayName: 'TestCompany' };
      company.name = company.displayName.toLowerCase();
      var workspace = { displayName: 'TestWorkspace' };
      var user = { email: 'a@a.com', role: 'admin' };
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
              .post('/api/company/' + result.name + '/workspace/' + res.body.name + '/user')
              .send(user)
              .end(function(err, res) {
                chai
                  .request(app)
                  .delete('/api/company/' + result.name + '/workspace/' + res.body.name + '/user')
                  .query({ email: user.email })
                  .send(user)
                  .end(function(err, res) {
                    should.not.exist(err);
                    res.should.have.status(204);
                    done();
                  });
              });
          });
      });
    });
  });
});
