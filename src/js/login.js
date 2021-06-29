URL = 'http://localhost:3000/usuarios/'
URL_CARTEIRAS = 'http://localhost:3001/carteiras'

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
                VerificaCarteiraPadrao(usuarios[i].id);
                window.localStorage.setItem('id', `${usuarios[i].id}`);

                return usuarios[i].id;
            }
        }
    });
}

function IrParaCadastro(){
    document.location.replace("./cadastro.html");
}

function IrParaApp(){
    document.location.replace("./app.html");
}


async function VerificaCarteiraPadrao(id_usuario) {
    const response = await fetch(`${URL_CARTEIRAS}?usuario=${id_usuario}`);
    const text = await response.text();
    const nova_carteira = JSON.stringify({

        descricao: "Carteira Padrão",
        usuario: id_usuario
    })

    if (text == "[]") {

       await fetch(`${URL_CARTEIRAS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: nova_carteira
        });

        IrParaApp();
    }
    else{
        IrParaApp();
    }

}
