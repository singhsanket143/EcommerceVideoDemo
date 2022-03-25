const sqlConnection = require("../services/sqlConnection");

function addOrderItem(data, cb) {
    let sql = ` INSERT INTO OrderItems
                (OrderId, ProductId, Quantity, CreatedAt, UpdatedAt)
                VALUES (? , ? , ? , now(), now())
    `;
    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    values.push(data.quantity);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function editOrderItem(data, cb) {
    let sql = ` UPDATE OrderItems SET
                Quantity = ? , UpdatedAt = now() 
                WHERE OrderId = ? AND ProductId = ?
    `;
    let values = [];
    values.push(data.quantity);
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function deleteOrderItems(data, cb) {
    let sql = ` DELETE FROM OrderItems
                OrderId = ? AND ProductId = ?
    `;
    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function getOrderItems(data, cb) {
    let sql = ` SELECT * FROM OrderItems 
                WHERE
                OrderId = ? AND ProductId = ?
    `;
    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

module.exports = {
    addOrderItem,
    deleteOrderItems,
    editOrderItem,
    getOrderItems
}
