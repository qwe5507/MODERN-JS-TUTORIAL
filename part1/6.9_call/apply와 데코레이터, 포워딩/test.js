describe("spy", function() {
    it("records calls into its property", function() {
      function work() {}
  
      work = spy(work);
      assert.deepEqual(work.calls, []);
  
      work(1, 2);
      assert.deepEqual(work.calls, [
        [1, 2]
      ]);
  
      work(3, 4);
      assert.deepEqual(work.calls, [
        [1, 2],
        [3, 4]
      ]);
    });
  
    it("transparently wraps functions", function() {
  
      let sum = sinon.spy((a, b) => a + b);
  
      let wrappedSum = spy(sum);
  
      assert.equal(wrappedSum(1, 2), 3);
      assert(sum.calledWith(1, 2));
    });
  
  
    it("transparently wraps methods", function() {
  
      let calc = {
        sum: sinon.spy((a, b) => a + b)
      };
  
      calc.wrappedSum = spy(calc.sum);
  
      assert.equal(calc.wrappedSum(1, 2), 3);
      assert(calc.sum.calledWith(1, 2));
      assert(calc.sum.calledOn(calc));
    });
  
  });
  describe("delay", function() {
    before(function() {
      this.clock = sinon.useFakeTimers();
    });
  
    after(function() {
      this.clock.restore();
    });
  
    it("calls the function after the specified timeout", function() {
      let start = Date.now();
  
      function f(x) {
        assert.equal(Date.now() - start, 1000);
      }
      f = sinon.spy(f);
  
      let f1000 = delay(f, 1000);
      f1000("test");
      this.clock.tick(2000);
      assert(f.calledOnce, 'calledOnce check fails');
    });
  
    it("passes arguments and this", function() {
      let start = Date.now();
      let user = {
        sayHi: function(phrase, who) {
          assert.equal(this, user);
          assert.equal(phrase, "Hello");
          assert.equal(who, "John");
          assert.equal(Date.now() - start, 1500);
        }
      };
  
      user.sayHi = sinon.spy(user.sayHi);
  
      let spy = user.sayHi;
      user.sayHi = delay(user.sayHi, 1500);
  
      user.sayHi("Hello", "John");
  
      this.clock.tick(2000);
  
      assert(spy.calledOnce, 'calledOnce check failed');
    });
  });