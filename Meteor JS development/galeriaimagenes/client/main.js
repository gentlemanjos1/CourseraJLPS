/*import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
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
});*/

import './main.html';

if(Meteor.isClient)
{
	var image_data=
	[
		{
			img_src:"sniper.jpg",
			img_alt:"sniper"
		},
		{
			img_src:"batman.jpeg",
			img_alt:"batman"
		}		
	];	

	Template.imagenes.helpers({imagenes:image_data});	
}
if(Meteor.isServer)
{
	console.log("soy el servidor");
}
