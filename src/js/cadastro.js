URL_Usuarios =  "http://localhost:3000/usuarios"
URL_Carteiras = 'http://localhost:3001/carteiras'



function IrParaLogin(){
    document.location.replace("./login.html");
}


async function AdicionaUsuario() {

    const nome = document.getElementById("nome");
    const sobrenome = document.getElementById("sobrenome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmar_senha = document.getElementById("confirmar_senha");
    const telefone = document.getElementById("telefone");

    if (senha.value == confirmar_senha.value){

        const usuario_existente = await ValidaNome(nome.value);
        console.log(usuario_existente);

        if (usuario_existente != "[]") {
            alert("NOME DE USUÁRIO JÁ  EXISTE");
            return false;
        }

        const novo_usuario = JSON.stringify({

            nome: document.getElementById("nome").value,
            sobrenome: document.getElementById("sobrenome").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
            //confirmar_senha: document.getElementById("confirmar_senha").value,
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

async function ValidaNome(nome) {

    const response = await fetch(`${URL_Usuarios}?nome=${nome}`)
    const text = await response.text();
    console.log(text)
    return text;
}
