
function guardarCategoria(){

    $("#resultado").empty();

//name antes de : es el nombre de name en Category.java
//"#name" es el valor que está en el textfield
    let myData ={name:$("#name").val(),description:$("#description").val()}
    let dataToSend = JSON.stringify(myData);

    $.ajax (
        {

            url          : 'http://localhost:8080/api/Category/save',
            type         : 'POST',
            data         :  dataToSend,
            datatype     :  "JSON",
            contentType  : 'application/json',
            success      :  function(respuesta){
                            //console.log(respuesta);
                            $("#resultadoClientes").empty();
					        $("#id").val("");
					        $("#name").val("");
					        $("#description").val("");
					        traerCategoria();
        
                            alert("Inserción exitosa");
                            },
            error       :   function(xhr,status){
                                alert('Operacion no satisfactoria,'+ xhr.status );
                            }

        }
    );
}

// traerCategoria lo llama el onclick de index.html 
function traerCategoria(){
    $.ajax(
          {
	//la url la da la CategoryController
            url:"http://localhost:8080/api/Category/all",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){                
                pintarRespuestaCategoria(respuesta);
                
            },
            error       :   function(xhr,status){
                alert('Operacion no satisfactoria,'+ xhr.status );
            }
            
                    
          }
           
      );
}


function pintarRespuestaCategoria(items){

     $("#resultadoC").empty();

    //declarar variables js
    let myTable="<table>";
    myTable += "<tr><th>Codigo</th><th>Nombre</th><th>Descripcion</th><th>Partyrooms</th></tr>";
    console.log("categoria items: " + items.length);
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+ items[i].id+ "</td>";
        myTable+="<td>"+ items[i].name+"</td>";
        myTable+="<td>"+ items[i].description+"</td>";
        myTable+="<td>"+ items[i].partyrooms +"</td>";
        // myTable+="<td><button onclick='borrarCategoria("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable +="</table>";
    $("#resultadoC").append(myTable);
}




function traerClientes() {
  $.ajax(
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
      url:"http://localhost:8080/api/Client/all",
      type:"GET",
      datatype:"JSON",
      success:function(respuesta){ 
        console.log("respuesta: " + respuesta);
        pintarRespuesta(respuesta);
      }

    }
  );
  
}


function pintarRespuesta(items) {
  $("#resultadoClientes").empty();

  //declarar variables de js
  let myTable="<table>";
  myTable += "<tr><th>Codigo</th><th>Correo</th><th>Password</th><th>Nombre</th><th>Edad</th><th>Messages</th><th>Reservations</th></tr>"
  console.log("respuesta.items98: " + items +" ");
  for(i=0;i<items.length;i++){
    myTable+="<tr>";
    myTable+="<td>"+items[i].idClient+"</td>";
    myTable+="<td>"+items[i].email+"</td>";
    myTable+="<td>"+items[i].password+"</td>";
    myTable+="<td>"+items[i].name+"</td>";
    myTable+="<td>"+items[i].age+"</td>";               
    myTable+="<td>"+items[i].messages +"</td>";                        
    myTable+="<td>"+items[i].reservations+"</td>"; 
    //myTable+="<td><button onclick='ConsultarIdClientes("+items[i].idClient+")'>Ver</button></td>";
    //myTable+="<td><button onclick='borrarCliente("+items[i].id+")'>Borrar</button></td>";
    myTable += "</tr>";
  }
  myTable+="</table>"
  $("#resultadoClientes").append(myTable);
}


function guardarClientes(){
  $("#resultadoClientes").empty();
  let myData ={id:$("#id").val(),email:$("#email").val(),password:$("#password").val(),name:$("#name").val(),age:$("#age").val()}
  let dataToSend = JSON.stringify(myData);

  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
      url:"http://localhost:8080/api/Client/save",
      type:"POST",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(respuesta){        
        //console.log(respuesta);
        $("#resultadoClientes").empty();
        $("#id").val("");
        $("#email").val("");
        $("#password").val("");
        $("#name").val("");
        $("#age").val("");
        traerClientes();
        alert("Inserción exitosa");
        
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }
  );
}




/////////////////////////////////// MENSAJES //////////////////////////////////////////

function traerMensajes() {
  $.ajax(
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
      url:"http://localhost:8080/api/Message/all",
      type:"GET",
      datatype:"JSON",
      success:function(respuestaM){ 
        console.log(respuestaM);
        pintarRespuestaM(respuestaM);
      }

    }
  );
  
}


