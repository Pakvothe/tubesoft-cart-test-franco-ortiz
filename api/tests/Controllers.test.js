const controllers = require("../controllers");
const httpMocks = require("node-mocks-http");

describe("post/delete from Cart", () => {
	it("Should create and delete a cart from the history", () => {
		const mockReq = httpMocks.createRequest({
			body: {
				cartProducts: [
					{
						name: "FIFA 21",
						img: "https://i.imgur.com/RKCvcWJ.jpg",
						price: 2879,
						stock: 2300,
						totalStock: 2300,
						rating: 4,
						qty: 1,
					},
					{
						name: "Final Fantasy VII ",
						img: "https://images.goodgam.es/WKE-gd3lr40/enlarge:1/plain/covers/17-final-fantasy-vii-remake-cover.jpg",
						price: 6035,
						stock: 200,
						totalStock: 200,
						rating: 5,
						qty: 1,
					},
				],
				createDate: "2021-10-12 15:10:28",
			},
		});
		const mockResponse = httpMocks.createResponse();
		controllers.Carts.post(mockReq, mockResponse)
			.then(() => {
				const cartID = JSON.parse(mockResponse._getData()).id;
				expect(mockResponse.statusCode).toEqual(201);
				return cartID;
			})
			.then((cartID) => {
				const mockReq = httpMocks.createRequest({
					params: { id: cartID },
				});
				const mockRes = httpMocks.createResponse();
				return controllers.Carts.delete(mockReq, mockRes)
					.then(() => {
						expect(mockRes.statusCode).toEqual(200);
					})
					.catch((err) => console.log(`err`, err));
			});
	});
});

describe("Get products", () => {
	it("Get all products", () => {
		const mockResponse = httpMocks.createResponse();
		controllers.Products.list(null, mockResponse).then(() => {
			expect(mockResponse.statusCode).toEqual(200);
		});
	});
});

describe("Get carts", () => {
	it("Get all carts", () => {
		const mockResponse = httpMocks.createResponse();
		controllers.Carts.list(null, mockResponse).then(() => {
			expect(mockResponse.statusCode).toEqual(200);
		});
	});
});
