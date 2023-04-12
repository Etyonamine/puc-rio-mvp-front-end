/*
*/
const indexSelectedRow = 0;
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  //limpando a lista

  let url = 'http://127.0.0.1:5000/profissionais';
  
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.profissionais.forEach(item => inseriListaProfissional(item.id, item.nome))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  --------------------------------------------------------------------------------------
  Chamada da função para preencher o campo nome e guardar o id do profissional
  --------------------------------------------------------------------------------------
*/
function getLinha() {
  document.getElementById("btnSalvar").disabled = false;

  var table = document.getElementsByTagName("table")[0];
  var tbody = table.getElementsByTagName("tbody")[0];

  tbody.onclick = function (e) {
    e = e || window.event;
    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
      target = target.parentNode;      
    }
    if (target) {      
      var cells = target.getElementsByTagName("td");

      for (var i = 0; i <= cells.length - 1; i++) {
        if (i == 0) //id
        {          
          var id = cells[i].innerHTML;
          document.getElementById("idProfissional").value = id;
        }
        else if (i == 1) {
          document.getElementById("nome").value = cells[i].innerHTML;
        }
      }
      document.getElementById("indexTabela").value =  target.rowIndex;      
    }
    document.getElementById("btnSalvar").value = "Atualizar";
  };
} 
/*
 recupera um registro de profissional por nome
*/
function getProfissional(nomeProfissional)
/*
  --------------------------------------------------------------------------------------
  Chamada da função para buscar os dados profissional a partir do nome
  --------------------------------------------------------------------------------------
*/ {
  let url = 'http://127.0.0.1:5000/profissional?nome=' + nomeProfissional;
  let idRetorno = 0;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(item => inseriListaProfissional(item.id, item.nome))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  return idRetorno;
}
/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList();
getLinha();

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const inseriListaProfissional = (id, nome) => {
  var item = [id, nome]
  var table = document.getElementById('tabelaProfissional');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("nome").value = "";

  removeElement()

}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()

        deleteItem(nomeItem)
        alert("Removido!")        
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (id) => {
  
  const formData = new FormData();
  formData.append('id', id);
  let url = 'http://127.0.0.1:5000/profissional';
  fetch(url, {
    method: 'delete',
    body: formData
  })
    .then(()=>{
      limpar();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputNome) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  let json;
  let url = 'http://127.0.0.1:5000/profissional';
  try {
    const response = await fetch(url, {
      method: 'post',
      body: formData

    });
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status;
      alert(error);
      return Promise.reject(error);
    }

    inseriListaProfissional(data.id, data.nome);
    alert("Item adicionado!");

  } catch (error) {
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      console.log('There was a SyntaxError', error);
    } else {
      console.log('There was an error', error);
    }
  }
}

/*  
  --------------------------------------------------------------------------------------
  Função para atualizar um item na lista do servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const putItem = async (idProfissional, inputNome) => {
  const formData = new FormData();
  formData.append('id', idProfissional);
  formData.append('nome', inputNome);  
  let url = 'http://127.0.0.1:5000/profissional';
   
  try {
    const response = await fetch(url, {
      method: 'put',
      body: formData

    });
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status;
      alert(error);
      return Promise.reject(error);
    }

    editRow();
    limpar();
    alert("Item atualizado!");
    


  } catch (error) {
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      console.log('There was a SyntaxError', error);
    } else {
      console.log('There was an error', error);
    }
  }
}
/*
--------------------------------------------------------------------------------------
  Função limpa o campo nome e alterar os valores para o cenario de novo registro
  --------------------------------------------------------------------------------------
*/
function limpar(){
  document.getElementById("nome").value = "";
  document.getElementById("idProfissional").value = "0";
  document.getElementById("btnSalvar").value = "Adicionar";
}
/*
 --------------------------------------------------------------------------------------
  Função para atualizar a linha da tabela do profissional
  --------------------------------------------------------------------------------------
*/
function editRow() {
  var table = document.getElementById("tabelaProfissional");
  var rIndex = document.getElementById("indexTabela").value;  
  table.rows[rIndex].cells[1].innerHTML = document.getElementById("nome").value;  
}
/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputNome = document.getElementById("nome").value;
  var idProfissional = document.getElementById("idProfissional").value;

  if (document.getElementById("btnSalvar").value == "Atualizar" && idProfissional != "0") {
    putItem(idProfissional, inputNome);
  }
  else {
    if (inputNome === '') {
      alert("Escreva o nome de um item!");
    }
    else {
      postItem(inputNome)
    }
  }
}