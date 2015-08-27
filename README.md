# webAppTarea1
Tarea 1 para el Ramo de desarrollo web.

## Requisitos.
* Que sea sencillo de utilizar. La idea es simplificar, no hacer más complejo el desarrollo.
* Mejore el rendimiento de la aplicación. Muchos framework por ejemplo usan caché para mejor rendimiento.
* Asegure seguridad. Esto es muy importante y es una de las mejores razones de usar el framework.
* Posea manejo de usuarios.
* Ojalá sea Orientada a Objetos !
* Que tenga buena documentación.
* Que tenga una buena comunidad. La comunidad es la que te ayudará cuando tengas problemas.

## Tecnologias escogidas
Basandome en el website [nodeframework](http://nodeframework.com/) escogí Nodejs con express, no conozco mucho de la tecnología NodeJs por eso tuve algunos problemas al desarrollarlo, pero ya que terminé me di cuenta de algunos tipos de frameworks que existen para esta tecnología y como funcionan de manera general.

NodeJs + Express no es un framework como Rails por ejemplo en donde este te genera y maneja casi todos los componentes de la aplicación, Express es más del estilo de de poder elegir los módulos a instalar a elección a medida que se necesiten, es más existen otros frameworks que están constriudos sobre Express - como locomotivejs por ej-.

Usé el generador que tiene Express para crear el esqueleto base de la aplicación y luego instale ciertos modulos para el manejo de usuarios.

## Porque usar frameworks para el desarrollo, en este caso, web

* Desarrollo rápido: Con Express primero que todo te ahorras la creación de la estructura básica de carpetas y archivos para que funcione, cosa que casi todos los frameworks tiene y ademas este en particular levanta su propio servidor para desarrollo lo que hace aún más comodo porque no se tiene que isntalar un servidor como apache o nginx para empezar a desarrollar.
* Orientado a Objetos: Express con NodeJs esta construidos sobre Javascript y cual nativamente incluye la creación y el manejo de objetos, por ende estos últimos tambien los tienen.
* Buena Documentación: En el sitio oficial de Express existe un link a la [API](http://expressjs.com/es/4x/api.html) del framework muy bien documentada que te ayuda en lo que necesites.
* Gran comunidad: Con respecto a la comunidad, este framework es uno de los más usado por los desarrolladores en NodeJs, si miramos el repositorio en [github](https://github.com/expressjs), veremos que consta con 20.403 estrellas, 4.010 forks y con 183 contribuidores , lo que lo hace una comunidad grande. Además javascript ha sido una de las tecnologias con mayor popularidad en los ultimos año según [stackoverflow](http://stackoverflow.com/research/developer-survey-2015#tech)
* Gran rendimiento: Express y NodeJs basados en javascript funcionan de manera asincrónica lo que por defecto les da un gran rendimiento.
* Fácil de usar: Como se aprecia en la API es fácil de usar.
* Seguridad: En aspectos de seguridad Express se peuden manejar sesiones y cookies de manera muy facil al igual que tiene una rapida y facil integracion con SSL. Ademas se le pueden integrar modulos de encriptado para password y otros usos.
