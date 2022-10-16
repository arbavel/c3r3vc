/*
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
        
         myTable+="<td><button onclick='borrarCategoria("+items[i].id+")'>Borrar</button>";
        myTable+="<td><button onclick='ConsultarIdCategoria("+items[i].id+")'>Ver</button>";

        myTable+="</tr>";
    }
    myTable +="</table>";
    $("#resultadoC").append(myTable);
}


function editarCategoria(){
  let myData ={
    id:$("#id").val(),
    name:$("#name").val(),
    description:$("#description").val()
  };
  console.log(myData);
  let dataToSend = JSON.stringify(myData);

  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
      url:"http://localhost:8080/api/Category/update",
      type:"PUT",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(respuesta){        
        //console.log(respuesta);
        $("#resultadoCategoria").empty();
        $("#id").val("");
        $("#name").val("");
        $("#description").val("");
        traerCategoria();
        alert("Actualización exitosa");
        
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }

  );
}







function borrarCategoria(idElemento){
  let myData={id:idElemento}
  console.log(myData.id);
  let dataToSend = JSON.stringify(myData);
  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
      url:"http://localhost:8080/api/Category/"+idElemento,
      type:"DELETE",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(response){        
        console.log(response);
        $("#resultadoCategorias").empty();
        alert("Borrado exitoso");
        traerCategoria();
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }

  );
}




function ConsultarIdCategoria(idItem) {
	
	$.ajax (
    {
	  datatype:"JSON",
      
      url:"http://localhost:8080/api/Category/all",
      type:'GET',
     
      success:function(response){        
        
        $("#resultadoCategoriasId").empty();
        var item = response[idItem-1];
        console.log("item: : "+item);
        console.log("itemId: : "+item.idMessage);
        console.log("itemId: : "+item.partyrooms.owner);
        
        
        $("#id").val(item.id);
        $("#name").val(item.name);
		$("#description").val(item.description);
        
        

        alert(	"id:  "+item.id+
				"\nname:  "+item.name+
				"\ndescription:  "+item.description+
				"\npartyroom.id:  "+item.partyrooms[0].id+
				"\npartyroom.name:  "+item.partyrooms[0].name+
				"\npartyroom.owner:  "+item.partyrooms[0].owner+
				"\npartyroom.capacity:  "+item.partyrooms[0].capacity+
				"\npartyroom.description:  "+item.partyrooms[0].description
				);
        traerCategoria();
         let myTableMi="<table>";
  myTableMi += "<tr><th>Codigo</th><th>Name</th><th>Description</th>";
  myTableMi += "<th>PartyroomId</th><th>PartyroomName</th><th>PartyroomOwner</th>";
  myTableMi += "<th>PartyroomCapacity</th><th>Partyroomdescription</th><th>idMessage</th>";
  myTableMi += "<th>messageText</th></tr>"
  
  
    myTableMi+="<tr>";
    myTableMi+="<td>"+item.id+"</td>";
    myTableMi+="<td>"+item.name+"</td>";
	myTableMi+="<td>"+item.description+"</td>";
    myTableMi+="<td>"+item.partyrooms[0].id+"</td>";
    myTableMi+="<td>"+item.partyrooms[0].owner+"</td>";    
    myTableMi+="<td>"+item.partyrooms[0].capacity+"</td>";
    myTableMi+="<td>"+item.partyrooms[0].name+"</td>";
    myTableMi+="<td>"+item.partyrooms[0].description+"</td>";
    myTableMi+="<td>"+item.partyrooms[0].messages[0].idMessage+"</td>";
    myTableMi+="<td>"+item.partyrooms[0].messages[0].messageText+"</td>";
	myTableMi += "</tr>";
  
  myTableMi+="</table>"
  $("#resultadoCategoriasId").append(myTableMi);
      
      }
    }

  );
}




/////////////////////////  CLIENTES  ////////////////////////




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
  let myData ={id:$("#id").val(),email:$("#email").val(),password:$("#password").val(),name:$("#namecl").val(),age:$("#age").val()}
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
        $("#nameCL").val("");
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


function editarClientes(){
  let myData ={
    idClient:$("#idClient").val(),
    email:$("#email").val(),
    password:$("#password").val(),
    name:$("#nameCL").val(),
    age:$("#age").val()
  };
  console.log(myData.idClient);
  console.log(myData.email);
  console.log(myData.password);
  console.log(myData.name);
  console.log(myData.age);
  let dataToSend = JSON.stringify(myData);

  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
      url:"http://localhost:8080/api/Client/update",
      type:"PUT",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(respuesta){        
        //console.log(respuesta);
        $("#resultadoClientes").empty();
        $("#idClient").val("");
        $("#email").val("");
        $("#password").val("");
        $("#nameCL").val("");
        $("#age").val("");
        traerClientes();
        alert("Actualización exitosa");
        
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }

  );
}



function borrarCliente(idElemento){
  let myData={id:idElemento}
  console.log(myData.id);
  let dataToSend = JSON.stringify(myData);
  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
      url:"http://localhost:8080/api/Client/"+idElemento,
      type:"DELETE",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(respuesta){        
        console.log(respuesta);
        $("#resultadoClientes").empty();
        alert("Borrado exitoso");
        traerClientes();
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }

  );
}






function ConsultarIdClientes(idItem) {
	
	$.ajax (
    {
	  datatype:"JSON",
      
      url:"http://localhost:8080/api/Client/all",
      type:'GET',
     
      success:function(response){        
        
        $("#resultadoClientesId").empty();
        var item = response[idItem-1];
        console.log("item: : "+item);
        console.log("itemEmail: : "+item.email);
        console.log("itemId: : "+item.messages[0].idMessage);
        
        
        $("#id").val(item.idClient);
        $("#email").val(item.email);
		$("#password").val(item.password);
		$("#nameCL").val(item.name);
		$("#age").val(item.age);
        
        

        alert(	"idClient:  "+item.idClient+
				"\nemail:  "+item.email+
				"\npassword:  "+item.password+
				"\nname:  "+item.name+
				"\nage:  "+item.age+
				"\npartyroom.id:  "+item.messages[0].idMessage+
				"\npartyroom.name:  "+item.messages[0].messageText
				);
        traerClientes();
         let myTableMi="<table>";
  myTableMi += "<tr><th>Codigo</th><th>Correo</th><th>Password</th><th>Nombre</th><th>Edad</th><th>idMessage</th><th>messageText</th></tr>"
  
  
    myTableMi+="<tr>";
    myTableMi+="<td>"+item.idClient+"</td>";    
    myTableMi+="<td>"+item.email+"</td>";
    myTableMi+="<td>"+item.password+"</td>";
    myTableMi+="<td>"+item.name+"</td>";
    myTableMi+="<td>"+item.age+"</td>";               
    //myTableMi+="<td>"+item.messages +"</td>";                        
    //myTableMi+="<td>"+item.reservations+"</td>";
    myTableMi+="<td>"+item.messages[0].idMessage+"</td>";
    myTableMi+="<td>"+item.messages[0].messageText+"</td>";
	myTableMi += "</tr>";
  
  myTableMi+="</table>"
  $("#resultadoClientesId").append(myTableMi);
      
      }
    }

  );
}




/////////////////////////// MENSAJES //////////////////////////

function traerMensajes() {
  $.ajax(
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
      url:"http://localhost:8080/api/Message/all",
      type:"GET",
      datatype:"JSON",
      success:function(response){ 
        console.log("481 "+response);
        pintarRespuestaM(response);
      }

    }
  );
  
}


function pintarRespuestaM(items) {
  $("#resultadoMensajes").empty();
  
  //declarar variables de js
  let myTableM="<table>";
  myTableM += "<tr><th>Codigo</th><th>Mensaje</th><th>PartyroomId</th><th>CategoryId</th><th>ClientId</th></tr>"
  
  for(i=0;i<items.length;i++){
    myTableM+="<tr>";
    myTableM+="<td>"+items[i].idMessage+"</td>";
    myTableM+="<td>"+items[i].messageText+"</td>";
    myTableM+="<td>"+items[i].partyroom.id+"</td>";
//    myTableM+="<td>"+items[i].partyroom.owner+"</td>";    
//    myTableM+="<td>"+items[i].partyroom.capacity+"</td>";
//    myTableM+="<td>"+items[i].partyroom.name+"</td>";
//    myTableM+="<td>"+items[i].partyroom.description+"</td>";
    myTableM+="<td>"+items[i].partyroom.category.id+"</td>";
//    myTableM+="<td>"+items[i].partyroom.category.name+"</td>";
//    myTableM+="<td>"+items[i].partyroom.category.description+"</td>";
    myTableM+="<td>"+items[i].client.idClient+"</td>";
//    myTableM+="<td>"+items[i].client.email+"</td>";
//    myTableM+="<td>"+items[i].client.password+"</td>";
//    myTableM+="<td>"+items[i].client.name+"</td>";
//    myTableM+="<td>"+items[i].client.age+"</td>";
	console.log("517 items[i]: "+items[i]+" i: "+i);
    //myTableM+="<td><button onclick='ConsultarIdMensajes("+items[i].idMessage+")'>Ver</button></td>";
    myTableM+="<td><button onclick='ConsultarIdMensajes("+items[i].idMessage+")'>Ver</button></td>";
    
    myTableM+="<td><button onclick='borrarMensajes("+items[i].idMessage+")'>Borrar</button></td>";
    myTableM += "</tr>";
  }
  myTableM+="</table>"
  $("#resultadoMensajes").append(myTableM);
}


function ConsultarIdMensajes(idItem) {
	//window.open("http://localhost:8080", "Diseño Web", "width=300, height=200")
  //let myData={id:idItem}
  console.log("537 iten: "+idItem);
  console.log("message id: "+idItem);
  //let dataToSend = JSON.stringify(myData);
	$.ajax (
    {
	  datatype:"JSON",
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
      url:"http://localhost:8080/api/Message/all",
      type:'GET',
     // data:dataToSend,
      
      //contentType:'application/json',
      success:function(response){        
        console.log("response: "+response);
        $("#resultadoMensajesId").empty();
        var item = response[idItem-1];
        console.log("item: : "+item);
        console.log("itemId: : "+item.idMessage);
        console.log("itemId: : "+item.partyroom.owner);
        
        $("#idMessage").val(item.idMessage);
        $("#messageText").val(item.messageText);
        
        //pintarRespuestaMensajeId(item);

        alert(	"idMessage:  "+item.idMessage+
				"\nmessageText:  "+item.messageText+
				"\npartyroom.id:  "+item.partyroom.id+
				"\npartyroom.name:  "+item.partyroom.name+
				"\npartyroom.owner:  "+item.partyroom.owner+
				"\nclient.id:  "+item.client.idClient+
				"\nclient.owner:  "+item.client.name
				);
        traerMensajes();
         let myTableMi="<table>";
  myTableMi += "<tr><th>Codigo</th><th>Mensaje</th><th>PartyroomId</th><th>PartyroomName</th><th>PartyroomOwner</th><th>PartyroomCapacity</th><th>Partyroomdescription</th><th>CategoryId</th><th>CategoryName</th><th>CategoryDescriptio</th><th>ClientId</th><th>Clientemail</th><th>ClientPassword</th><th>ClientName</th><th>ClientAge</th></tr>"
  
  //for(i=0;i<items.length;i++){
    myTableMi+="<tr>";
    myTableMi+="<td>"+item.idMessage+"</td>";
    myTableMi+="<td>"+item.messageText+"</td>";
    myTableMi+="<td>"+item.partyroom.id+"</td>";
    myTableMi+="<td>"+item.partyroom.owner+"</td>";    
    myTableMi+="<td>"+item.partyroom.capacity+"</td>";
    myTableMi+="<td>"+item.partyroom.name+"</td>";
    myTableMi+="<td>"+item.partyroom.description+"</td>";
    myTableMi+="<td>"+item.partyroom.category.id+"</td>";
    myTableMi+="<td>"+item.partyroom.category.name+"</td>";
    myTableMi+="<td>"+item.partyroom.category.description+"</td>";
    myTableMi+="<td>"+item.client.idClient+"</td>";
    myTableMi+="<td>"+item.client.email+"</td>";
    myTableMi+="<td>"+item.client.password+"</td>";
    myTableMi+="<td>"+item.client.name+"</td>";
    myTableMi+="<td>"+item.client.age+"</td>";
	//console.log("517 item: "+item+" i: "+i);
    //myTableMi+="<td><button onclick='ConsultarIdMensajes("+items[i].idMessage+")'>Ver</button></td>";
    ////myTableMi+="<td><button onclick='ConsultarIdMensajes("+items[i].idMessage+")'>Ver</button></td>";
    
    ////myTableMi+="<td><button onclick='borrarMensajes("+items[i].idMessage+")'>Borrar</button></td>";
    myTableMi += "</tr>";
  
  myTableMi+="</table>"
  $("#resultadoMensajesId").append(myTableMi);
      //},
      //error:function(xhr,status){
      //  alert('Operación no satisfactoria,'+xhr.status);
      }
    }

  );
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
  let myData ={	
	idMessage:$("#idMessage").val(),
  	messageText:$("#messageText").val(),
  	partyroom:{id:$("#partyroomId").val()},
  	client:{idClient:$("#clientId").val()}
  	}
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
      success:function(response){        
        console.log(response);
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


function editarMensajes(){
  let myData ={
    idMessage:$("#idMessage").val(),
    messageText:$("#messageText").val()
  };
  console.log("..."+myData.idMessage);
  console.log(myData.messageText);
  let dataToSend = JSON.stringify(myData);
  //console.log(dataToSend);

  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
      url:"http://localhost:8080/api/Message/update",
      type:"PUT",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(response){        
        //console.log(response);
        $("#resultadoMensajes").empty();
        $("#idMessage").val("");
        $("#messageText").val("");
        traerMensajes();
        alert("Actualización exitosa");
        
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }

  );
}


function borrarMensajes(idElemento){
  let myData={id:idElemento}
  let dataToSend = JSON.stringify(myData);
  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
      url:"http://localhost:8080/api/Message/"+idElemento,
      type:"DELETE",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(response){        
        //console.log(response);
        $("#resultadoMensajes").empty();
        alert("Borrado exitoso");
        traerMensajes();
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
  //myTableS += "<tr><th>Codigo</th><th>nombreParty</th><th>Propietario</th><th>capacidad</th><th>descripcion</th><th>categoriaId</th><th>nombreCat</th><th>descripcionCat</th><th>Messages</th><th>Reservations</th>"
  myTableS += "<tr><th>Codigo</th><th>nombreParty</th><th>Propietario</th></tr>"
  for(i=0;i<items.length;i++){
    myTableS+="<tr>";
    //console.log("items500: "+ items[i].categoryId);
    myTableS+="<td>"+items[i].id+"</td>";
     myTableS+="<td>"+items[i].name+"</td>";
    myTableS+="<td>"+items[i].owner+"</td>";
    //myTableS+="<td>"+items[i].capacity+"</td>";
    //myTableS+="<td>"+items[i].description+"</td>";
   
    //myTableS+="<td>"+items[i].category.id+"</td>";
    //myTableS+="<td>"+items[i].category.name+"</td>";
    //myTableS+="<td>"+items[i].category.description+"</td>";
    
    
    //myTableS+="<td>"+items[i].messages+"</td>";
    
    //myTableS+="<td>"+items[i].messages[0].idMessage+"</td>";
    //myTableS+="<td>"+items[i].messages[0].messageText+"</td>";
    
    //myTableS+="<td>"+items[i].reservations+"</td>";
    myTableS+="<td><button onclick='ConsultarIdSalones("+items[i].id+")'>Ver</button></td>";
    myTableS+="<td><button onclick='borrarSalones("+items[i].id+")'>Borrar</button></td>";
    myTableS += "</tr>";
  }
  myTableS+="</table>"
  $("#resultadoSalones").append(myTableS);
}






function ConsultarIdSalones(idItem) {
	
	$.ajax (
    {
	  datatype:"JSON",
      
      url:"http://localhost:8080/api/Partyroom/all",
      type:'GET',
     
      success:function(response){        
        
        $("#resultadoSalonesId").empty();
        var item = response[idItem-1];
        console.log("item: : "+item);
        console.log("itemId: : "+item.id);
        console.log("itemId: : "+item.category.name);
        console.log("itemidMessage: : "+item.messages[0].idMessage);
        console.log("itemmessageText: : "+item.messages[0].messageText);
        
        
        $("#id").val(item.id);
        $("#name").val(item.name);
		$("#description").val(item.description);
        
        

        alert(	"id:  "+item.id+
				"\nname:  "+item.name+
				"\nowner:  "+item.owner+
				"\ncapacity:  "+item.capacity+
				"\ndescription:  "+item.description+
				"\ncategory.id:  "+item.category.id+
				"\ncategory.name:  "+item.category.name+
				"\ncategory.description:  "+item.category.description+
				"\nmessage.idMessage:  "+item.messages[0].idMessage+
				"\nmessage.messageText:  "+item.messages[0].messageText //+
				//"\nreservations.name:  "+item.reservations[0].idReservation+
				//"\nreservations.owner:  "+item.reservations[0].startDate+
				//"\nreservations.capacity:  "+item.reservations[0].devolutionDate
				);
        traerSalones();
         let myTableMi="<table>";
  myTableMi += "<tr><th>Codigo</th><th>nombreParty</th><th>Propietario</th><th>capacidad</th><th>descripcion</th><th>categoriaId</th><th>nombreCat</th><th>descripcionCat</th><th>idMessage</th><th>messageText</th>"
  
  
    myTableMi+="<tr>";
    myTableMi+="<td>"+item.id+"</td>";
    myTableMi+="<td>"+item.name+"</td>";
	myTableMi+="<td>"+item.owner+"</td>";
	myTableMi+="<td>"+item.owner+"</td>";
	myTableMi+="<td>"+item.capacity+"</td>";
    myTableMi+="<td>"+item.category.id+"</td>";
    myTableMi+="<td>"+item.category.name+"</td>";
    myTableMi+="<td>"+item.category.description+"</td>";
    myTableMi+="<td>"+item.messages[0].idMessage+"</td>";
    myTableMi+="<td>"+item.messages[0].messageText+"</td>";
	myTableMi += "</tr>";
  
  myTableMi+="</table>"
  $("#resultadoSalonesId").append(myTableMi);
      
      }
    }

  );
}






function guardarSalones(){
  $("#resultadoSalones").empty();
  //owner antes de : es el owner de partyroom en Partyroom.java
//"#owner" es el valor que está en el textfield
//category:{id:$("#category").val()}
//category antes de : es la variable en Partyroom.java
//category:{id:$("#category").val()} tiene que adicionarse el id de Category.java
//"#category" es el textfield en index.html
  let myData ={
	id:$("#id").val(),
	name:$("#nameP").val(),
	owner:$("#owner").val(),
	capacity:$("#capacity").val(),
	description:$("#descriptionP").val(),
	category:{id:$("#category").val()}}
  console.log("---"+myData.id);
  console.log(myData.name);
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
        $("#nameP").val("");
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


function editarSalones(){
  let myData ={
    id:$("#idP").val(),
    name:$("#nameP").val(),
    owner:$("#owner").val(),
    capacity:$("#capacity").val(),
    description:$("#descriptionP").val(),
    category:$("#category").val()
    
  };
  console.log("editar"+myData.id);
  console.log(myData.id);
  console.log(myData.name);
  console.log(myData.owner);
  console.log(myData.capacity);
  console.log(myData.description);
  console.log(myData.category);
  let dataToSend = JSON.stringify(myData);
  //console.log(dataToSend);

  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
      url:"http://localhost:8080/api/Partyroom/update",
      type:"PUT",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(respuestaS){        
        //console.log(respuestaS);
        $("#resultadoSalones").empty();
        $("#idP").val("");
        $("#nameP").val("");
        $("#owner").val("");
        $("#capacity").val("");
        $("#descriptionP").val("");
        $("#category").val("");
        
        traerSalones();
        alert("Actualización exitosa");
        
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }

  );
}


function borrarSalones(idElemento){
  let myData={id:idElemento}
  let dataToSend = JSON.stringify(myData);
  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
      url:"http://localhost:8080/api/Partyroom/all",
      type:"DELETE",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(respuestaS){        
        //console.log(respuestaS);
        $("#resultadoSalones").empty();
        alert("Borrado exitoso");
        traerSalones();
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }

  );
}





/////////////////  RESERVACIONES  //////////////////



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
            
       //myTable+="<td>"+items[i].partyroom.id+"</td>";       
       //myTable+="<td>"+items[i].partyroom.name+"</td>";
       //myTable+="<td>"+items[i].partyroom.owner+"</td>";
       //myTable+="<td>"+items[i].partyroom.capacity+"</td>";
       //myTable+="<td>"+items[i].partyroom.description+"</td>";
       
       //myTable+="<td>"+items[i].partyroom.category.id+"</td>";
     
       //myTable+="<td>"+items[i].partyroom.category.name+"</td>";
       //myTable+="<td>"+items[i].partyroom.category.description+"</td>";
       
       //myTable+="<td>"+items[i].partyroom.messages.idMessage+"</td>";
       //myTable+="<td>"+items[i].partyroom.messages.messageText+"</td>";
       
       ////myTable+="<td>"+items[i].partyroom.messages[0].idMessage+"</td>";
       //myTable+="<td>"+items[i].partyroom.messages[0].messageText+"</td>";
       
       //myTable+="<td>"+items[i].client.idClient+"</td>";
       //myTable+="<td>"+items[i].client.name+"</td>";
       //myTable+="<td>"+items[i].client.email+"</td>";
       //myTable+="<td>"+items[i].client.password+"</td>";
       //myTable+="<td>"+items[i].client.age+"</td>";
       
       //myTable+="<td>"+items[i].score+"</td>";
       
       myTable+="<td><button onclick='ConsultarIdReservation("+items[i].idReservation+")'>Ver</button>";
       myTable+="<td><button onclick='borrarElemento("+items[i].idReservation+")'>Borrar</button>";
       myTable+="</tr>";
   }
   myTable +="</table>";
   $("#resultadoReservaciones").append(myTable);
}


function editarReservaciones(){
  let myData ={
    idReservation:$("#idReservation").val(),
    startDate:$("#startDate").val(),
    devolutionDate:$("#devolutionDate").val()
    
  };
  console.log("editarR"+myData.idReservation);
  console.log(myData.startDate);
  console.log(myData.devolutionDate);
  
  
  let dataToSend = JSON.stringify(myData);
  //console.log(dataToSend);

  $.ajax (
    {
      //url:"https://gf2b759d47bd1f3-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
      url:"http://localhost:8080/api/Reservation/update",
      type:"PUT",
      data:dataToSend,
      datatype:"JSON",
      contentType:'application/json',
      success:function(respuestaS){        
        //console.log(respuestaS);
        $("#resultadoReservaciones").empty();
        $("#idReservation").val("");
        $("#startDate").val("");
        $("#devolutionDate").val("");
        $("#status").val("");
        
        traerSalones();
        alert("Actualización exitosa");
        
      },
      error:function(xhr,status){
        alert('Operación no satisfactoria,'+xhr.status);
      }
    }

  );
}

///// falta borrar /////

//corregir////

function ConsultarIdReservation(idItem) {
	
	$.ajax (
    {
	  datatype:"JSON",
      
      url:"http://localhost:8080/api/Reservation/all",
      type:'GET',
     
      success:function(response){        
        
        $("#resultadoReservacionesId").empty();
        var item = response[idItem-1];
        console.log("item: : "+item);
        console.log("itemId: : "+item.idReservation);
        console.log("itemId: : "+item.partyroom.owner);
        console.log("itemId: : "+item.client.nameCL);
        
        
        $("#id").val(item.id);
        $("#name").val(item.name);
		$("#description").val(item.description);
        
        

        alert(	"id:  "+item.idReservation+
				"\nstartDate:  "+item.startDate+
				"\ndevolutionDate:  "+item.devolutionDate+
				"\nstatus:  "+item.status+
				"\npartyroom.id:  "+item.partyroom.id+
				"\npartyroom.name:  "+item.partyroom.name+
				"\npartyroom.owner:  "+item.partyroom.owner+
				"\npartyroom.capacity:  "+item.partyroom.capacity+
				"\npartyroom.description:  "+item.partyroom.description+
				"\npartyroom.description:  "+item.partyroom.messages[0].idMessage+
				"\npartyroom.description:  "+item.partyroom.messages[0].messageText+
				"\npartyroom.description:  "+item.partyroom.description+
				"\nclient.idClient:  "+item.client.idClient+
				"\nclient.email:  "+item.client.email+
				"\nclient.password:  "+item.client.password+
				"\nclient.name:  "+item.client.name+
				"\nclient.age:  "+item.client.age+
				"\nscore:  "+item.score	
				);
        traerReservaciones();
         let myTableMi="<table>";
  myTableMi += "<tr><th>Codigo</th><th>Name</th><th>Description</th>";
  myTableMi += "<th>PartyroomId</th><th>PartyroomName</th><th>PartyroomOwner</th>";
  myTableMi += "<th>PartyroomCapacity</th><th>Partyroomdescription</th><th>idMessage</th>";
  myTableMi += "<th>messageText</th>"
  myTableMi += "<th>idClient</th><th>email</th><th>password</th>";
  myTableMi += "<th>name</th><th>age</th><th>score</th>";
	myTableMi += "</tr>"
  
  
    myTableMi+="<tr>";
    myTableMi+="<td>"+item.idReservation+"</td>";
    myTableMi+="<td>"+item.startDate+"</td>";
	myTableMi+="<td>"+item.devolutionDate+"</td>";
    myTableMi+="<td>"+item.partyroom.id+"</td>";
    myTableMi+="<td>"+item.partyroom.owner+"</td>";    
    myTableMi+="<td>"+item.partyroom.capacity+"</td>";
    myTableMi+="<td>"+item.partyroom.name+"</td>";
    myTableMi+="<td>"+item.partyroom.description+"</td>";
    myTableMi+="<td>"+item.partyroom.messages[0].idMessage+"</td>";
    myTableMi+="<td>"+item.partyroom.messages[0].messageText+"</td>";
	myTableMi+="<td>"+item.client.idClient+"</td>";
    myTableMi+="<td>"+item.client.email+"</td>";  
    myTableMi+="<td>"+item.client.password+"</td>";  
    myTableMi+="<td>"+item.client.name+"</td>";  
    myTableMi+="<td>"+item.client.age+"</td>";  
    myTableMi+="<td>"+item.score+"</td>";  
	myTableMi += "</tr>";
  
  myTableMi+="</table>"
  $("#resultadoReservacionesId").append(myTableMi);
      
      }
    }

  );
}

*/