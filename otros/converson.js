document.getElementById("convertButton").addEventListener("click",function(){
    var decimalValue = document.getElementById("decimalInput").value;
    var baseValue = document.getElementById("baseInput").value;

    if(decimalValue === "" || baseValue ===""){
        alert("por favor ingrese un numero decimal y una base.");
        return;
    }
    decimalValue = parseInt(decimalValue);
    baseValue = parseInt(baseValue);

    if(baseValue < 2 || baseValue >36){
        alert("La base debe estar entre 2 y 36");
        return;
    } 
    var result = convertirBase(decimalValue,baseValue);

    document.getElementById("resultLabel").textContent = result;
});
function convertirBase( decimal,base){
    var resultado = "";
    var digitos = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    while(decimal > 0){
        var residuo = decimal % base;
        resultado = digitos[residuo] + resultado;
        decimal = (decimal - residuo) / base;
    }
    return resultado === "" ? "0" : resultado
}