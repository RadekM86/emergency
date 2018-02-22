$(function() {
    
        // variables for DOM
        var ul = $(".repertuar");
    
        var url = "http://localhost:3000";
    
    function insertCity(miasta){
            miasta.forEach(function(miasta){
              console.log(miasta);
              var li = $('<li>')
              var title = $('<h3>').text(miasta.nazwa);
              var deleteBtn = $("<button>").text("Usuń").addClass('delete');
              deleteBtn.data('id', miasta.id);
              var editBtn = $("<button>").text("Edytuj").addClass('edit');
              editBtn.data('id', miasta.id);
              li.append(title);
              li.append(deleteBtn);
              li.append(editBtn);
              ul.append(li);
            });
    };
    
    
    function addMovie(miasta){
      var url = "http://localhost:3000";
      var form = $('.add_movie').submit(function(e){
        e.preventDefault();
          var insertTitle = $('.get_title').val();
          var insertDesc = $('.check').val();
          console.log('click');
    
          var newCity = {
            nazwa: insertTitle,
            jednostka: insertDesc
          };
          $.ajax({
              method: "POST",
              url: url + "/miasta",
              dataType: "json",
              data: newMovie
            })
            .done(function(response){
              console.log(response);
              var li = $('<li>')
              var newTitle = $('<h3>').text(response.nazwa);
              var newDescription = $('<p>').text(response.jednostka);
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
    
    function removeMovie(){
      var deleteBtn = ul.on('click','.delete',function(){
        var thisbtn = $(this);
        var id = thisbtn.data('id');
          $.ajax({
            method: "DELETE",
            url: url + "/miasta/"+ id,
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
    function editMovie(){
      var editBtn = ul.on('click','.edit',function(){
        var thisbtn = $(this);
        var id = thisbtn.data('id');
        var editTitle = thisbtn.prevAll().attr('contenteditable', true);
        thisbtn.text('Zapisz');
    
    
        var newMovie = {
          title: $(this).parent().find('h3').text(),
          description: $(this).parent().find('p').text()
        };
      $.ajax({
      method: "PUT",
      url: url + "/miasta/" + id,
      dataType: "json",
      data: newMovie
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
    
    function getmiasta(){
    $.ajax({
    method: "GET",
    url: url + "/miasta",
    dataType: "json"
    })
      .done(function(response){
      console.log("hurra");
      console.log(response);
      insertmiasta(response);
    
    
      })
      .fail(function(error){
      console.log('Error');
      console.log(error);
    })
    };
    
    getmiasta();
    removeMovie();
    addMovie();
    editMovie();
    
    
    
    });
    