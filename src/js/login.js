URL = 'http://localhost:3000/usuarios'

function logar() {

    var usuario = document.getElementById("usuario");
    var senha = document.getElementById("senha");

    fetch(URL)
    .then(res => res.json())
    .then(usuarios => {
        for (let i = 0; i <= usuarios.length; i++) {
            if ( i == usuarios.length){
                alert("USUÁRIO OU SENHA INVÁLIDOS");
                document.getElementById("usuario").value = ""
                document.getElementById("senha").value = ""
                break

            }

            if(usuarios[i].nome == usuario.value && usuarios[i].senha == senha.value ){
                document.location.replace("./app.html");

                return usuario[i].id;
            }
        }
    });
}


function IrParaCadastro(){
    document.location.replace("./cadastro.html");
}
