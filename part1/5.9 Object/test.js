describe("sumSalaries", function() {
  it("returns sum of salaries", function() {
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal( sumSalaries(salaries), 650 );
  });

  it("returns 0 for the empty object", function() {
    assert.strictEqual( sumSalaries({}), 0);
  });
});

describe("count", function() {
  it("counts the number of properties", function() {
    assert.equal( count({a: 1, b: 2}), 2 );
  });

  it("returns 0 for an empty object", function() {
    assert.equal( count({}), 0 );
  });

  it("ignores symbolic properties", function() {
    assert.equal( count({ [Symbol('id')]: 1 }), 0 );
  });
});