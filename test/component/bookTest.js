const assert = require("assert");
const request = require("supertest");
const app = require("../../src/app");

describe("Book catalog", function() {
    it("should support CRUD lifecycle", function(done) {
        request(app)
            .post('/book')
            .send({
                title: "JavaScript in Action",
                authors: ["James Smith", "Kate Donovan"],
                isbn: "0123456789",
                description: "The ultimate JS book!"
            })
            .set('Content-Type', 'application/json')
            .expect(200, {
                title: "JavaScript in Action",
                authors: ["James Smith", "Kate Donovan"],
                isbn: "0123456789",
                description: "The ultimate JS book!"
            }, done);
    });
});