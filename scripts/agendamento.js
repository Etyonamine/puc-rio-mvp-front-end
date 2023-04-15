/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListaClientes = async () => {
  //limpando a lista

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

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListaProfissionais = async () => {
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
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListaServicos = async () => {
  //limpando a lista

  let url = 'http://127.0.0.1:5000/servicos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.servicos.forEach(item => inseriListaServico(item.id, item.descricao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  //limpando a lista

  let url = 'http://127.0.0.1:5000/agendamentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.agendamentos.forEach(item => inseriListaAgendamento(data))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Chamada da função para preencher o campo nome e guardar o id do cliente
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
          document.getElementById("idAgendamento").value = id;
        }
        else if (i == 1) {
          
          var celula = cells[i].innerHTML;
          const [dateStr, timeStr] = celula.split(' ');
          const [day,month, year] = dateStr.split('/');          
          var dataAgenda = year + '-' + month + '-' + day + 'T' + timeStr;

          alert(dataAgenda.toString("yyyy-MM-ddThh:mm"))
          document.getElementById("data").value = dataAgenda;
        }
        else if(i == 2){
          var nomeCliente = cells[i].innerHTML;
          var idCliente = getIdCliente(nomeCliente);
          document.getElementById("optCliente").value = idCliente;
        }
      }
      document.getElementById("indexTabela").value = target.rowIndex;
    }
    document.getElementById("btnSalvar").value = "Atualizar";
  };
}

/*
  --------------------------------------------------------------------------------------
  Função para recuperar o ID do cliente
  --------------------------------------------------------------------------------------
*/
const getIdCliente = (nome)=>{
  let url = 'http://127.0.0.1:5000/cliente?nome=' + nome;
  let idRetorno = 0;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach(item => inseriListaCliente(item.id, item.nome))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  return idRetorno;
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista de agendamentos apresentada
  --------------------------------------------------------------------------------------
*/
const inseriListaAgendamento = (data) => {
  

  //recuperando informações do array
  var id = data.agendamentos[0].agenda_id;
  var dataAgenda = new Date(data.agendamentos[0].data_agenda);
  var nomeCliente = data.agendamentos[0].cliente;
  var nomeProfissional = data.agendamentos[0].profissional;
  var descricaoServico = data.agendamentos[0].descricao_servico;
  var valorServico = data.agendamentos[0].valor_servico;
  var observacao = data.agendamentos[0].observacao;

  var item = [id, dataAgenda.toLocaleString().replace(',',''),nomeCliente, nomeProfissional, descricaoServico, valorServico, observacao]
  var table = document.getElementById('tabelaAgendamento');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  //document.getElementById("nome").value = "";

  removeElement()
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
        div.remove();

        deleteItem(nomeItem);
        alert("Removido!");
        limpar();
      }
    }
  }
}


/*
--------------------------------------------------------------------------------------
  Função limpa os campos nome e alterar os valores para o cenario de novo registro
  --------------------------------------------------------------------------------------
*/
function limpar() {
  document.getElementById("data").value = "";
  document.getElementById("optCliente").value = "0";
  document.getElementById("optProfissional").value = "0";
  document.getElementById("optServico").value = "0";
  document.getElementById("valor").value = "0";
  document.getElementById("observacao").value = "";  
  document.getElementById("btnSalvar").value = "Adicionar";
}
/*


/*
  --------------------------------------------------------------------------------------
  montando o combo cliente
  --------------------------------------------------------------------------------------
*/
const inseriListaCliente = (id, nome) => {
  var item = [id, nome];
  const select = document.querySelector('#optCliente');
  select.options[select.options.length] = new Option(nome, id);
};
/*
  --------------------------------------------------------------------------------------
  montando o combo profissional
  --------------------------------------------------------------------------------------
*/
const inseriListaProfissional = (id, nome) => {
  var item = [id, nome];
  const select = document.querySelector('#optProfissional');
  select.options[select.options.length] = new Option(nome, id);
};
/*
  --------------------------------------------------------------------------------------
  montando o combo serviço
  --------------------------------------------------------------------------------------
*/
const inseriListaServico = (id, descricao) => {
  var item = [id, descricao];
  const select = document.querySelector('#optServico');
  select.options[select.options.length] = new Option(descricao, id);
};
/*
  --------------------------------------------------------------------------------------
  Função para contar a quantidade de caracteres restantes do campo observacao
  --------------------------------------------------------------------------------------
*/
const contarCaracteresTextArea = () => {   
  var textarea = document.getElementById("observacao");
  var caracteresRestantes = document.getElementById("caracteresRestantes");
  textarea.oninput = function (e) {
    caracteresRestantes.innerHTML = (100 - this.value.length);
  }
}
/*
  --------------------------------------------------------------------------------------
  busca o valor do servico
  --------------------------------------------------------------------------------------
*/
const getValorServico = (id)=>{
 
 //zerando o campo valor
 document.getElementById("valor").value = "0";
 var descricao = id.options[id.selectedIndex].text; 
 var indice = id.value;

 if (indice == "0" ){  
  return; 
 }

 

 let url = 'http://127.0.0.1:5000/servico?descricao=' + descricao;
 fetch(url, {
   method: 'get',
 })
   .then((response) => response.json())
   .then((data) => {     
     document.getElementById("valor").value = data.valor;
   })
   .catch((error) => {
     console.error('Error:', error);
   });
}

/*
  --------------------------------------------------------------------------------------
  Iniciando as variaveis
  --------------------------------------------------------------------------------------
*/
getListaClientes();
getListaProfissionais();
getListaServicos();
getList();
getLinha();


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async () => {
  //captura das informacoes
  var data = new Date(document.getElementById("data").value);
  var idCliente = document.getElementById("optCliente").value;
  var idProfissional = document.getElementById("optProfissional").value;
  var idServico = document.getElementById("optServico").value;  
  var observacao = document.getElementById("observacao").value;
  
  const formData = new FormData();
  formData.append('data_agenda', data.toLocaleString().replace(',',''));
  formData.append('cliente_id', idCliente);
  formData.append('profissional_id', idProfissional);
  formData.append('servico_id', idServico);
  formData.append('observacao', observacao);

  // enviando para a API
  let json;
  let url = 'http://127.0.0.1:5000/agendamento';
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
  Função para a validação do preenchimento 
  --------------------------------------------------------------------------------------
*/
function preenchimentoCamposObrigatoriosValido(){
  //recuperando-se os valores dos campos.
  var data = document.getElementById("data").value;
  var idCliente = document.getElementById("optCliente").value;  
  var idProfissional = document.getElementById("optProfissional").value;
  var idServico = document.getElementById("optServico").value;  
  
  //validando os campos
   if (data == null || data==''){
    alert('Atenção!A data e hora de agendamento deve ser selecionado!');
    return false;
  } 
  if (idCliente == 0){
    alert('Atenção!Por favor, selecione um cliente da lista!');
    return false;
  }
  if (idProfissional == 0){
    alert('Atenção!Por favor, selecione um profissional da lista!');
    return false;
  }
  if (idServico == 0){
    alert('Atenção!Por favor, selecione um serviço da lista!');
    return false;
  }
  return true;
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  // consistencia   
  if (preenchimentoCamposObrigatoriosValido() == true){
    //identificando a operação
    // atualizacao do registro
    if (document.getElementById("btnSalvar").value == "Atualizar" && idCliente != "0") {
      putItem(idCliente, inputNome);
    }
    // novo registro
    else 
    {      
      postItem();
      
    }
  }  
}
