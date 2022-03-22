const chai = require('chai');
const mongoose = require('mongoose');
const dbService = require('../models/dbService');
const Task = require('../models/task');

const expect = chai.expect;
let id = null;
before((done) => {
  mongoose.connect("mongodb://localhost/task_app",{ useNewUrlParser: true})
  .then(() => {
    console.log("connection is successfull");
    done();
  })
  .catch((error) => console.log(error));
});

describe('Testing Database fetch methods', ()=> {
  describe('fetch data method', ()=> {
    it('should return data', async()=> {
      const data = await dbService.fetchDB();
      expect(data).to.be.a("array");
    })
  })

  describe('add task method', ()=> {
    it('should return a new task', async ()=> {
      const description = 'drink 4L water daily';
      const data = await dbService.addTask(description);
      id = data._id;
      expect(data).to.be.a("object");
      expect(data).to.have.property('_id');
      expect(data).to.have.property('description');
      expect(data).to.have.property('completed');
      expect(data.description).to.equal(description);
      expect(data.completed).to.be.false;  
    })
  })

  describe('update task method', ()=> {
    it('should update task', async()=> {
      const task = await dbService.updateStatus(id);
      expect(task).to.be.a("object");
      expect(task).to.have.property('_id');
      expect(task).to.have.property('description');
      expect(task).to.have.property('completed');
      expect(task.completed).to.be.true;
    })
  })

  describe('delete task method', ()=> {
    it('should delete task', async()=> {
      const task = await dbService.deleteTaskById(id);
      expect(task).to.be.a("object");
      expect(task).to.have.property('_id');
      expect(task).to.have.property('description');
      expect(task).to.have.property('completed');
    })
  })

})

