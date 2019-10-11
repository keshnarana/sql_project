$( document ).ready(function() {
   
    //add product start
  var upc_code =$("#upc_code")
  var product_name =$("#product_name")
  var stock_quantity=$("#stock_quantity")
  var wholsale_cost=$("#wholsale_cost")
 

$('#addpr').click(function () {
     event.preventDefault();
    addP(
        upc_code.val(),
        product_name.val(),
        stock_quantity.val(),
        wholsale_cost.val(),
    
        function (addP) {
            var total_cost = parseInt(stock_quantity.val()) * wholsale_cost.val();

         var p=$("<p>")
         p.append("<h1>"+addP.product_name + " is added to product list. total_cost is " +total_cost+"$.</h1>")
         $("#statement").append(p)
         console.log(addP.product_name)
         console.log(total_cost)
        }
    )
})



    function  addP(upc,name,quantity,cost,done) {
        
        $.post('/api/products',
        {
            upc_code :upc,
            product_name:name,
            stock_quantity:quantity,
            wholsale_cost: cost,
          
        }, function (data) {
            done(data)
        })
    }

//add product end


// start product table button click
$(document).on("click", "#productTab", start);

function start(){
  
    $(document).on("click", ".delet", handleDelete);

function fetche (don) {
    $.get('/api/products', function(data){
        don(data)
    })
}

function create(product)  {
    var h = $("<tr>");
h.data("exa", product)
   
h.append("<td>" +product.item_id+ "</td>");
  h.append("<td>" +product.product_name+ "</td>");
   h.append("<td>"+product.upc_code+ "</td>");
 h.append("<td>" +product.wholsale_cost+ "</td>");

h.append("<td> <a style='cursor:pointer;color:red'  class='delet'>Delete product</a></td>");

    return h;
}

$(function () {
let productList =   $("#tb")

fetche(function (products) {
    productList.empty()
    for(product of products){
        productList.append(create(product))
    }
})
})

function handleDelete() {
    var listItemData =  $(this).parent("td").parent("tr").data("exa");
    var item_id = listItemData.item_id;
    $.ajax({
      method: "DELETE",
      url: "/api/products/" + item_id
    })
      .then($(function () {
        let productList =   $("#tb")
        
        fetche(function (products) {
            productList.empty()
            for(product of products){
                productList.append(createe(product))
            }
        })
        }));
  }

}
//end product table button click

// start update button
$('#updpr').click(function () {
     event.preventDefault();
    edit(
        upc_code.val(),
        product_name.val(),
        stock_quantity.val(),
        wholsale_cost.val(),
    
        function (edit) {
            
            var p=$("<p>")
            p.append("<h1>"+edit.product_name + " is added to product list.</h1>")
            $("#statement").append(p)
            console.log(edit.product_name)
           
        
        }
    )
})

function  edit(upc,name,quantity,cost,d) {
        
    $.ajax({
        method: "post",
        url: "/api/products/"+ upc,
        data:  {
        upc_code :upc,
        product_name:name,
        stock_quantity:quantity,
        wholsale_cost: cost},
          
         
        } ,
        function (d) {
        d(d)
    })
    }

  

// end update button



});
