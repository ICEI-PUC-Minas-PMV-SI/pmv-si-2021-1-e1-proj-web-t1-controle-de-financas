URL_Usuarios =  "http://localhost:3000/usuarios"
URL_Carteiras = 'http://localhost:3001/carteiras'



function IrParaLogin(){
    document.location.replace("./login.html");
}


function AdicionaUsuario() {

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmar_senha = document.getElementById("confirmar_senha");
    const telefone = document.getElementById("telefone");

    console.log(nome.value);
    console.log(email.value);
    console.log(senha.value);
    console.log(confirmar_senha.value);
    console.log(telefone.value);

    if (senha.value == confirmar_senha.value){

        const usuario_existente = ValidaNome(nome.value);
        console.log(usuario_existente);

        console.log(`${usuario_existente} pinvall`);

        if (usuario_existente == true) {
            alert("NOME DE USUÁRIO JÄ EXISTE");
        }


        const novo_usuario = JSON.stringify({

            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
            confirmar_senha: document.getElementById("confirmar_senha").value,
            telefone: document.getElementById("telefone").value
        })

        fetch(`${URL_Usuarios}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: novo_usuario
        })

        window.localStorage.setItem('new_user', novo_usuario);
        alert("USUÁRIO CADASTRADO COM SUCESSO!");
        AdicionaCarteiraPadrao()
    }
    else {
        alert("AS SENHAS NÃO BATEM")
    }
}


function AdicionaCarteiraPadrao() {

    fetch(`${URL_Carteiras}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {

        }
    })

}

function ValidaNome(nome) {

    const response = fetch(`${URL_Usuarios}?nome=${nome}`)

    response.ok;     // => false
    response.status; // => 404

    const text = response.text();
    console.log(text)
    return text;
}



