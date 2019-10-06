$( document ).ready(function() {
  
// $(document).on("click", ".edit", handleedit);
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
   

  h.append("<td>" +product.product_name+ "</td>");
   h.append("<td>"+product.upc_code+ "</td>");
 h.append("<td>" +product.wholsale_cost+ "</td>");
 h.append("<td>" +product.retail_price+ "</td>");
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
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/products/" + id
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
});
