import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import {Imagenes} from '../lib/collections.js';

/*Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/

if(Meteor.isClient)
{
	/*if(Imagenes.find().count()==0)
  	{
  		Imagenes.insert(
		  	{
		  		img_src:"pavehawk.jpg",
				img_alt:"Helicóptero"
		  	}
  		);
  		Imagenes.insert(
		  	{
		  		img_src:"sniper.jpg",
				img_alt:"Helicóptero"
		  	}
  		);
  		Imagenes.insert(
		  	{
		  		img_src:"sniper2.jpg",
				img_alt:"Helicóptero"
		  	}
  		);  				
  	}*/
   	 
  	 		
	/*var image_data=gdfg;
	[
		{
			img_src:"pavehawk.jpg",
			img_alt:"Helicóptero"
		},
		{
			img_src:"pavehawk.jpg",
			img_alt:"Helicóptero"
		},
		{
			img_src:"pavehawk.jpg",
			img_alt:"Helicóptero"
		}
	];	*/

	/*Template.imagenes.helpers({imagenes:image_data});*/

	// Enrutamiento.
	Router.configure(
	{
		layoutTemplate:"ApplicationLayout"
	});

	Router.route('/', function ()
	{
	  this.render("Bienvenida",
	  	{
	  		to:"main"
	  	}); 		
		
	});

	Router.route('/imagenes', function ()
	{
	  this.render("navbar",
	  	{
	  		to:"navbar"
	  	});
	  	this.render("imagenes",
	  	{
	  		to:"main"
	  	});	
	});

	Router.route('/imagen/:_id', function ()
	{
	  this.render("navbar",
	  	{
	  		to:"navbar"
	  	});
	  	this.render("imagen",
	  	{
	  		to:"main",
	  		data:function()
	  		{
	  			return Imagenes.findOne({ _id:this.params._id});
	  		}
	  	});	
	});

	//Scroll infinito
	Session.set("limite",4);
	lastScrollTop=0;
	$(window).scroll(function(event)
	{
		// alúa si estamos cerca al tope inferior de la pantalla.
		if($(window).scrollTop()+$(window).height() > $(document).height()-100)
		{
			// Nuestra ubicación en la página.
			var scrollTop=$(this).scrollTop();
			if(scrollTop>lastScrollTop)
			{
				// En caso positivo
				Session.set("limite",Session.get("limite")+4);				
			}
			lastScrollTop=scrollTop;
		}
		
	});

	//Configuración de cuenta de usuario.
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_EMAIL'
	});

	Template.body.helpers({usuario:function()
		{
			if(Meteor.user())
			{
				return Meteor.user().username;
				//return Meteor.user().emails[0].address;
			}
			else
			{
				return "Usuario anónimo";
			}			
		}
	});

	Template.imagenes.helpers(
		{
			imagenes:function()
			{
				if(Session.get("userFilter"))
				{
					return Imagenes.find({creadoPor:Session.get("userFilter")},{sort:{fecha_creacion:-1, rating:-1}});
				}
				else
				{
					return Imagenes.find({},{sort:{fecha_creacion:-1, rating:-1}, limit:Session.get("limite")});
				}
				
			},
			filtro_imagenes:function()
			{
				if(Session.get("userFilter"))
				{
					return true;
				}
				else
				{
					return false;
				}
			},
			filtroUsuario:function()
			{
				if(Session.get("userFilter"))
				{
					var usuario=Meteor.users.findOne({ _id:Session.get("userFilter")});
					return usuario.username;
				}
				else
				{
					return false;
				}
			},
			getUser:function(idUsuario)
			{
				var usuario=Meteor.users.findOne({ _id:idUsuario});
				if(usuario)
				{
					return usuario.username;
				}
				else
				{
					return "Anónimo";
				}
			}
		});
	//Template.imagenes.helpers({imagenes:Imagenes.find()});	
		
	Template.imagenes.events({		
		'click .js-imagen':function(event)
		{
			console.log(event);			
			/*alert('hello');*/
			/*$(event.target).css("width","50px");*/
		},
		'click .js-del-img':function(event)
		{
			var imagen_id=this._id;
			$("#"+imagen_id).hide("slow",function()
				{
					Imagenes.remove({"_id":imagen_id});
				}
			);			
		},
		'click .js-rate-img':function(event)
		{
			var rating = $(event.currentTarget).data('userrating');
			console.log(rating);
			var imagen_id=this.id;
			console.log(imagen_id);

			Imagenes.update({_id:imagen_id},{$set:{rating:rating}});
		},
		'click .js-img-form':function(event)
		{								
			$("#modalImagen").modal("show");
		},
		'click .js-filtro-imagen':function(event)
		{								
			Session.set("userFilter", this.creadoPor);
		},
		'click .js-remover-filtro':function(event)
		{								
			Session.set("userFilter", undefined);
		}
	});	

	Template.adicionarImagen.events({
		'submit .js-add-img':function(event)
		{
			var img_src, img_alt;
			img_src=event.target.img_src.value;
			img_alt=event.target.img_alt.value;
			console.log("src: "+img_src+" alt: "+img_alt);

			if(Meteor.user())
			{

				Imagenes.insert(
				  	{
				  		img_src:img_src,
						img_alt:img_alt,
						fecha_creacion:new Date(),
						creadoPor:Meteor.user()._id
				  	}
  				);
			}
			
			return false;
		},
		'click .btn-close':function(event)
		{							
			$("#modalImagen").modal("hide");
		}
	});	
}