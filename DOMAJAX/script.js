function sayMyName()
{
	var name=document.getElementById('myname').value;
	var mensaje="<h2>Bienvenido "+name+"!</h2>";

	document.getElementById('contenido').innerHTML=mensaje;
	//document.getElementById("contenido").textContent=mensaje;

	if(name=="Joseph")
	{
		var encabezado=document.querySelector('#demo').textContent;
		encabezado=" We love you";
		document.querySelector('#demo').textContent=encabezado;

	}
}