function restar() {
    var oldtax = document.getElementById("taxPaid").value;
    var used = document.getElementById("taxUsed").value;
    var formato = /[0-9]{1,5}[.][0-9]{1,2}[A-Z0-9]{2}/g;
    oldtax = oldtax.replace(/-/g, "");
    used = used.replace(/-/g, "");
    var oldtax_arr = oldtax.match(formato);
    var used_arr = used.match(formato);
    var resultado = "";
    var deduct = "yes";
    var total = 0;
    var a = 0;
    var b = 0;
    var failed = 0;
    if (oldtax_arr != null && used_arr != null) {
        for (var i = 0; i < oldtax_arr.length; i++) {
            for (var j = 0; j < used_arr.length; j++) {
                //here it just test if the 2 letters after the amount are the same to check if it is the same tax
                if (oldtax_arr[i].substring(oldtax_arr[i].length - 2, oldtax_arr[i].length) == used_arr[j].substring(used_arr[j].length - 2, used_arr[j].length)) {
                    deduct = j;
                }
            }
            if (deduct != "yes") {
                a = parseFloat(oldtax_arr[i].substring(0, oldtax_arr[i].length - 2));
                b = parseFloat(used_arr[deduct].substring(0, used_arr[deduct].length - 2));
                if ((parseFloat(a) - parseFloat(b)) > 0) {
                    //if same tax then deducts the used from the total paid for it(only if diff is not negative or 0)
                    resultado = resultado + " " + Math.abs(parseFloat(oldtax_arr[i].substring(0, oldtax_arr[i].length - 2)) - parseFloat(used_arr[deduct].substring(0, used_arr[deduct].length - 2))).toFixed(2) + "" + oldtax_arr[i].substring(oldtax_arr[i].length - 2, oldtax_arr[i].length);
                    total = total + (parseFloat(a) - parseFloat(b));
                    deduct = "yes";
                } else if ((parseFloat(a) - parseFloat(b)) < 0) {
                    //display alert if the used amount is higher than the paid one
                    alert("The tax " + oldtax_arr[i].substring(oldtax_arr[i].length - 2, oldtax_arr[i].length) + " is higher to deduct than paid");
                    failed++;
                    deduct = "yes";
                }
                a, b = 0;
            } else {
                //if not just adds the tax as it is
                resultado = resultado + " " + oldtax_arr[i];
                a = parseFloat(oldtax_arr[i].substring(0, oldtax_arr[i].length - 2));
                total = total + (parseFloat(a));
                a = 0;
            }
        }
        if (failed == 0) {
            document.getElementById("taxRemaining").innerHTML = resultado;
            document.getElementById("finalResult").innerHTML = Math.abs(total).toFixed(2);
            document.getElementById("salida").removeAttribute("hidden");
        }
    }
}
