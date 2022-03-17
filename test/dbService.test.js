const chai = require('chai');
// const chaiHttp = require('chai-http');

// const server = require('../index');
const dbService = require('../models/dbService');

const expect = chai.expect;
// chai.use(chaiHttp);

describe('Testing Database fetch methods', ()=> {

  describe('fetch data method', ()=> {
    it('should return data', ()=> {
      const data = dbService.fetchDB();
      expect(data).to.be.a("array");
      expect(data.length).to.equal(1);
    })
  })

  describe('add task method', ()=> {
    it('should return a new task', ()=> {
      const description = 'drink 4L water daily';
      const data = dbService.addTask(description);
      expect(data).to.be.a("object");
      expect(data).to.have.property('id');
      expect(data).to.have.property('description');
      expect(data).to.have.property('completed');
      expect(data.description).to.equal(description);
      expect(data.completed).to.be.false;
    })
  })

  describe('find task index method', ()=> {
    it('should return index', ()=> {
      const index = dbService.findTask(1);
      expect(index).that.is.a('number');
      expect(index).to.equal(0);
    })
    it('should not return index', ()=> {
      const index = dbService.findTask(-1);
      // expect(index).that.is.a('number');
      expect(index).to.equal(null);
    })
  })

})

