
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(item => inseriListaCliente(item.id, item.nome))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getCliente(nomeCliente)
/*
  --------------------------------------------------------------------------------------
  Chamada da função para buscar os dados cliente a partir do nome
  --------------------------------------------------------------------------------------
*/ {
  let url = 'http://127.0.0.1:5000/cliente?nome=' + nomeCliente;
  let idRetorno = 0;
  alert(url);
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(item => inseriListaCliente(item.id, item.nome))
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
getList()
/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const inseriListaCliente = (id, nome) => {
  var item = [id, nome]
  var table = document.getElementById('tabelaCliente');
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
  console.log(id)
  const formData = new FormData();
  formData.append('id', id);
  let url = 'http://127.0.0.1:5000/cliente';
  fetch(url, {
    method: 'delete',
    body: formData
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
  let url = 'http://127.0.0.1:5000/cliente';
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

    inseriListaCliente(data.id, data.nome);
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
  Função para adicionar um novo item com nome
  --------------------------------------------------------------------------------------
*/
const newItem = () => {

  let inputNome = document.getElementById("nome").value;

  if (inputNome === '') {
    alert("Escreva o nome de um item!");
  }
  else {

    postItem(inputNome)

  }
}