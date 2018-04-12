# PassGen

Generador de contraseñas para la asignatura "Servicios Web: Cliente".

Disponible en [https://jartigag.github.io/PassGen](https://jartigag.github.io/PassGen)

> "El proyecto dirigido consiste en implementar una interfaz que permita **generar contraseñas** 
> basándonos en ciertos parámetros, así como **medir la fortaleza** de una contraseña
> creada por el usuario. Como no vamos a hacer uso de ningún servidor, 
> nos centraremos en las capacidades front-end de la solución."

## Memoria del Proyecto Dirigido (extracto)

- Describe el estilo de la programación:

Para todos los elementos con id, clases, selectores, variables y funciones se han utilizado nombres cortos o abreviados, descriptivos y se ha seguido la regla de capitalización "camelCase". Los elementos más repetidos se guardan con nombres abreviados, como `strengthNum = document.getElementById('strength').children[1]; // strength.children[1]es un <span>`.  
El código se ha simplificado al máximo, utilizando bucles cuando era posible o el operador ternario para favorecer la legibilidad:
```
chosenChars = (mayus.checked) ? availableChars[0] : '' // equivale a
// chosenChars IGUAL A: SI mayus.checked ENTONCES availableChars[0] SI NO ''
```
Se ha procurado que el código Javascript sea fácil de seguir y autoexplicativo. Aun así, se incluyen comentarios frecuentemente, tanto para indicar en qué parte del enunciado se especificaba la función que se está implementando como para ayudar a entender el objetivo de algunas líneas determinadas.

## Verificaciones

- Todo el código HTML pasa la verificación [http://validator.w3.org/](http://validator.w3.org/)
- Todo el código CSS pasa la verificación [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/)
- Todo el código Javascript pasa la verificación [http://esprima.org/demo/validate.html](http://esprima.org/demo/validate.html)
