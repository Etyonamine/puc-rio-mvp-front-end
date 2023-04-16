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

  let url = 'http://127.0.0.1:5000/servicos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.servicos.forEach(item => inseriListaServico(item.id, item.descricao,item.valor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  --------------------------------------------------------------------------------------
  Chamada da função para preencher o campo descricao e guardar o id do servico
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
          document.getElementById("idServico").value = id;
        }
        else if (i == 1) {
          document.getElementById("descricao").value = cells[i].innerHTML;
        }
        else if (i== 2){
          document.getElementById("valor").value = cells[i].innerHTML;
        }
      }
      document.getElementById("indexTabela").value =  target.rowIndex;      
    }
    document.getElementById("btnSalvar").value = "Atualizar";
  };
} 
/*
 recupera um registro de servico por descricao
*/
function geServico(nomeServico)
/*
  --------------------------------------------------------------------------------------
  Chamada da função para buscar os dados servico a partir do descricao
  --------------------------------------------------------------------------------------
*/ {
  let url = 'http://127.0.0.1:5000/servico?descricao=' + nomeServico;
  let idRetorno = 0;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.servico.forEach(item => inseriListaServico(item.id, item.descricao, item.valor))
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
const inseriListaServico = (id, descricao,valor) => {
  var item = [id, descricao,valor]
  var table = document.getElementById('tabelaServico');
  var row = table.insertRow();

  for (var i = 0; i <= item.length-1; i++) {
    var cel = row.insertCell(i);    
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
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
      const id = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        deleteItem(id,div)        
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
  Função para tentar excluir o item  da lista
  --------------------------------------------------------------------------------------
*/
const deleteItem = (id, div) => {
  try {
    
    let messagemErroGeral = "Ocorreu um erro ao tentar excluir o serviço!";

    try {
      let url = 'http://127.0.0.1:5000/agendamento_servico?servico_id=' + id;
      const response = fetch(url, {
        method: 'get'
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        else
        {
          throw new Error(messagemErroGeral);
        }
      })
        .then((responseJson) => {
          // Do something with the response
          alert('Já existe agendamento com este servico!');          
        })
        .catch((error) => {
          excluirRegistro(id, div);
        });
    }
    catch (error) {
      
        console.log('There was a SyntaxError', error);
        alert(messagemErroGeral);
    }

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
  Função para tentar excluir o registro
  --------------------------------------------------------------------------------------
*/
const excluirRegistro = (id, div) =>{
  const formData = new FormData();
  formData.append('id', id);
  let url = 'http://127.0.0.1:5000/servico';
  fetch(url, {
    method: 'delete',
    body: formData
  })
    .then(()=>{
      alert('Removido com sucesso!');      
      limpar();
      div.remove();
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
const postItem = async (inputDescricao, valor) => {
  console.log(valor);
  const formData = new FormData();
  formData.append('descricao', inputDescricao);
  formData.append('valor', valor.replace(',','.'));
  console.log(formData);

  let url = 'http://127.0.0.1:5000/servico';
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

    inseriListaServico(data.id, data.descricao,data.valor);
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
const putItem = async (idServico, inputDescricao, valor) => {
  const formData = new FormData();
  formData.append('id', idServico);
  formData.append('descricao', inputDescricao);  
  formData.append('valor', valor);  
  let url = 'http://127.0.0.1:5000/servico';
   
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
  Função limpa o campo descricao e alterar os valores para o cenario de novo registro
  --------------------------------------------------------------------------------------
*/
function limpar(){
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "0";
  document.getElementById("idServico").value = "0";
  document.getElementById("btnSalvar").value = "Adicionar";
}
/*
 --------------------------------------------------------------------------------------
  Função para atualizar a linha da tabela do servico
  --------------------------------------------------------------------------------------
*/
function editRow() {
  var table = document.getElementById("tabelaServico");
  var rIndex = document.getElementById("indexTabela").value;  
  table.rows[rIndex].cells[1].innerHTML = document.getElementById("descricao").value;  
  table.rows[rIndex].cells[2].innerHTML = document.getElementById("valor").value;  
}
/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com descricao
  --------------------------------------------------------------------------------------
*/
const salvarItem = () => {
  let inputDescricao = document.getElementById("descricao").value;
  var idServico = document.getElementById("idServico").value;
  var valor = document.getElementById("valor").value;

  if (valor == ""){
    valor = "0";
  }

  if (document.getElementById("btnSalvar").value == "Atualizar" && idServico != "0") {
    
    putItem(idServico, inputDescricao,valor );
  }
  else {
    if (inputDescricao === '') {
      alert("Escreva o descricao de um item!");
    }
    else {
      postItem(inputDescricao,valor)
    }
  }
}