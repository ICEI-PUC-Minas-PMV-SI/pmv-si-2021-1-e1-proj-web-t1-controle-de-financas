// URL DA API DE DADOS
URL = 'http://localhost:3000/lancamentos'
//=================================================================================================
// GET - Recupera todos os lancamentos e adiciona na tabela

const lancamentosList = document.getElementById('list-lancamentos');

fetch(URL)
    .then(res => res.json())
    .then(lancamentos => {
        let lista_lancamentos = '';
        for (let i = 0; i < lancamentos.length; i++) {
            lista_lancamentos += `
            <tr>
                <th>${lancamentos[i].id}</th>
                <td>${lancamentos[i].descricao}</td>
                <td>R$${(parseFloat(lancamentos[i].vlr)).toFixed(2)}</td>
            </tr>
            `;
            lancamentosList.innerHTML = lista_lancamentos;
        }
    });
