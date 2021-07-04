URL_Usuarios = 'http://localhost:3000/usuarios'
URL_Carteiras = 'http://localhost:3001/carteiras'
URL_Lancamentos = 'http://localhost:3002/lancamentos'

window.onload = function () {
    usuarioLogado();
    dataAtual();
    listaCarteirasLancamentos();
    //listarLancamentos();
    listarLancamentosFiltro();
    somaTotal();
    somaCarteiras();
    preencherPerfil();
    listaCarteirasModal();
    preencherGrafico();
}

function formatarData(data) {
    const [yy, mm, dd] = data.split(/-/g);
    return `${dd}/${mm}/${yy}`;
}

function dataAtual() {
    document.getElementById('select-lancamentos-meses').value = new Date().getMonth() + 1;
    document.getElementById('select-lancamentos-anos').value = new Date().getFullYear();
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

    fetch(`${URL_Lancamentos}?_sort=dtlanc&_order=asc&usuario=${window.localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(lancamentos => {
            for (let i = 0; i < lancamentos.length; i++) {
                document.getElementById('list-lancamentos').innerHTML += `
            <tr data-value=${lancamentos[i].id}'>
                <th style="color: ${lancamentos[i].tipo === "R" ? "green" : "red"};">${lancamentos[i].tipo === "R" ? "Receita" : "Despesa"}</th>
                <td>${lancamentos[i].descricao}</td>
                <td>${lancamentos[i].categoria}</td>
                <td>${formatarData(lancamentos[i].dtlanc)}</td>
                <td style="color: ${lancamentos[i].tipo === "R" ? "green" : "red"};">R$ ${(parseFloat(lancamentos[i].valor)).toFixed(2)}</td>                
                <td class="bi bi-pencil" onclick="preencheAlteracao${lancamentos[i].tipo === "R" ? "Receita" : "Despesa"}(${lancamentos[i].id})" data-toggle="modal" data-target="#alteracao-${lancamentos[i].tipo === "R" ? "receita" : "despesa"}-modal"> </td>
                <td class="bi bi-x-lg" onclick="checkExcluirLancamento(${lancamentos[i].id})"> </td>
            </tr>
            `;
            }
        });
}

function listarLancamentosFiltro() {

    var carteira = document.getElementById('select-lancamentos-carteiras').value;
    var primeiroDia = new Date(document.getElementById('select-lancamentos-anos').value, document.getElementById('select-lancamentos-meses').value - 1, 1).toISOString().split('T')[0];
    var ultimoDia = new Date(document.getElementById('select-lancamentos-anos').value, document.getElementById('select-lancamentos-meses').value, 0).toISOString().split('T')[0];

    document.getElementById('list-lancamentos').innerHTML = '';

    fetch(`${URL_Lancamentos}?_sort=dtlanc&_order=asc${carteira === "0" ? "" : "&carteira=" + carteira}&dtlanc_gte=${primeiroDia}&dtlanc_lte=${ultimoDia}&usuario=${window.localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(lancamentos => {
            for (let i = 0; i < lancamentos.length; i++) {
                document.getElementById('list-lancamentos').innerHTML += `
                <tr data-value=${lancamentos[i].id}'>
                    <th style="color: ${lancamentos[i].tipo === "R" ? "green" : "red"};">${lancamentos[i].tipo === "R" ? "Receita" : "Despesa"}</th>
                    <td>${lancamentos[i].descricao}</td>
                    <td>${lancamentos[i].categoria}</td>
                    <td>${formatarData(lancamentos[i].dtlanc)}</td>
                    <td style="color: ${lancamentos[i].tipo === "R" ? "green" : "red"};">R$ ${(parseFloat(lancamentos[i].valor)).toFixed(2)}</td>                
                    <td class="bi bi-pencil" onclick="preencheAlteracao${lancamentos[i].tipo === "R" ? "Receita" : "Despesa"}(${lancamentos[i].id})" data-toggle="modal" data-target="#alteracao-${lancamentos[i].tipo === "R" ? "receita" : "despesa"}-modal"> </td>
                    <td class="bi bi-x-lg" onclick="checkExcluirLancamento(${lancamentos[i].id})"> </td>
                </tr>
                `;
            }
        });
}

function checkExcluirLancamento(lancamento_id) {
    swal({
        title: "Você tem certeza?",
        text: "Esta acão não pode ser desfeita!",
        icon: "warning",
        buttons: ["Cancelar", "Sim!"],
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                excluiLancamento(lancamento_id);
            }
        });
}

/*
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
*/

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
                    document.getElementById('alteracao-receita-modal-carteiras').innerHTML = '';
                    document.getElementById('alteracao-despesa-modal-carteiras').innerHTML = '';
                    document.getElementById('transferencia-modal-carteira-origem').innerHTML = '';
                    document.getElementById('transferencia-modal-carteira-destino').innerHTML = '';
                    for (let i = 0; i < response.length; i++) {
                        document.getElementById('receita-modal-carteiras').innerHTML += `<option value='${response[i].id}'>${response[i].descricao}</option>`;
                        document.getElementById('despesa-modal-carteiras').innerHTML += `<option value='${response[i].id}'>${response[i].descricao}</option>`;
                        document.getElementById('alteracao-receita-modal-carteiras').innerHTML += `<option value='${response[i].id}'>${response[i].descricao}</option>`;
                        document.getElementById('alteracao-despesa-modal-carteiras').innerHTML += `<option value='${response[i].id}'>${response[i].descricao}</option>`;
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

function listaCarteirasLancamentos() {
    fetch(`${URL_Carteiras}?usuario=${window.localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    document.getElementById('select-lancamentos-carteiras').innerHTML = '<option value="0">Todas</option>';
                    for (let i = 0; i < response.length; i++) {
                        document.getElementById('select-lancamentos-carteiras').innerHTML += `<option value='${response[i].id}'>${response[i].descricao}</option>`;
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
                        document.getElementById('totCarteiras').innerHTML = "<div style='color: red;'" + "R$ " + total.toFixed(2).toString() + "</div>";
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
                                    document.getElementById('totLancamentoCarteir').innerHTML = '';
                                    for (i = 0; i < carteiras.length; i++) {
                                        let total = 0;
                                        for (let j = 0; j < lancamentos.length; j++) {
                                            if (lancamentos[j].tipo === "R" && lancamentos[j].carteira === carteiras[i].id) {
                                                total += lancamentos[j].valor;
                                            } else if (lancamentos[j].tipo === "D" && lancamentos[j].carteira === carteiras[i].id) {
                                                total -= lancamentos[j].valor;
                                            }
                                        }
                                        if (total >= 0) {
                                            //Pintar de verde
                                            document.getElementById('totLancamentoCarteir').innerHTML += '<li class="list-group-item"><div class="row row-cols-3"><div class="col-1"><i class="bi bi-wallet2"></i></div><div class="col" onclick="preencheAlteracaoCarteira(' + carteiras[i].id + ')" style="cursor:pointer;" data-toggle="modal" data-target="#alterar-carteira-modal">' + carteiras[i].descricao + '</div><div class="col" style="color: green;" data-value="' + carteiras[i].id + '">R$ ' + total.toFixed(2).toString() + '</div></div></li>';
                                        } else {
                                            //Pintar de vermelho
                                            document.getElementById('totLancamentoCarteir').innerHTML += '<li class="list-group-item"><div class="row row-cols-3"><div class="col-1"><i class="bi bi-wallet2"></i></div><div class="col" onclick="preencheAlteracaoCarteira(' + carteiras[i].id + ')" style="cursor:pointer;" data-toggle="modal" data-target="#alterar-carteira-modal">' + carteiras[i].descricao + '</div><div class="col" style="color: red;" data-value="' + carteiras[i].id + '">R$ ' + total.toFixed(2).toString() + '</div></div></li>';
                                        }
                                    }
                                    document.getElementById('totLancamentoCarteir').innerHTML += '<li class="list-group-item"><div class="row row-cols-2"><div class="col" style="cursor:pointer;" data-toggle="modal" data-target="#adicionar-carteira-modal">Adicionar Carteira</div></div></li>';
                                });
                            } else {
                                console.log('Network response was not ok.');
                            }
                        })
                        .catch(function (error) {
                            console.log('There has been a problem with your fetch operation: ' + error.message);
                        });
                });

            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function adicionaCarteira() {
    let carteira = JSON.stringify({
        usuario: parseInt(window.localStorage.getItem('id')),
        descricao: document.getElementById("adicionar-carteira-descricao").value
    });

    fetch(`${URL_Carteiras}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: carteira
    })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

    document.getElementById("adicionar-carteira-descricao").value = '';

    listaCarteirasLancamentos();
    dataAtual();
    listarLancamentosFiltro();
    somaTotal();
    somaCarteiras();
    listaCarteirasModal();
}

function adicionaReceita() {
    let receita = JSON.stringify({
        tipo: "R",
        usuario: parseInt(window.localStorage.getItem('id')),
        carteira: parseInt(document.getElementById("receita-modal-carteiras").value),
        categoria: document.getElementById("receita-modal-categorias").value,
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

    document.getElementById("receita-modal-carteiras").value = '';
    document.getElementById("lancamento-receita-valor").value = '';
    document.getElementById("lancamento-receita-descricao").value = '';
    document.getElementById("lancamento-receita-data").value = '';

    somaCarteiras();
    somaTotal();
    dataAtual();
    listarLancamentosFiltro();
}

function adicionaDespesa() {
    let despesa = JSON.stringify({
        tipo: "D",
        usuario: parseInt(window.localStorage.getItem('id')),
        carteira: parseInt(document.getElementById("despesa-modal-carteiras").value),
        categoria: document.getElementById("despesa-modal-categorias").value,
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

    document.getElementById("despesa-modal-carteiras").value = '';
    document.getElementById("lancamento-despesa-valor").value = '';
    document.getElementById("lancamento-despesa-descricao").value = '';
    document.getElementById("lancamento-despesa-data").value = '';

    somaCarteiras();
    somaTotal();
    dataAtual();
    listarLancamentosFiltro();
}

function adicionaTransferencia() {
    let despesa = JSON.stringify({
        tipo: "D",
        usuario: parseInt(window.localStorage.getItem('id')),
        carteira: parseInt(document.getElementById("transferencia-modal-carteira-origem").value),
        categoria: "Transferência",
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
        categoria: "Transferência",
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
    dataAtual();
    listarLancamentosFiltro();
}

function preencheAlteracaoCarteira(id) {
    fetch(`${URL_Carteiras}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    document.getElementById("alterar-carteira-descricao").value = response.descricao;
                    document.getElementById('btnAlterarCarteira').setAttribute('onclick', 'alteraCarteira(' + id + ')')
                });
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function preencheAlteracaoReceita(id) {
    fetch(`${URL_Lancamentos}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    document.getElementById('alteracao-receita-descricao').value = response.descricao;
                    document.getElementById('alteracao-receita-valor').value = response.valor;
                    document.getElementById('alteracao-receita-modal-carteiras').value = response.carteira;
                    document.getElementById('alteracao-receita-modal-categorias').value = response.categoria;
                    document.getElementById('alteracao-receita-data').value = response.dtlanc;
                    document.getElementById('btnAlteraReceita').setAttribute('onclick', 'alteraLancamento(' + id + ',"R")')
                });
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function preencheAlteracaoDespesa(id) {
    fetch(`${URL_Lancamentos}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    document.getElementById('alteracao-despesa-descricao').value = response.descricao;
                    document.getElementById('alteracao-despesa-valor').value = response.valor;
                    document.getElementById('alteracao-despesa-modal-carteiras').value = response.carteira;
                    document.getElementById('alteracao-despesa-modal-categorias').value = response.categoria;
                    document.getElementById('alteracao-despesa-data').value = response.dtlanc;
                    document.getElementById('btnAlteraDespesa').setAttribute('onclick', 'alteraLancamento(' + id + ',"D")')
                });
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function alteraCarteira(id) {
    let carteira = JSON.stringify({
        descricao: document.getElementById("alterar-carteira-descricao").value
    });
    fetch(`${URL_Carteiras}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: carteira
    })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

    dataAtual();
    listaCarteirasLancamentos();
    listarLancamentosFiltro();
    somaTotal();
    somaCarteiras();
    listaCarteirasModal();
}

function alteraLancamento(id, oper) {
    if (oper === "R") {
        let receita = JSON.stringify({
            carteira: parseInt(document.getElementById("alteracao-receita-modal-carteiras").value),
            categoria: document.getElementById("alteracao-receita-modal-categorias").value,
            valor: parseFloat(document.getElementById("alteracao-receita-valor").value),
            descricao: document.getElementById("alteracao-receita-descricao").value,
            dtlanc: document.getElementById("alteracao-receita-data").value
        });

        fetch(`${URL_Lancamentos}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: receita
        })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    } else {
        let despesa = JSON.stringify({
            carteira: parseInt(document.getElementById("alteracao-despesa-modal-carteiras").value),
            categoria: document.getElementById("alteracao-despesa-modal-categorias").value,
            valor: parseFloat(document.getElementById("alteracao-despesa-valor").value),
            descricao: document.getElementById("alteracao-despesa-descricao").value,
            dtlanc: document.getElementById("alteracao-despesa-data").value
        });

        fetch(`${URL_Lancamentos}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: despesa
        })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }
    somaCarteiras();
    somaTotal();
    dataAtual();
    listarLancamentosFiltro();
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
    dataAtual();
    listarLancamentosFiltro();
}


function preencherGrafico() {
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let receita = [];
    let despesa = [];

    fetch(`${URL_Lancamentos}?_sort=dtlanc&_order=asc&usuario=${window.localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(lancamentos => {
            for (let j = 1; j <= 12; j++) {
                //let mesAtu = new Date().getMonth() + 1;
                let anoAtu = new Date().getFullYear();
                let totRec = 0;
                let totDes = 0;
                let primeiroDia = new Date(anoAtu, j - 1, 1).toISOString().split('T')[0];
                let ultimoDia = new Date(anoAtu, j, 0).toISOString().split('T')[0];
                for (let i = 0; i < lancamentos.length; i++) {
                    if (lancamentos[i].tipo === "R" && lancamentos[i].dtlanc >= primeiroDia && lancamentos[i].dtlanc <= ultimoDia) {
                        totRec += lancamentos[i].valor;
                    } else if (lancamentos[i].tipo === "D" && lancamentos[i].dtlanc >= primeiroDia && lancamentos[i].dtlanc <= ultimoDia) {
                        totDes += lancamentos[i].valor;
                    }
                }
                receita.push(totRec);
                despesa.push(totDes);
            }
        });

    var chart = new Chart(grafico, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Receita',
                    backgroundColor: 'transparent',
                    borderColor: 'green',
                },
                {
                    label: 'Despesas',
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                }
            ]
        }

    })

    chart.data.datasets[0].data = receita;
    chart.data.datasets[1].data = despesa;
    chart.update();
}
