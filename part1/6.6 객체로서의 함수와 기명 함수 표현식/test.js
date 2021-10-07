describe("counter", function() {

  it("increases from call to call", function() {

    let counter = makeCounter();

    assert.equal( counter(), 0 ); 
    assert.equal( counter(), 1 ); 
    assert.equal( counter(), 2 ); 
  });

  
  describe("counter.set", function() {
    it("sets the count", function() {

      let counter = makeCounter();

      counter.set(10);

      assert.equal( counter(), 10 ); 
      assert.equal( counter(), 11 ); 
    });
  });
  
  describe("counter.decrease", function() {
    it("decreases the count", function() {

      let counter = makeCounter();

      counter.set(10);

      assert.equal( counter(), 10 ); 

      counter.decrease();

      assert.equal( counter(), 10 ); 

    });
  });

});

describe("sum", function(){
  
  it("sum(1)(2) == 3", function(){
    assert.equal(3, sum(1)(2));
  });

  it("sum(5)(-1)(2) == 6", function(){
    assert.equal(6, sum(5)(-1)(2));
  });
  
  it("sum(6)(-1)(-2)(-3) == 0", function(){
    assert.equal(0, sum(6)(-1)(-2)(-3));
  });

  it("sum(0)(1)(2)(3)(4)(5) == 15", function(){
    assert.equal(15, sum(0)(1)(2)(3)(4)(5));
  });
});