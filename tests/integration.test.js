const request = require("supertest");
const app = require("../src/index"); // The server
const db = require("../src/persistence/index"); // The database connection

describe("To-Do App Integration Tests", () => {
    let testItemId;

    beforeAll(async () => {
        await db.init(); // Initialize the database
    });

    afterAll(async () => {
        await db.teardown(); // Close database connections after tests
    });

    test("POST /items - should create a new item", async () => {
        const response = await request(app)
            .post("/items")
            .send({ name: "Integration Test Task" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Integration Test Task");

        testItemId = response.body.id; // Save the ID for future tests
    });

    test("GET /items - should retrieve all items", async () => {
        const response = await request(app).get("/items");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("PUT /items/:id - should update an existing item", async () => {
        const updatedData = { name: "Updated Task", completed: true };

        const response = await request(app)
            .put('/items/${testItemId}')
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.completed).toBe(true);

        console.log(response.body);
    });

    test("DELETE /items/:id - should delete an item", async () => {
        const response = await request(app).delete('/items/${testItemId}');

        expect(response.status).toBe(200);

        // Verify item was deleted
        const checkResponse = await request(app).get('/items/${testItemId}');
        //expect(checkResponse.body).toBeUndefined();
        expect(checkResponse.status).toBe(404);
    });
});