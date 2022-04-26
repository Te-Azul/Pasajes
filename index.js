const btnResultado = document.querySelector(".btnCalcular");

btnResultado.addEventListener("click", realizarPasaje, false);


function realizarPasaje(){
    inputNumero = document.querySelector(".form__digitos").value.replace(" ","");
    inputBaseInicial = document.querySelector(".form__baseInicial").value;
    inputBaseFinal = document.querySelector(".form__baseFinal").value;
    divResultado = document.querySelector(".resultado-container");
    resultadoDecimal = enumerar(inputNumero,inputBaseInicial);
    numeroDecimal = String(resultadoDecimal.resultado).split(".");
    parteEntera = divisionesSucesivas(Number(numeroDecimal[0]), Number(inputBaseFinal));
    parteFraccionaria = 

    divResultado.innerHTML = `
    <u>Primero lo paso a decimal</u>: <br><br>
    N = ${resultadoDecimal.texto} <br><br>
    N = ${resultadoDecimal.resuelto} = <b>${Number(resultadoDecimal.resultado)}</b><p class="base_style">(10)</p> <br><br>
    <u>Ahora aplicamos el metodo de divisiones sucesivas</u>: <br><br>
    `;
    graficarDivisiones(parteEntera, divResultado);
    let resultadoParteEntera = ordenarRestos(parteEntera);
    divResultado.innerHTML += `
    <br><br>
    Resultado: ${resultadoParteEntera}<p class="base_style">(${inputBaseFinal})</p><br><br>
    ${numeroDecimal[1] == undefined ? "" : "<u>Ahora aplicaremos el metodo de multiplicaciones sucesivas</u>: <br><br>"}
    `;
}

function enumerar(inputNumero, inputBaseInicial) {
    let text = "";
    let resuelto = "";
    let total = 0;
    numero = inputNumero.split(",");
    const tamanioDecimal = numero[0].length;
    for(let i = 0; i != tamanioDecimal; i++ ){
        let cuenta = traducirANumero(numero[0][i]) * inputBaseInicial**(tamanioDecimal - i - 1);
        total += cuenta;
        // text += `(${numero[0][i]} * ${inputBaseInicial}^${tamanioDecimal - i - 1}) ${ i != tamanioDecimal -1 ? "+" : ""} `;
        text += `(${numero[0][i]} * ${inputBaseInicial}<p class="potencia_style">${tamanioDecimal - i - 1}</p>)${ i != tamanioDecimal -1 ? "+" : ""} `;
        resuelto += `${cuenta} ${ i != tamanioDecimal -1 ? "+" : ""} `
    }

    if(numero[1]){
        let mayorPosicion = 1;
        let fraccion = 0;
        const tamanioFraccion = numero[1].length;
        for(let i = 0; i != tamanioFraccion; i++){
            let cuenta = traducirANumero(numero[1][i]) * inputBaseInicial**(-i -1);
            fraccion += Number(cuenta);
            text += ` + (${numero[1][i]} * ${inputBaseInicial}^${-i - 1})`;
            mayorPosicion = String(cuenta).length -2 > mayorPosicion ? String(cuenta).length -1 : mayorPosicion;
            resuelto += ` + ${cuenta}`;
        }
        total += Number(fraccion.toFixed(mayorPosicion));
    }
    return {texto: text, resuelto: resuelto, resultado: total};
}


function traducirANumero(caracter){
    if((new RegExp('[0-9]')).test(caracter)){
        return Number(caracter);
    }
    let char = caracter.toUpperCase()
    if((new RegExp('[A-J]')).test(char)){
        switch(char){
            case 'A':
                return 10;
            case 'B':
                return 11;
            case 'C':
                return 12;
            case 'D':
                return 13;
            case 'E':
                return 14;
            case 'F':
                return 15;
            case 'G':
                return 16;
            case 'H':
                return 17;
            case 'I':
                return 18;
            case 'J':
                return 19;
        }
    }
};

function divisionesSucesivas(numero, divisor){
    let dividendos = [numero]
    let restos = [];
    while(dividendos.every(num => {return num != 0})){
        let cociente = Math.trunc(numero/divisor);
        restos.push(numero%divisor);
        numero = cociente;
        dividendos.push(numero);
    }
    console.log(restos);
    console.log(dividendos);
    return{
        restos: restos,
        dividendos: dividendos,
        base: divisor
    };
}

function graficarDivisiones(objecto, elemento){
    elemento.innerHTML += `
        <div class="divisiones-container">
            ${printDiv(objecto)}
        </div>
    `;

}

function printDiv(objeto){
    let texto = ``;
    let tamanio = objeto.dividendos.length;
    for(let i = 0; i != tamanio; i++){
        texto += `<div class="divisor-container${i}"><div class="dividendo"><p class="dividendo__num">${objeto.dividendos[i]}</p><p class="dividendo__resto">${i != tamanio - 1? objeto.restos[i] : ""}</p></div> ${(i != tamanio - 1) ? `<div class="base">${objeto.base}</div><br>` : `<br>`}</div>`;
        texto += `
            <style>
                .divisor-container${i}{
                    padding-left: ${50*i}px;
                }
            </style>
        `;
    }
    return texto;
}

function ordenarRestos(objeto){
    let resultado = "";
    const tamanio = objeto.restos.length;
    for(let i = 0; i != tamanio; i++){
        resultado += numeroASimbolo(objeto.restos.pop()); 
    }
    return resultado;
    
}

function numeroASimbolo(numero){
    if(numero >= 0 && numero < 10) return numero;
    switch(numero){
        case 10:
            return 'A';
        case 11:
            return 'B';
        case 12:
            return 'C';
        case 13:
            return 'D';
        case 14:
            return 'E';
        case 15:
            return 'F';
        case 16:
            return 'G';
        case 17:
            return 'H';
        case 18:
            return 'I';
        case 19:
            return 'J';
    }
}