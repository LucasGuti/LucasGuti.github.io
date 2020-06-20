function revisar(input) {
    if (input.value == "") {
        input.className = "form-control is-invalid";
        return false;
    } else {
        input.className = "form-control is-valid";
        return true;
    }
}

function revisarMail(input) {
    // variables que contendrá el formato a validar
    let expresion = /\w+@\w+\.[a-z]/;

    if (input.value != "") {
        //aqui voy a validar el formato del mail
        console.log(expresion.test(input.value))
        console.log(expresion.test(input))

        if (expresion.test(input.value)) {
            input.className = "form-control is-valid";
            return true;
        } else {
            input.className = "form-control is-invalid";
            return false;
        }
    } else {
        input.className = "form-control is-invalid";
        return false
    }
}

function revisarLongitud(input) {
    if (input.value != "" && input.value.length >= 10) {
        input.className = "form-control is-valid"
        return true;
    } else {
        input.className = "form-control is-invalid"
        return false;
    }
}

function validar(event) {
    event.preventDefault();
    console.log("dentro de la funcion validar");

    if (revisar(document.getElementById("nombre")) &&
        revisarMail(document.getElementById("mail")) &&
        revisarLongitud(document.getElementById("consulta"))
    ) {
        enviarMail();
    } else {
        alert("envio fallido");
    }
}

function enviarMail() {
    console.log("enviar mail");

    let template_params = {
        "from_name": document.getElementById("nombre").value,
        "to_name": "Lucas",
        "message_html": `${document.getElementById("consulta").value} - 
        Email: ${document.getElementById("mail").value}`
    }

    let service_id = "default_service";
    let template_id = "curriculum";
    emailjs.send(service_id, template_id, template_params).then(function (response) {
        console.log("Si todo esta bien", response);
        document.getElementById("success").className = "alert alert-success mt-4";
        document.getElementById("success").innerText = "Consulta enviada correctamente";
    },
        function (error) {
            console.log("Si todo esta mal", error);
            document.getElementById("success").className = "alert alert-danger mt-4";
            document.getElementById("success").innerText = "Algo salio mal :c";
        }

    )
}