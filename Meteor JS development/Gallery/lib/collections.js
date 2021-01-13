// Base de datos de imágenes.
export const Imagenes=new Mongo.Collection("imagenes");

// Seguridad para la colección de imágenes
Imagenes.allow(
	{
		insert:function(userId,doc)
		{
			if(Meteor.user())
			{
				if(userId!=doc.creadoPor)
				{
					return false;
				}
				else
				{
					return true;
				}
			}
			//Usuario no logeado.
			{
				return false;
			}			
		},
		remove:function(userId, doc)
		{
		    // Can only remove your own documents.
		    return true;
  		}
	});