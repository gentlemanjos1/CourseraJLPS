import { Meteor } from 'meteor/meteor';
import {Imagenes} from '../lib/collections.js';

Meteor.startup(function()
{
	if(Imagenes.find().count()==0)
	{
		for(var i=1;i<=3;i++)
		{
			Imagenes.insert(
			  	{
			  		img_src:"img_"+i+".jpg",
					img_alt:"Imagen No. "+i
			  	}
			);
		}
	}
});