function pintarRespuestaM(items) {
  $("#resultadoMensajes").empty();
  
  //declarar variables de js
  let myTableM="<table>";
  myTableM += "<tr><th>Codigo</th><th>Mensaje</th><th>PartyroomId</th><th>PartyroomName</th><th>PartyroomOwner</th><th>PartyroomCapacity</th><th>Partyroomdescription</th><th>ClientId</th><th>Clientemail</th><th>ClientPassword</th><th>ClientName</th><th>ClientAge</th></tr>"
  
  for(i=0;i<items.length;i++){
    myTableM+="<tr>";
    myTableM+="<td>"+items[i].idMessage+"</td>";
    myTableM+="<td>"+items[i].messageText+"</td>";
    myTableM+="<td>"+items[i].partyroom.id+"</td>";
    myTableM+="<td>"+items[i].partyroom.name+"</td>";
    myTableM+="<td>"+items[i].partyroom.owner+"</td>";    
    myTableM+="<td>"+items[i].partyroom.capacity+"</td>";
    myTableM+="<td>"+items[i].partyroom.description+"</td>";
    myTableM+="<td>"+items[i].partyroom.category.id+"</td>";
    myTableM+="<td>"+items[i].partyroom.category.name+"</td>";
    myTableM+="<td>"+items[i].partyroom.category.descrption+"</td>";
    myTableM+="<td>"+items[i].client.idClient+"</td>";
    myTableM+="<td>"+items[i].client.email+"</td>";
    myTableM+="<td>"+items[i].client.password+"</td>";
    myTableM+="<td>"+items[i].client.name+"</td>";
    myTableM+="<td>"+items[i].client.age+"</td>";
    //myTableM+="<td><button onclick='ConsultarIdMensajes("+items[i].id+")'>Ver</button></td>";
    //myTableM+="<td><button onclick='borrarMensajes("+items[i].id+")'>Borrar</button></td>";
    myTableM += "</tr>";
  }
  myTableM+="</table>"
  $("#resultadoMensajes").append(myTableM);
}



//owner antes de : es el owner de partyroom en Partyroom.java
//"#owner" es el valor que está en el textfield
//category:{id:$("#category").val()}
//category antes de : es la variable en Partyroom.java
//category:{id:$("#category").val()} tiene que adicionarse el id de Category.java
//"#category" es el textfield en index.html
  //let myData ={id:$("#id").val(),owner:$("#owner").val(),capacity:$("#capacity").val(),description:$("#description").val(),category:{id:$("#category").val()},name:$("#name").val()}


function guardarMensajes(){
  $("#resultadoMensajes").empty();
  let myData ={idMessage:$("#idMessage").val(),messageText:$("#messageText").val(),partyroom:{id:$("#partyroomId").val()},client:{idClient:$("#clientId").val()}}
  //console.log(myData);
  let dataToSend = JSON.stringify(myData);
  //console.log(dataToSend);
  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
      url:"http://localhost:8080/api/Message/save",
      type:"POST",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(respuestaM){        
        console.log(respuestaM);
        $("#resultadoMensajes").empty();
        $("#idMessage").val("");
        $("#messageText").val("");
        $("#partyroomId").val("");
        $("#clientId").val("");
        traerMensajes();
        alert("Inserción exitosa");
        
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }
  );
}



////////////////////////////// SALONES //////////////////////////////////////


function traerSalones() {
  $.ajax(
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
      url:"http://localhost:8080/api/Partyroom/all",
      type:"GET",
      datatype:"JSON",
      success:function(respuestaS){
        //console.log(respuestaS);
        pintarRespuestaS(respuestaS);
      }

    }
  );
  
}


function pintarRespuestaS(items) {
  $("#resultadoSalones").empty();
  
  //console.log("pr493 items: "+items.length+" "+items[1].category)

  //declarar variables de js
  let myTableS="<table>";
  myTableS += "<tr><th>Codigo</th><th>nombreParty</th><th>Propietario</th><th>capacidad</th><th>descripcion</th><th>categoriaId</th><th>nombreCat</th><th>descripcionCat</th><th>Messages</th><th>Reservations</th>"
  for(i=0;i<items.length;i++){
    myTableS+="<tr>";
    //console.log("items500: "+ items[i].categoryId);
    myTableS+="<td>"+items[i].id+"</td>";
    myTableS+="<td>"+items[i].name+"</td>";
    myTableS+="<td>"+items[i].owner+"</td>";
    myTableS+="<td>"+items[i].capacity+"</td>";
    myTableS+="<td>"+items[i].description+"</td>";
    
    myTableS+="<td>"+items[i].category.id+"</td>";
    myTableS+="<td>"+items[i].category.name+"</td>";
    myTableS+="<td>"+items[i].category.description+"</td>";
    myTableS+="<td>"+items[i].messages+"</td>";
    myTableS+="<td>"+items[i].reservations+"</td>";
    //myTableS+="<td><button onclick='ConsultarIdSalones("+items[i].id+")'>Ver</button></td>";
    //myTableS+="<td><button onclick='borrarSalones("+items[i].id+")'>Borrar</button></td>";
    myTableS += "</tr>";
  }
  myTableS+="</table>"
  $("#resultadoSalones").append(myTableS);
}


