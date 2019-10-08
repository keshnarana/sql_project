var mysql = require("mysql");
var inquirer = require("inquirer");
var clear = require('clear');
var prompts = require('prompts');

var menu = require('node-menu');

var customerList = [];
var productList = [];
var selectedCustomerNum = 0;
var selectedCustomer = "";
var productInv = 0;
var customerInv = 0;
var rowCntr = 0;
var exit = false;

//  host: "ffn96u87j5ogvehy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//  user: "j8zx0xvhpa9rzvl0",
//  password: "lh19l63ja9olicm8",
//  database: "zgmqyg7raweijeit",
//  port: 3306

//  Original
//  host: "b4e9xxkxnpu2v96i.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//  user: "qodovsqsjir4zrhn",
//  password: "q5f26415z891dn6o",
//  database: "uq8bk0tpdf7znmbr"

//  Local     
//  host:     "localhost",
//  user:     "root",
//  password: "password",
//  database: "zgmqyg7raweijeit"

function printHeader() {

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "uq8bk0tpdf7znmbr",
        port: 3306
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        productInv = results.length;
        connection.query("SELECT * FROM customers", function (err, results) {
            if (err) throw err;
            customerInv = results.length;
            var datetime = new Date();
            clear();
            console.log("\n\n--------------------------------------------------------------------------------");
            console.log("[ \x1b[32mSunshine Distributors                Admin v1.1                   " + datetime.toISOString().slice(0, 10) + " \x1b[0m]");
            if (selectedCustomer == "") {
                var custDisp = "none"
            } else {
                var custDisp = selectedCustomer;
            }
            console.log("[ \x1b[2m" + "Products in inventory: " + productInv.toString().padEnd(54) + "\x1b[0m]");
            console.log("[ \x1b[2m" + "Customer accounts    : " + customerInv.toString().padEnd(54) + "\x1b[0m]")
            console.log("[ \x1b[2m" + "Selected customer    : " + custDisp.toString().padEnd(54) + "\x1b[0m]")
            console.log("--------------------------------------------------------------------------------\n\n\n\n\n");
            connection.end();
        });
    });
};

function addProduct() {
    inquirer
        .prompt([
            {
                name: "upc",
                type: "input",
                message: "Enter a UPC code"
            },
            {
                name: "product",
                type: "input",
                message: "Enter a Product name"
            },
            {
                name: "stockQty",
                type: "input",
                message: "Enter a starting inventory position"
            },
            {
                name: "wholesaleCost",
                type: "input",
                message: "Enter the Wholesale cost"
            },
            {
                name: "markup",
                type: "input",
                message: "Enter % markup"
            }
        ])
        .then(function (answer) {
            console.log(`UPC: ${answer.upc}  Quantity: ${answer.stockQty}\nProduct: ${answer.product}\nWholesale: ${answer.wholesaleCost}\nMarkup % : ${answer.markup}\nRetail   :${(parseFloat(answer.wholesaleCost) * (parseFloat(answer.markup) / 100) + parseFloat(answer.wholesaleCost))}`);
        })
}

function pressKey() {
    (async () => {
        const response = await prompts(
            {
                type: 'text',
                name: 'value',
                message: 'press <return> to continue...'
            });
        console.log(response.value);
    })();
}

function switchCustomer() {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "uq8bk0tpdf7znmbr",
        port: 3306
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });
    connection.query("SELECT * FROM customers", function (err, results) {
        if (err) throw err;
        customerList = [];
        for (let x = 0; x < results.length; x++) {
            customerList.push(results[x].cust_name);
        }

        if (selectedCustomer == "") {
        } else {
            customerList.push("\x1b[2m[clear customer select]\x1b[0m");
        }
        inquirer
            .prompt([{
                name: "custChoice",
                type: "list",
                message: "Choose a customer",
                choices: customerList
            }])
            .then(function (answer1) {
                if (answer1.custChoice == "\x1b[2m[clear customer select]\x1b[0m") {
                    selectedCustomerNum = -1;
                    selectedCustomer = "";
                } else {
                    selectedCustomerNum = customerList.indexOf(answer1.custChoice);
                    selectedCustomer = results[selectedCustomerNum].cust_name;
                }
            })
            connection.end();
    })
}

