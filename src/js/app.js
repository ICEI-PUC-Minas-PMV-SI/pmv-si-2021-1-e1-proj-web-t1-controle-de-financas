URL_Usuarios = 'http://localhost:3000/usuarios'
URL_Carteiras = 'http://localhost:3001/carteiras'
URL_Lancamentos = 'http://localhost:3002/lancamentos'

window.onload = function () {
    listarLancamentos();
}

function listarLancamentos() {

    const lancamentosList = document.getElementById('list-lancamentos');

    fetch(`${URL_Lancamentos}?user_id=${window.localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(lancamentos => {
            let lista_lancamentos = '';
            for (let i = 0; i < lancamentos.length; i++) {
                lista_lancamentos += `
            <tr>
                <th>${lancamentos[i].id}</th>
                <td>${lancamentos[i].descricao}</td>
                <td>R$${(parseFloat(lancamentos[i].valor)).toFixed(2)}</td>
            </tr>
            `;
                lancamentosList.innerHTML = lista_lancamentos;
            }
        });
}

function getlancamento(id) {

    if (id == 0) {
        //console.log("rafa");
        $('#edit-lancamentos-id').text("");
        $("#lancamentos-id").prop("disabled", false);
        $('#lancamentos-descricao').val("");
        $('#lancamentos-vlr').val("");
    } else {
        $('#edit-prod-id').text(id);
        fetch(`${URL_Lancamentos}/${id}`).then(res => res.json())
            .then(data => {
                $("#lancamentos-id").prop("disabled", true);
                $('#lancamentos-id').val(data.id);
                $('#lancamentos-descricao').val(data.descricao);
                $('#lancamentos-vlr').val(data.valor);
            });
    }
}

// Modal Editar Lancamentos

function ModalLancamento() {
    $()
}

//=================================================================================================

// CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM lancamentos

function adicionaLancamento() {

    const lancamentosForm = document.getElementById('lancamentos-form');

    lancamentosForm.addEventListener('submit', (e) => {

        // RECUPERA O ID DO lancamentos
        let id = parseInt($('#edit-prod-id').text());

        // RECUPERA OS DADOS DO lancamentos
        const lancamentos = JSON.stringify({
            id: document.getElementById('lancamentos-id').value,
            descricao: document.getElementById('lancamentos-descricao').value,
            vlr: document.getElementById('lancamentos-vlr').value,
        })

        if (id >= 0) {
            fetch(`${URL_Lancamentos}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: lancamentos
            })
                .then(res => res.json())
                .then(() => location.reload());
        }
        else {
            fetch(URL_Lancamentos, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: lancamentos
            })
                .then(res => res.json())
                .then(() => location.reload());
        }
    })
}
//=================================================================================================

function somaTotal() {
    /*
    fetch(`${URL_Lancamentos}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(function (res) {
        let total = 0;
        document.getElementById('totLancamentoCarteir').innerHTML = ''
        for (let i = 0; i < res.length; i++) {
            if (res[i].tipo === "R") {
                total += res[i].valor;
            } else if (res[i].tipo === "D") {
                total -= res[i].valor
            }
        }
        document.getElementById('totCarteiras').innerHTML = "R$ " + total.toString();
    })
    .then(() => location.reload())
    */
    fetch(`${URL_Lancamentos}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                let lancamentos = response.json();
                let total = 0;
                for (let i = 0; i < lancamentos.length; i++) {
                    if (lancamentos[i].tipo === "R") {
                        total += lancamentos[i].valor;
                    } else if (lancamentos[i].tipo === "D") {
                        total -= lancamentos[i].valor
                    }
                }
                document.getElementById('totCarteiras').innerHTML = "R$ " + total.toString();
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

/*
function somaTotal() {
    let ajax = new XMLHttpRequest();
    ajax.open('GET', 'db.json');
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            let res = JSON.parse(ajax.responseText);
            let lancamentos = res.lancamentos;
            let total = 0;
            for (let i = 0; i < lancamentos.length; i++) {
                if (lancamentos[i].tipo === "R") {
                    total += lancamentos[i].valor;
                } else if (lancamentos[i].tipo === "D") {
                    total -= lancamentos[i].valor
                }
            }
            document.getElementById('totCarteiras').innerHTML = "R$ " + total.toString();
        }
    };
    ajax.send();
}

function somaCarteiras() {
    let ajax = new XMLHttpRequest();
    ajax.open('GET', 'db.json');
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            let res = JSON.parse(ajax.responseText);
            let carteiras = res.carteiras;
            let lancamentos = res.lancamentos;
            document.getElementById('totLancamentoCarteir').innerHTML = ''
            for (let i = 1; i < carteiras.length + 1; i++) {
                let total = 0;
                for (let j = 0; j < lancamentos.length; j++) {
                    if (lancamentos[j].tipo === "R" && lancamentos[j].carteira === i) {
                        total += lancamentos[j].valor;
                    } else if (lancamentos[j].tipo === "D" && lancamentos[j].carteira === i) {
                        total -= lancamentos[j].valor;
                    }
                }
                document.getElementById('totLancamentoCarteir').innerHTML += '<li class="list-group-item"><div class="row row-cols-3"><div class="col-1"><i class="bi bi-wallet2"></i></div><div class="col">Carteira ' + i.toString() + '</div><div class="col">R$ ' + total.toFixed(2).toString() + '</div></div></li>'
            }
        }
    };
    ajax.send();
}

function lerLancamentosPorCarteira() {
    let ajax = new XMLHttpRequest();
    ajax.open('GET', 'db.json');
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            let res = JSON.parse(ajax.responseText);
            let carteiras = res.carteiras;
            let lancamentos = res.lancamentos;
            for (let i = 1; i < carteiras.length + 1; i++) {
                for (let j = 0; j < lancamentos.length; j++) {
                    // Inserir os itens em uma lista para ser exibido os lançamentos
                    if (lancamentos[j].tipo === "R") {
                        document.getElementById(' ').innerHTML += "" //Pinta o texto de verde
                    } else if (lancamentos[j].tipo === "D") {
                        document.getElementById(' ').innerHTML += "" //Pinta o texto de vermelho
                    }
                }
            }
        }
    };
    ajax.send();
}
*/