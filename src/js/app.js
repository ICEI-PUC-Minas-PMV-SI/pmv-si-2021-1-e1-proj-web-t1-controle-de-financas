URL_Usuarios = 'http://localhost:3000/usuarios'
URL_Carteiras = 'http://localhost:3001/carteiras'
URL_Lancamentos = 'http://localhost:3002/lancamentos'

window.onload = function () {
    usuarioLogado();
    listarLancamentos();
    somaTotal();
    somaCarteiras();
    preencherPerfil();
    listaCarteirasModal();
}

function usuarioLogado() {
    fetch(`${URL_Usuarios}/${window.localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    document.getElementById('navBtn1').innerHTML = response.nome;
                    document.getElementById('navBtn1').setAttribute("data-toggle", "modal")
                    document.getElementById('navBtn1').setAttribute("data-target", "#perfil-modal")
                    document.getElementById('navBtn2').innerHTML = "Sair";
                    document.getElementById('navBtn2').setAttribute("href", "login.html")
                })
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function listarLancamentos() {

    const lancamentosList = document.getElementById('list-lancamentos');

    fetch(`${URL_Lancamentos}?usuario=${window.localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(lancamentos => {
            let lista_lancamentos = '';
            for (let i = 0; i < lancamentos.length; i++) {
                /*
                lista_lancamentos += `
            <tr>
                <th>${lancamentos[i].id}</th>
                <td>${lancamentos[i].descricao}</td>
                <td>R$${(parseFloat(lancamentos[i].valor)).toFixed(2)}</td>
            </tr>
            `;
            */
                lista_lancamentos += `
            <tr data-value=${lancamentos[i].id}'> 
                <th>${lancamentos[i].tipo === "R" ? "Receita" : "Despesa"}</th>
                <td>${lancamentos[i].descricao}</td>
                <td>R$${(parseFloat(lancamentos[i].valor)).toFixed(2)}</td>
                <td class="bi bi-pencil" data-toggle="modal" data-target="#lancamento-${lancamentos[i].tipo === "R" ? "receita" : "despesa"}-modal"> </td>
                <td class="bi bi-x-lg" onclick="excluiLancamento(${lancamentos[i].id})"> </td>
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

function preencherPerfil() {
    fetch(`${URL_Usuarios}/${window.localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    document.getElementById('perfil-nome').value = response.nome;
                    document.getElementById('perfil-sobrenome').value = response.sobrenome;
                    document.getElementById('perfil-telefone').value = response.telefone;
                    document.getElementById('perfil-email').value = response.email;
                })
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function alterarPerfil() {
    let perfil = JSON.stringify({
        nome: document.getElementById('perfil-nome').value,
        sobrenome: document.getElementById('perfil-sobrenome').value,
        telefone: document.getElementById('perfil-telefone').value,
        email: document.getElementById('perfil-email')
    });

    fetch(`${URL_Lancamentos}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: perfil
    })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function listaCarteirasModal() {
    fetch(`${URL_Carteiras}?usuario=${window.localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    document.getElementById('receita-modal-carteiras').innerHTML = '';
                    document.getElementById('despesa-modal-carteiras').innerHTML = '';
                    document.getElementById('transferencia-modal-carteira-origem').innerHTML = '';
                    document.getElementById('transferencia-modal-carteira-destino').innerHTML = '';
                    for (let i = 0; i < response.length; i++) {
                        document.getElementById('receita-modal-carteiras').innerHTML += `<option value='${response[i].id}'>${response[i].descricao}</option>`;
                        document.getElementById('despesa-modal-carteiras').innerHTML += `<option value='${response[i].id}'>${response[i].descricao}</option>`;
                        document.getElementById('transferencia-modal-carteira-origem').innerHTML += `<option value='${response[i].id}'>${response[i].descricao}</option>`;
                        document.getElementById('transferencia-modal-carteira-destino').innerHTML += `<option value='${response[i].id}'>${response[i].descricao}</option>`;
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
                    if (total >= 0) {
                        //Pinta de verde
                        document.getElementById('totCarteiras').innerHTML = "<div style='color: green;'>" + "R$ " + total.toFixed(2).toString() + "</div>";
                    } else {
                        //Pinta de vermelho
                        document.getElementById('totCarteiras').innerHTML = "<div style='color: red;'>" + "R$ " + total.toFixed(2).toString() + "</div>";
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
                        if (total >= 0) {
                            //Pintar de verde
                            document.getElementById('totLancamentoCarteir').innerHTML += '<li class="list-group-item"><div class="row row-cols-3"><div class="col-1"><i class="bi bi-wallet2"></i></div><div class="col">Carteira ' + i.toString() + '</div><div class="col" style="color: green;">R$ ' + total.toFixed(2).toString() + '</div></div></li>'
                        } else {
                            //Pintar de vermelho
                            document.getElementById('totLancamentoCarteir').innerHTML += '<li class="list-group-item"><div class="row row-cols-3"><div class="col-1"><i class="bi bi-wallet2"></i></div><div class="col">Carteira ' + i.toString() + '</div><div class="col" style="color: red;">R$ ' + total.toFixed(2).toString() + '</div></div></li>'
                        }
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

// Modal Editar Lancamentos

function ModalLancamento() {
    $()
}

function adicionaReceita() {
    let receita = JSON.stringify({
        tipo: "R",
        usuario: parseInt(window.localStorage.getItem('id')),
        carteira: parseInt(document.getElementById("receita-modal-carteiras").value),
        valor: parseFloat(document.getElementById("lancamento-receita-valor").value),
        descricao: document.getElementById("lancamento-receita-descricao").value,
        dtlanc: document.getElementById("lancamento-receita-data").value
    });

    fetch(`${URL_Lancamentos}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: receita
    })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

    somaCarteiras();
    somaTotal();
}

function adicionaDespesa() {
    let despesa = JSON.stringify({
        tipo: "D",
        usuario: parseInt(window.localStorage.getItem('id')),
        carteira: parseInt(document.getElementById("despesa-modal-carteiras").value),
        valor: parseFloat(document.getElementById("lancamento-despesa-valor").value),
        descricao: document.getElementById("lancamento-despesa-descricao").value,
        dtlanc: document.getElementById("lancamento-despesa-data").value
    });

    fetch(`${URL_Lancamentos}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: despesa
    })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

    somaCarteiras();
    somaTotal();
}

function adicionaTransferencia() {
    let despesa = JSON.stringify({
        tipo: "D",
        usuario: parseInt(window.localStorage.getItem('id')),
        carteira: parseInt(document.getElementById("transferencia-modal-carteira-origem").value),
        valor: parseFloat(document.getElementById("lancamento-transferencia-valor").value),
        descricao: document.getElementById("lancamento-transferencia-descricao").value,
        dtlanc: document.getElementById("lancamento-transferencia-data").value
    });

    fetch(`${URL_Lancamentos}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: despesa
    })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

    let receita = JSON.stringify({
        tipo: "R",
        usuario: parseInt(window.localStorage.getItem('id')),
        carteira: parseInt(document.getElementById("transferencia-modal-carteira-destino").value),
        valor: parseFloat(document.getElementById("lancamento-transferencia-valor").value),
        descricao: document.getElementById("lancamento-transferencia-descricao").value,
        dtlanc: document.getElementById("lancamento-transferencia-data").value
    });

    fetch(`${URL_Lancamentos}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: receita
    })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

    somaCarteiras();
    somaTotal();
}

function alteraLancamento(id) {
    let receita = JSON.stringify({
        carteira: document.getElementById("transferencia-modal-carteira-destino").value,
        valor: document.getElementById("lancamento-transferencia-valor").value,
        descricao: document.getElementById("lancamento-transferencia-descricao").value,
        dtlanc: document.getElementById("lancamento-transferencia-data").value
    });

    fetch(`${URL_Lancamentos}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: lancamento
    })
    .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });

    somaCarteiras();
    somaTotal();
}

function excluiLancamento(id) {
    fetch(`${URL_Lancamentos}/${id}`, {
        method: 'DELETE'
    })
    .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });

    somaCarteiras();
    somaTotal();
}
