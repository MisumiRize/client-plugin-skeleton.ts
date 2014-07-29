/// <reference path="../typings/tsd.d.ts" />

import Chai = require("chai");
var expect = Chai.expect;
import Person = require("../src/person");

describe("Person", function() {
   it("has full name", function() {
       expect(new Person("John", "Doe").fullName).to.equal("John Doe");
   });
});
