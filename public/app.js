$(function() {
    
        // variables for DOM
        var ul = $(".list");
    
        var url = "http://localhost:3000";
    
    function insertCity(cities){
            cities.forEach(function(cities){
              console.log(cities);
              var li = $('<li>')
              var title = $('<h3>').text(cities.name);
              var deleteBtn = $("<button>").text("Usuń").addClass('delete');
              deleteBtn.data('id', cities.id);
              var editBtn = $("<button>").text("Edytuj").addClass('edit');
              editBtn.data('id', cities.id);
              li.append(title);
              li.append(deleteBtn);
              li.append(editBtn);
              ul.append(li);
            });
    };
    
    
    function addCity(cities){
      var url = "http://localhost:3000";
      var form = $('.add_City').submit(function(e){
        e.preventDefault();
          var inputName = $('.get_name').val();
          var inputCheck = $('.check').is(':checked');
          console.log(inputName, inputCheck);
    
          var newCity = {
            name: inputName,
            firestation: inputCheck
          };
          $.ajax({
              method: "POST",
              url: url + "/cities",
              dataType: "json",
              data: newCity
            })
            .done(function(response){
              console.log(response);
              var li = $('<li>')
              var newTitle = $('<h3>').text(response.name);
              var newDescription = $('<p>').text(response.firestation);
              var deleteBtn = $("<button>").text("Usuń").addClass('delete');
              deleteBtn.data('id', response.id);
              var editBtn = $("<button>").text("Edytuj").addClass('edit');
              editBtn.data('id', response.id);
              li.append(newTitle);
              li.append(newDescription);
              li.append(deleteBtn);
              li.append(editBtn);
              ul.append(li);
            })
            .fail(function(error){
            console.log('Error');
            console.log(error);
          })
      });
    
    }
    
    function removeCity(){
      var deleteBtn = ul.on('click','.delete',function(){
        var thisbtn = $(this);
        var id = thisbtn.data('id');
          $.ajax({
            method: "DELETE",
            url: url + "/cities"+ id,
            dataType: "json",
          })
          .done(function(response){
            console.log(response);
          })
          .fail(function(error){
            console.log('Error');
            console.log(error);
        })
        thisbtn.parent().remove();
      });
    
    }
    function editCity(){
      var editBtn = ul.on('click','.edit',function(){
        var thisbtn = $(this);
        var id = thisbtn.data('id');
        var editTitle = thisbtn.prevAll().attr('contenteditable', true);
        thisbtn.text('Zapisz');
    
    
        var newCity = {
          title: $(this).parent().find('h3').text(),
          description: $(this).parent().find('p').text()
        };
      $.ajax({
      method: "PUT",
      url: url + "/cities/" + id,
      dataType: "json",
      data: newCity
      })
        .done(function(response){
        console.log("hurra");
        console.log(response);
    
        })
        .fail(function(error){
        console.log('Error');
        console.log(error);
      })
    
    });
    
    };
    
    function getcities(){
    $.ajax({
    method: "GET",
    url: url + "/cities",
    dataType: "json"
    })
      .done(function(response){
      console.log("hurra");
      console.log(response);
      insertCity(response);
    
    
      })
      .fail(function(error){
      console.log('Error');
      console.log(error);
    })
    };
    
    getcities();
    removeCity();
    addCity();
    editCity();
    
    
    
    });
    