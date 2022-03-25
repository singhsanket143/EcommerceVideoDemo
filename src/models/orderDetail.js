const sqlConnection = require("../services/sqlConnection");

function listOrderDetails(data, cb) {
    let sql = ` SElECT * from 
                OrderDetails O INNER JOIN 
                OrderItems OI ON
                O.Id = OI.OrderId 
                INNER JOIN Products P ON
                OI.ProductId = P.Id
                WHERE O.UserId = ?
    `;
    let values = [data.userId];
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function findOrderByUser(data, cb) {
    let sql = ` SELECT ID, Total as total
                FROM OrderDetails 
                WHERE
                UserId = ? AND OrderStatus = 1
    `;
    let values = [data.userId];
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function addOrder(data, cb) {
    let sql = ` INSERT INTO OrderDetails
                (Total, UserId, OrderStatus, CreatedAt, UpdatedAt)
                VALUES (? , ? , 1, now(), now())
    `;
    let values = [];
    values.push(data.total);
    values.push(data.userId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function editOrder(data, cb) {
    let sql = ` UPDATE OrderDetails SET
                Total = ? , OrderStatus = ? ,
                UpdatedAt = now() WHERE ID = ?
    `;
    let values = [];
    if(data.payment) {
        sql = ` UPDATE OrderDetails SET OrderStatus = ? ,
                UpdatedAt = now() WHERE ID = ?
        `;
        values.push(2);
    } else {
        values.push(data.total);
        values.push(1);
    }
    values.push(data.orderId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function getOrderDetails(data, cb) {
    let sql = ` SELECT od.ID as OrderId od.Total as total, p.id as productId,
                p.name as productName, p.price as price, oi.quantity as Quantity
                FROM OrderDetails as od LEFT JOIN OrderItems as oi ON
                od.ID = oi.OrderId LEFT JOIN Products as p ON
                p.ID = oi.ProductID WHERE
                od.UserId = ? AND od.OrderStatus = 1
    `;
    let values = [];
    values.push(data.userId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

module.exports = {
    listOrderDetails,
    findOrderByUser,
    addOrder,
    editOrder,
    getOrderDetails
}