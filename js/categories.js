function visibility() {
    let icon = document.getElementById("show-icon");
    if (icon.textContent == "visibility_off") {
        icon.innerHTML = "visibility";
        $('#btn-save').hide();
        $('#category-table').hide();

    } else {
        icon.innerHTML = "visibility_off";
        $('#btn-save').show();
        $('#category-table').show();

    }
};

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);
            $('#category-table').show();

        }
    });

});

function getCategories() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);
        }
    });
}

function printTable(response) {

    let data = response;
    let table = "";
    for (i = 0; i < data.length; i++) {
        table += "<tr class='table-info'>";
        table += "<th>" + data[i].name + "</th>";
        table += "<th>" + data[i].description + "</th>"
        table += "<th>" + "<button type='button' id='btn-view' class='btn btn-info btn-sm'><span class='material-icons'>visibility</span></button> <button type='button' id='btn-update' class='btn btn-warning btn-sm'><span class='material-icons'>update</span></button> <button type='button' id='btn-delete' class='btn btn-danger btn-sm'><span class='material-icons'>delete</span></button>" + "</th>";
        table += "</tr>";
    }
    $("#result-category").empty();
    $("#result-category").append(table);
}


function saveInfo() {
    let myData = {
        name: $('#name-category').val(),
        description: $('#description-category').val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'url': 'http://localhost:8080/api/Category/save',
        'type': 'POST',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#name-category').val();
            $('#description-category').val();
            getCategories();
        },
    });

    $('#save-category-modal').modal('hide');
    $("#result").empty();



}

$(document).on("click", "#btn-save", function() {
    $('#name-category').val('');
    $('#description-category').val('');

    $('.modal-title').text('New Category');
    $('#save-category-modal').modal('show');
});

$(document).on("click", "#btn-update", function() {

    $('#name-category').val('');
    $('#description-category').val('');
    $('.modal-title').text('Update Category');
    $('#save-category-modal').modal('show');
    const update = document.querySelector("#save");
    update.addEventListener("click", function(event) {
        //updateInfo();

    })
});


$(document).on("click", "#btn-delete", function() {
    $('#modalTitleDelete').text('Are you sure ?');
    $('#delete-category-modal').modal('show');
    const confirm = document.querySelector("#btn-confirm");
    confirm.addEventListener("click", function(event) {
        deleteInfo(id);
    })
});


$(document).on("click", "#btn-view", function() {
    $("#detail-category-modal").modal('show');

});