function guardarSalones(){
  $("#resultadoSalones").empty();
  //owner antes de : es el owner de partyroom en Partyroom.java
//"#owner" es el valor que está en el textfield
//category:{id:$("#category").val()}
//category antes de : es la variable en Partyroom.java
//category:{id:$("#category").val()} tiene que adicionarse el id de Category.java
//"#category" es el textfield en index.html
  let myData ={id:$("#id").val(),name:$("#name").val(),owner:$("#owner").val(),capacity:$("#capacity").val(),description:$("#descriptionP").val(),category:{id:$("#category").val()}}
  //console.log(myData);
  let dataToSend = JSON.stringify(myData);
  //console.log(dataToSend);
  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
      url:"http://localhost:8080/api/Partyroom/save",
      type:"POST",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(respuestaS){        
       //console.log(respuestaS);
        $("#resultadoSalones").empty();
        $("#id").val("");
        $("#name").val("");
        $("#owner").val("");
        $("#capacity").val("");
        $("#descriptionP").val("");
        $("#category").val("");
        traerSalones();
        alert("Inserción exitosa");
        
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }
  );
}





function guardarReservaciones(){

    $("#resultadoReservaciones").empty();

    let myData ={idReservation:$("#idReservation").val(),startDate:$("#startDate").val(),devolutionDate:$("#devolutionDate").val(),client:{idClient:$("#client").val()},partyroom:{id:$("#partyroom").val()}}
    
    let dataToSend = JSON.stringify(myData);

    $.ajax (
        {

            url          : 'http://localhost:8080/api/Reservation/save',
            type         : 'POST',
            data         :  dataToSend,
            datatype     :  "JSON",
            contentType  : 'application/json',
            success      :  function(respuesta){
                            //console.log(respuesta);
                            
                            $("#resultadoReservaciones").empty();
					        $("#idReservation").val("");
					        $("#startDate").val("");
					        $("#devolutionDate").val("");
					        $("#client").val("");
					        $("#partyroom").val("");
					        traerReservaciones();                            
                            
                            alert("Inserción exitosa");
                            },
            error       :   function(xhr,status){
                                alert('Operacion no satisfactoria,'+ xhr.status );
                            }

        }
    );
}

function traerReservaciones(){
    $.ajax(
              {
                url:"http://localhost:8080/api/Reservation/all",
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){
                    pintarRespuestaReservacion(respuesta);                    
                },
                error       :   function(xhr,status){
                    alert('Operacion no satisfactoria,'+ xhr.status );
                }     
                    
              }
               
          );
}


function pintarRespuestaReservacion(items){

    $("#resultadoReservaciones").empty();

   //declarar variables js
   let myTable="<table>";
   myTable += "<tr><th>idRes</th><th>FechaInicio</th><th>FechaFin</th><th>Status</th></tr>";
   
   //myTable += "<tr><th>idRes</th><th>FechaInicio</th><th>FechaFin</th><th>Status</th><th>idParty</th><th>nameParty</th><th>ownerParty</th><th>capacityParty</th><th>descriptionParty</th><th>idCategoryCodigo</th><th>nameCat</th><th>descriptionCat</th><th>idMessage</th><th>messageText</th><th>idClient</th><th>emailClient</th><th>passwordClient</th><th>nameCliente</th><th>ageClient</th><th>Score</th></tr>";
   
   for(i=0;i<items.length;i++){
       myTable+="<tr>";
       myTable+="<td>"+items[i].idReservation+"</td>";
       myTable+="<td>"+items[i].startDate+"</td>";
       myTable+="<td>"+items[i].devolutionDate+"</td>";
       myTable+="<td>"+items[i].status+"</td>"; 
            
       myTable+="<td>"+items[i].partyroom.id+"</td>";       
       myTable+="<td>"+items[i].partyroom.name+"</td>";
       myTable+="<td>"+items[i].partyroom.owner+"</td>";
       myTable+="<td>"+items[i].partyroom.capacity+"</td>";
       myTable+="<td>"+items[i].partyroom.description+"</td>";
       
       myTable+="<td>"+items[i].partyroom.category.id+"</td>";
     
       myTable+="<td>"+items[i].partyroom.category.name+"</td>";
       myTable+="<td>"+items[i].partyroom.category.description+"</td>";
       
       myTable+="<td>"+items[i].partyroom.messages.idMessage+"</td>";
       myTable+="<td>"+items[i].partyroom.messages.messageText+"</td>";
       
       //myTable+="<td>"+items[i].partyroom.messages[0].idMessage+"</td>";
       myTable+="<td>"+items[i].partyroom.messages[0].messageText+"</td>";
       
       myTable+="<td>"+items[i].client.idClient+"</td>";
       myTable+="<td>"+items[i].client.name+"</td>";
       myTable+="<td>"+items[i].client.email+"</td>";
       myTable+="<td>"+items[i].client.password+"</td>";
       myTable+="<td>"+items[i].client.age+"</td>";
       
       myTable+="<td>"+items[i].score+"</td>";
       
       // myTable+="<td><button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
       myTable+="</tr>";
   }
   myTable +="</table>";
   $("#resultadoReservaciones").append(myTable);
}

