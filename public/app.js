$(function() {
    
        // variables for DOM
        var ul = $(".list");
    
        var url = "http://localhost:3000";
    
    function insertCity(cities){
            cities.forEach(function(cities){
              console.log(cities);
              var li = $('<li>')
              var title = $('<h3>').text(cities.name);
              var newFireStation = $('<p>').text(cities.firestation==="true"?"posiada jednostkę straży pożarnej":"")
              var deleteBtn = $("<button>").html('Usuń <i class="fa fa-remove"></i>').addClass('delete');
              deleteBtn.data('id', cities.id);
              cities.firestation==="true" && li.addClass('firestation')
              // var editBtn = $("<button>").text("Edytuj").addClass('edit');
              // editBtn.data('id', cities.id);
              li.append(title);
              li.append(newFireStation)
              li.append(deleteBtn);
              // li.append(editBtn);
              ul.append(li)
            });
    };
    
    
    function addCity(cities){
      var url = "http://localhost:3000";
      var form = $('.add_City').submit(function(e){
        if($('.get_name').val().length>0){
          e.preventDefault();
          $('.placeholder').html('')
          var inputName = $('.get_name').val();
          var inputCheck = $('.check').is(':checked')
    
          var newCity = {
            id: this.id,
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
              var newFireStation = $('<p>').text(response.firestation==="true"?"posiada jednostkę straży pożarnej":"")
              var deleteBtn = $("<button>").html('Usuń <i class="fa fa-remove"></i>').addClass('delete');
              deleteBtn.data('id', response.id);
              // var editBtn = $("<button>").text("Edytuj").addClass('edit');
              // editBtn.data('id', response.id);
              li.append(newTitle);
              li.append(newFireStation)
              li.append(deleteBtn);
              response.firestation==="true" && li.addClass('firestation')
              $('.get_name').val('')
              // li.append(editBtn);
              ul.append(li);
            })
            .fail(function(error){
            console.log('Error');
            console.log(error);
          })
      }else{
            e.preventDefault();
            var placeholder = $(".placeholder").html("<h3>Nazwa miasta powinna zawierać conajmniej jeden znak</h3>").addClass('placeholder')
      }
    
    });
    
    }
    
    function removeCity(){
      var deleteBtn = ul.on('click','.delete',function(){
        var thisbtn = $(this);
        var id = thisbtn.data('id');
          $.ajax({
            method: "DELETE",
            url: url + "/cities/"+ id,
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
    // function editCity(){
    //   var editBtn = ul.on('click','.edit',function(){
    //     var thisbtn = $(this);
    //     var id = thisbtn.data('id');
    //     var editTitle = thisbtn.prevAll().attr('contenteditable', true);
    //     thisbtn.text('Zapisz');
    
    
    //     var newCity = {
    //       title: $(this).parent().find('h3').text(),
    //     };
    //   $.ajax({
    //   method: "PUT",
    //   url: url + "/cities/" + id,
    //   dataType: "json",
    //   data: newCity
    //   })
    //     .done(function(response){
    //     console.log("hurra");
    //     console.log(response);
    
    //     })
    //     .fail(function(error){
    //     console.log('Error');
    //     console.log(error);
    //   })
    
    // });
    
    // };
    
    function getcities(){
    $.ajax({
    method: "GET",
    url: url + "/cities",
    dataType: "json"
    })
      .done(function(response){
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
  // editCity();
    
    
    
    });
    