URL_Usuarios = 'http://localhost:3000/usuarios'
URL_Carteiras = 'http://localhost:3001/carteiras'
URL_Lancamentos = 'http://localhost:3002/lancamentos'

window.onload = function () {
    listarLancamentos();
    somaTotal();
    somaCarteiras();
}

function listarLancamentos() {

    const lancamentosList = document.getElementById('list-lancamentos');

    fetch(`${URL_Lancamentos}?usuario=${window.localStorage.getItem('id')}`)
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
    //fetch(`${URL_Lancamentos}`)
    fetch(`${URL_Lancamentos}?usuario=${window.localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    let lancamentos = response;
                    let total = 0;
                    document.getElementById('totCarteiras').innerHTML = ''
                    for (let i = 0; i < lancamentos.length; i++) {
                        if (lancamentos[i].tipo === "R") {
                            total += lancamentos[i].valor;
                        } else if (lancamentos[i].tipo === "D") {
                            total -= lancamentos[i].valor
                        }
                    }
                    document.getElementById('totCarteiras').innerHTML = "R$ " + total.toString();
                });

            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function somaCarteiras() {
    let carteiras;
    let lancamentos;
    fetch(`${URL_Carteiras}?usuario=${window.localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    carteiras = response;
                });

            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    fetch(`${URL_Lancamentos}?usuario=${window.localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    lancamentos = response;
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
                });
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}