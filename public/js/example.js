$(document).on("click", ".delete", handleDeleteButtonPress);
// $(document).on("click", ".edit", handleedit);

function fetche (done) {
    $.get('/api/examples', function(data){
        done(data)
    })
}



function createe(example) {
   var newTr = $("<tr>");
   newTr.data("ex", example);
    
   newTr.append("<td>" +example.cust_id+ "</td>");
   newTr.append("<td>" +example.cust_name+ "</td>");
       newTr.append("<td>" +example.cust_email+ "</td>");
       newTr.append("<td>" +example.cust_phone+ "</td>");
       newTr.append("<td> <a style='cursor:pointer;color:red'  class='delete'>Delete User</a></td>");

    return newTr;
}

$(function () {
let exampleList =   $("#tbody")

fetche(function (examples) {
    exampleList.empty()
    for(example of examples){
        exampleList.append(createe(example))
    }
})
})

function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("ex");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/examples/" + id
    })
      .then($(function () {
        let exampleList =   $("#tbody")
        
        fetche(function (examples) {
            exampleList.empty()
            for(example of examples){
                exampleList.append(createe(example))
            }
        })
        }));
  }



