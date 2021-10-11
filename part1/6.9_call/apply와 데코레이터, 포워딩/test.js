describe("spy", function () {
  it("records calls into its property", function () {
    function work() { }

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

  it("transparently wraps functions", function () {

    let sum = sinon.spy((a, b) => a + b);

    let wrappedSum = spy(sum);

    assert.equal(wrappedSum(1, 2), 3);
    assert(sum.calledWith(1, 2));
  });


  it("transparently wraps methods", function () {

    let calc = {
      sum: sinon.spy((a, b) => a + b)
    };

    calc.wrappedSum = spy(calc.sum);

    assert.equal(calc.wrappedSum(1, 2), 3);
    assert(calc.sum.calledWith(1, 2));
    assert(calc.sum.calledOn(calc));
  });

});
describe("delay", function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  it("calls the function after the specified timeout", function () {
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

  it("passes arguments and this", function () {
    let start = Date.now();
    let user = {
      sayHi: function (phrase, who) {
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
describe('debounce', function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  it('for one call - runs it after given ms', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('test');
    assert(f.notCalled, 'not called immediately');
    this.clock.tick(1000);
    assert(f.calledOnceWith('test'), 'called after 1000ms');
  });

  it('for 3 calls - runs the last one after given ms', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('a');
    setTimeout(() => debounced('b'), 200); // ignored (too early)
    setTimeout(() => debounced('c'), 500); // runs (1000 ms passed)
    this.clock.tick(1000);

    assert(f.notCalled, 'not called after 1000ms');

    this.clock.tick(500);

    assert(f.calledOnceWith('c'), 'called after 1500ms');
  });

  it('keeps the context of the call', function () {
    let obj = {
      f() {
        assert.equal(this, obj);
      },
    };

    obj.f = debounce(obj.f, 1000);
    obj.f('test');
    this.clock.tick(5000);
  });

});
describe("throttle(f, 1000)", function () {
  let f1000;
  let log = "";

  function f(a) {
    log += a;
  }

  before(function () {
    this.clock = sinon.useFakeTimers();
    f1000 = throttle(f, 1000);
  });

  it("the first call runs now", function () {
    f1000(1); // runs now
    assert.equal(log, "1");
  });

  it("then calls are ignored till 1000ms when the last call works", function () {
    f1000(2); // (throttling - less than 1000ms since the last run)
    f1000(3); // (throttling - less than 1000ms since the last run)
    // after 1000 ms f(3) call is scheduled

    assert.equal(log, "1"); // right now only the 1st call done

    this.clock.tick(1000); // after 1000ms...
    assert.equal(log, "13"); // log==13, the call to f1000(3) is made
  });

  it("the third call waits 1000ms after the second call", function () {
    this.clock.tick(100);
    f1000(4); // (throttling - less than 1000ms since the last run)
    this.clock.tick(100);
    f1000(5); // (throttling - less than 1000ms since the last run)
    this.clock.tick(700);
    f1000(6); // (throttling - less than 1000ms since the last run)

    this.clock.tick(100); // now 100 + 100 + 700 + 100 = 1000ms passed

    assert.equal(log, "136"); // the last call was f(6)
  });

  after(function () {
    this.clock.restore();
  });

});

describe('throttle', () => {

  it('runs a forwarded call once', done => {
    let log = '';
    const f = str => log += str;
    const f10 = throttle(f, 10);
    f10('once');

    setTimeout(() => {
      assert.equal(log, 'once');
      done();
    }, 20);
  });

});