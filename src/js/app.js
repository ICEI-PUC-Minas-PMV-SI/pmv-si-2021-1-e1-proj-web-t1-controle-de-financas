URL = 'http://localhost:3000/usuarios/'

const lancamentosList = document.getElementById('list-lancamentos');

fetch(`${URL}/${id}`)
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


function getlancamentos(id){

    if(id == 0){
        console.log("rafa");
        $('#edit-lancamentos-id').text("");
        $( "#lancamentos-id" ).prop( "disabled", false );
        $('#lancamentos-descricao').val("");
        $('#lancamentos-vlr').val("");
    }else{
        $('#edit-prod-id').text(id);
        fetch(`${URL}/${id}`).then(res => res.json())
        .then(data => {
            $( "#lancamentos-id" ).prop( "disabled", true );
            $('#lancamentos-id').val(data.id);
            $('#lancamentos-descricao').val(data.descricao);
            $('#lancamentos-vlr').val(data.vlr);
        });
    }
}

// Modal Editar Lancamentos

function ModalLancamento(){
    $()
}

//=================================================================================================

// CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM lancamentos

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
        fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: lancamentos
        })
        .then(res => res.json())
        .then(() => location.reload());
    }
    else{
        fetch(URL, {
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
//=================================================================================================
