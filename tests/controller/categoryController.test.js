const {mockRequest, mockResponse} = require("../mocker");
const jestMock = require("jest-mock");
const categoryModel = require("../../src/models/category");
const categoryController = require("../../src/controllers/categoryController");

const testPayload = [
    {
        categoryId: 1,
        name: "Electronics"
    },
    {
        categoryId: 2,
        name: "Fashion"
    }
];

it('Category controller should return error on all category', async () => {
    const spy = jestMock.spyOn(categoryModel, 'listCategories').mockImplementation((cb) => {
        cb(new Error("This is a new error"), null)
    });

    const req = mockRequest();
    const res = mockResponse();

    await categoryController.listCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
        msg: "Error in fetching the categories",
        success: false
    });
});

it('Category controller should return list of category', async () => {
    const spy = jestMock.spyOn(categoryModel, 'listCategories').mockImplementation((cb) => {
        cb(null, testPayload)
    });

    const req = mockRequest();
    const res = mockResponse();

    await categoryController.listCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        msg: "Successfully Fetched the categories",
        success: true,
        categories: testPayload
    });
});