function viewProducts() {

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "uq8bk0tpdf7znmbr",
        port: 3306
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            productList = [];
            globalResults = results;

            console.log("--------------------------------------------------------------------------------");
            console.log("\n\n[UPC           Description                                       Price      Inv]");
            console.log("[-------------|----------------------------------------------|--------|--------]");

            for (let i = 0; i < results.length; i++) {
                var pricePad = "";
                if ((results[i].retail_price.toString(10)).includes('.'))
                    pricePad = results[i].retail_price.toString()
                else
                    pricePad = results[i].retail_price.toString() + '.00';

                if (results[i].product_name.length < 47) {
                    var detailLine = (results[i].upc_code.toString(10).padStart(4) + ' |' +
                        results[i].product_name.padEnd(46).substr(0, 46) + '|' +
                        pricePad.padStart(8) + '|' +
                        results[i].stock_quantity.toString().padStart(6));
                } else {
                    var detailLine = (results[i].upc_code.toString(10).padStart(4) + ' |' +
                        results[i].product_name.substr(0, 43) + '\x1b[2m...\x1b[0m|' +
                        pricePad.padStart(8) + '|' +
                        results[i].stock_quantity.toString().padStart(6));
                }
                productList.push(detailLine);
            }
            rowCntr = 0;
            while (rowCntr < productList.length) {
                clear();
                for (let x = 0; x < 23; x++) {
                    if (rowCntr < productList.length) {
                        console.log(productList[rowCntr]);
                    } else {
                        console.log("");
                    }
                    rowCntr++
                }
            }
            console.log("[-------------|----------------------------------------------|--------|--------]\n\n\n.");
        })
    })
}

menu.addDelimiter('-', 40, 'Main Menu')
    .addItem(
        'Inventory',
        function() {
            viewProducts();
        })
    .addItem(
        "Add new product",
        function() {
            addProduct();
        })
    .addItem(
        'Switch Customer',
        function() {
            switchCustomer();
        })
    .addDelimiter('*', 40)
    .start();


// function start() {

//             (async () => {
//                 const response = await prompts([
//                     {
//                         type: 'select',
//                         name: 'value',
//                         message: 'What would you like to do?',
//                         choices: [
//                             { title: 'View Order or Inventory', value: 'Inventory' },
//                             { title: 'Switch Customer', value: 'Switch' },
//                             { title: 'Add a new Product', value: 'Product' },
//                             { title: 'EXIT', value: 'EXIT' }
//                         ],
//                         initial: 0
//                     }
//                 ]);

//                 console.log(response);


//                 switch (response.value) {

//                     case "Inventory": viewProducts();
//                         start();
//                         break;

//                     case "Product": addProduct();
//                         start();
//                         break;

//                     case "EXIT": exit = true;
//                         connection.end();
//                         break;

//                     case "Switch":
//                         switchCustomer();
//                         start();
//                         break;

//                     default: console.log('\n\n\nxxx\n\n');
//                         break;
//                 }
//             })();
//         }


// start();

// inquirer
//     .prompt([
//         {
//             name: "itemNum",
//             type: "input",
//             message: "Which item would you like to purchase?"
//         },
//         {
//             name: "qtyDesired",
//             type: "input",
//             message: "Enter the quantity required"
//         }
//     ])
//     .then(function (answer) {
//         item = answer.itemNum;
//         itemPtr = item - 1;
//         qty = answer.qtyDesired;
//         if (globalResults[itemPtr].stock_quantity < qty) {
//             console.log("\n\nSo sorry; we do not have enough " + globalResults[itemPtr].product_name + " to fill your order.\n\n\n\n");
//         } else {
// var inventoryLeft = globalResults[itemPtr].stock_quantity - qty;
// connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//         {
//             stock_quantity: inventoryLeft
//         },
//         {
//             item_id: item
//         }
//     ],
//     function (error) {
//         if (error) throw error
//         else {
//            clear();
//             console.log("You purchased " + qty + " of [" + globalResults[itemPtr].product_name + "]'s for a total of $" + qty * globalResults[itemPtr].price + "\n\nThank you for your order!\n\n");
//         }
//     }
// );
//     }
//                 start();
// })
//     })
// }