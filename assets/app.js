strengthNum = document.getElementById('strength').children[1]; // strength.children[1] es un <span>
msgTxt = document.getElementById('msg').children[0]; // msg.children[0] es un <p>
var usedTypeChars = [0,0,0,0];

avalaibleChars = new Array("ABCDEFGHJKLMNOPQRSTUVWXYZ",
					 "abcdefghijkmnopqrstuvwxyz",
					 "0123456789",
					 "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{\|}~");
typeChars = new Array("mayúscula","minúscula","número","símbolo");
allowedChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{\|}~";

configParams.addEventListener( 'input', function(){ // "Cuando el usuario modifica el formulario configParams"
	if (parseInt(len.value)<0 || isNaN(parseInt(len.value))){
		error('Debe introducir un número entero positivo en la longitud');
	} else if (!(mayus.checked || minus.checked || nums.checked || syms.checked)) {
		error('Debe seleccionar al menos un conjunto de caracteres');
	} else {
		checkPassword();
		resetAll();
	}
});

btnGen.addEventListener('click', function genPasswd() {
	msgTxt.textContent = '';
	chosenChars = new String();
	passwd = new String();
	// se establece el conjunto de caracteres para la contraseña
	// usando el *operador ternario* para mejor legibilidad del código
	chosenChars = ((mayus.checked) ? avalaibleChars[0] : '') +
				((minus.checked) ? avalaibleChars[1] : '') +
				((nums.checked) ? avalaibleChars[2] : '') +
				((syms.checked) ? avalaibleChars[3] : '');
	for (i = 0; i < len.value; i++) {
	   passwd += chosenChars.charAt(Math.floor(Math.random()*chosenChars.length));
	}

	pswd.value = passwd; // se muestra la contraseña generada en el elemento html

	checkPassword();
	testPassword();
});

btnRst.addEventListener('click', function(){
	configParams.reset();
	secmsg.style.display='none';
	resetAll();
});

pswd.addEventListener('input', function(e){ // "Cuando el usuario modifica el campo pswd"
	msgTxt.textContent = '';
	for (i=0; i<pswd.value.length; i++) {
		if (allowedChars.indexOf(pswd.value[i].toString())==-1) {
			warning('Se ha eliminado el caracter "'+pswd.value[i]+'" porque no pertenece al rango de caracteres permitidos');
			pswd.value = pswd.value.replace(pswd.value[i],'');
		}
		checkPassword();
		testPassword();
	}
});

function resetAll() {
	msg.style.color = 'black';
	msgTxt.textContent = '';
	pswd.value = '';
	strengthBar.value = 0;
	strengthNum.textContent = '0%';
}

function checkPassword() {

	pw = pswd.value;
	usedTypeChars = [0,0,0,0];

	// "En cuanto a la longitud:"
	if (pw.length < 11) {
		if (pw.length <= 5) {
			warning('Una contraseña de longitud mayor que 5 sería más segura...');
		} else {
			warning('Una contraseña de longitud mayor que 10 sería más segura...');
		}
	}

	// "En cuanto al resto de campos"
	for (i=0; i<pw.length; i++) {

		// recorremos la contraseña pw caracter a caracter
		for (j=0; j<usedTypeChars.length; j++) { // iteramos entre los 4 conjuntos de caracteres
			if (avalaibleChars[j].indexOf(pw[i]).toString()!=-1) { // si el caracter actual está en el conjunto actual
				usedTypeChars[j]+=1; // sumar 1 al número de caracteres usados de ese conjunto
			}
		}
	}

	for (j=0; j<usedTypeChars.length; j++) { // iteramos entre los 4 conjuntos de caracteres
		if (usedTypeChars[j]<1) {
			warning('Una contraseña con 2 '+typeChars[j]+'s más sería más segura...');
		} else if (usedTypeChars[j]<2) {
			warning('Una contraseña con 1 '+typeChars[j]+' más sería más segura');
		}
	}

	if (usedTypeChars[0]>=2 && usedTypeChars[1]>=2 && usedTypeChars[2]>=2 && usedTypeChars[3]>=2) {
		warning('Buena contraseña!');
	}
}

function testPassword(passwd) {

	pw = pswd.value;
	var points = 0;
										// "En detalle, la fortaleza se calcula de la siguiente manera:
										// Para cada tipo:
	if (pw.length >= 6) {						// - Si es mayor o igual que 6 caracteres, 10 puntos.
		points += 10;
		if (pw.length >= 11) {					// - Si es mayor o igual que 11 caracteres, 10 puntos extra
			points += 10;
		}
	}
									// Según la longitud:
	for (j=0; j<usedTypeChars.length; j++) {
		if (usedTypeChars[j]>=1) {			// - Si hay 1 caracter de ese tipo, 10 puntos
			points+=10;
			if (usedTypeChars[j]>=2) {		// - Si hay 2 o más de ese tipo, 10 puntos extra
				points+=10;
			}
		}
	}

	if (points>=25) {
		strengthBar.className = 'yellowBar';
		if (points>=75) {
			strengthBar.className = 'greenBar';
		}
	} else {
		strengthBar.className = 'redBar';
	}
	// - rojo, si la fortaleza suma menos de 25 puntos
	// - amarillo, si la fortaleza suma entre 25 y 75 puntos
	// - verde, si la fortaleza suma más de 75 puntos

	strengthBar.value = points;
	strengthNum.textContent = points+'%';
}

function warning(m) {
	secmsg.style.display='block';
	msg.style.color = 'black';
	var text = document.createTextNode(m);
	var br = document.createElement("br");
	msgTxt.appendChild(text);
	msgTxt.appendChild(br);
}

function error(m) {
	secmsg.style.display='block';
	msg.style.color = 'red';
	msgTxt.textContent = m;
}