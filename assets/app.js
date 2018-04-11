strengthNum = document.getElementById('strength').children[1]; // strength.children[1] es un <span>
msgTxt = document.getElementById('msg').children[0]; // msg.children[0] es un <p>
var usedTypeChars = [0,0,0,0];

avalaibleChars = new Array("ABCDEFGHJKLMNOPQRSTUVWXYZ",
					 "abcdefghijkmnopqrstuvwxyz",
					 "0123456789",
					 "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{\|}~");
					 //original: "~!@#$%^&*()_+-=\|[]{};:,./<>?"
typeChars = new Array("may�scula","min�scula","n�mero","s�mbolo");
allowedChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{\|}~";

configParams.addEventListener( 'input', function(){ // "Cuando el usuario modifica el formulario configParams"
	if (parseInt(len.value)<0 || isNaN(parseInt(len.value))){
		error('Debe introducir un n�mero entero positivo en la longitud');
	} else if (!(mayus.checked || minus.checked || nums.checked || syms.checked)) {
		error('Debe seleccionar al menos un conjunto de caracteres');
	} else {
		checkPassword();
		resetAll();
	}
});

btnGen.addEventListener('click', function genPasswd() {
	chosenChars = new String();
	passwd = new String();
	// se establece el conjunto de caracteres para la contrase�a
	// usando el *operador ternario* para mejor legibilidad del c�digo
	chosenChars = ((mayus.checked) ? avalaibleChars[0] : '') +
				((minus.checked) ? avalaibleChars[1] : '') +
				((nums.checked) ? avalaibleChars[2] : '') +
				((syms.checked) ? avalaibleChars[3] : '');
	for (i = 0; i < len.value; i++) {
	   passwd += chosenChars.charAt(Math.floor(Math.random()*chosenChars.length));
	}

	pswd.value = passwd; // se muestra la contrase�a generada en el elemento html

	checkPassword();
	testPassword();
});

btnRst.addEventListener('click', function(){
	configParams.reset();
	len.value='10';
	secmsg.style.display='none';
	resetAll();
});

pswd.addEventListener('input', function(e){ // "Cuando el usuario modifica el campo pswd"
	for (i=0; i<pswd.value.length; i++) {
		//TODO: se comprueba si se han usado caracteres no permitidos
		if (allowedChars.indexOf(pswd.value[i].toString())) {
			warning('Se ha eliminado el caracter '+pswd.value[i]+' porque no pertenece al rango de caracteres permitidos');
			pswd.value[i] = '';
		}
		checkPassword();
		testPassword();
	}
});

function resetAll() {
	msg.style.color = 'black';
	msgTxt.textContent = '';
	pswd.value = 'p4s5-w0Rd';
	strengthBar.value = 0;
	strengthNum.textContent = '0%';
	points = 0;
}

function checkPassword() {

	pw = pswd.value;
	usedTypeChars = [0,0,0,0];

	// "En cuanto a la longitud:"
	if (pw.length < 11) {
		if (pw.length <= 5) {
			warning('Una contrase�a de longitud mayor que 5 ser�a m�s segura...');
		} else {
			warning('Una contrase�a de longitud mayor que 10 ser�a m�s segura...');
		}
	}

	// "En cuanto al resto de campos"
	for (i=0; i<pw.length; i++) {

		// recorremos la contrase�a pw caracter a caracter
		for (j=0; j<usedTypeChars.length; j++) { // iteramos entre los 4 conjuntos de caracteres
			if (avalaibleChars[j].indexOf(pw[i]).toString()!=-1) { // si el caracter actual est� en el conjunto actual
				usedTypeChars[j]+=1; // sumar 1 al n�mero de caracteres usados de ese conjunto
			}
		}
	}

	for (j=0; j<usedTypeChars.length; j++) { // iteramos entre los 4 conjuntos de caracteres
		if (usedTypeChars[j]<1) {
			warning('Una contrase�a con 2 '+typeChars[j]+'s m�s ser�a m�s segura...');
		} else if (usedTypeChars[j]<2) {
			warning('Una contrase�a con 1 '+typeChars[j]+' m�s ser�a m�s segura');
		}
	}

	if (usedTypeChars[0]>=2 && usedTypeChars[1]>=2 && usedTypeChars[2]>=2 && usedTypeChars[3]>=2) {
		warning('Buena contrase�a!');
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
									// Seg�n la longitud:
	for (j=0; j<usedTypeChars.length; j++) {
		if (usedTypeChars[j]>=1) {			// - Si hay 1 caracter de ese tipo, 10 puntos
			points+=10;
			if (usedTypeChars[j]>=2) {		// - Si hay 2 o m�s de ese tipo, 10 puntos extra
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
	// - verde, si la fortaleza suma m�s de 75 puntos

	strengthBar.value = points;
	strengthNum.textContent = points+'%';
}

function warning(m) {
	//TODO: a�adir m a lo que ya estaba en msgTxt
	secmsg.style.display='block';
	msg.style.color = 'black';
	msgTxt.textContent = m;
}

function error(m) {
	secmsg.style.display='block';
	msg.style.color = 'red';
	msgTxt.textContent = m;
}