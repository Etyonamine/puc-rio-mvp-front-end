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
  let url = 'http://127.0.0.1:5000/agendamentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      var i = 0 ;      
      data.agendamentos.forEach(item => {

        inseriListaAgendamento(data.agendamentos[i]);
        i++;
      })
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
          document.getElementById("data").value = dataAgenda;
        }
        else if(i == 2){
          var nomeCliente = cells[i].innerHTML;
          getIdCliente(nomeCliente);          
        }
        else if(i == 3){
          var nomeProfissional = cells[i].innerHTML;
          getIdProfissional(nomeProfissional);          
        }
        else if(i == 4){
          var descricaoServico = cells[i].innerHTML;
          getIdServico(descricaoServico);          
        }
        else if(i ==5){
          document.getElementById("observacao").value = cells[i].innerHTML;
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
      document.getElementById("optCliente").value = data.id;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  return idRetorno;
}


/*
  --------------------------------------------------------------------------------------
  Função para recuperar o ID do profissional
  --------------------------------------------------------------------------------------
*/
const getIdProfissional = (nome)=>{
  let url = 'http://127.0.0.1:5000/profissional?nome=' + nome;
  let idRetorno = 0;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("optProfissional").value = data.id;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  return idRetorno;
}


/*
  --------------------------------------------------------------------------------------
  Função para recuperar o ID do cliente
  --------------------------------------------------------------------------------------
*/
const getIdServico = (descricao)=>{
  let url = 'http://127.0.0.1:5000/servico?descricao=' + descricao;
  let idRetorno = 0;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("optServico").value = data.id;
      document.getElementById("valor").value = data.valor;
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
  var id = data.agenda_id;
  var dataAgenda = new Date(data.data_agenda);
  var nomeCliente = data.cliente;
  var nomeProfissional = data.profissional;
  var descricaoServico = data.descricao_servico;
  var valorServico = data.valor_servico;
  var observacao = data.observacao;

  var item = [id, dataAgenda.toLocaleString().replace(',',''),nomeCliente, nomeProfissional, descricaoServico, valorServico, observacao]
  var table = document.getElementById('tabelaAgendamento');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))


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
      const idAgendamento = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(idAgendamento);      
                     
      }
    }
  }  
  document.getElementById('btnLimpar').click();
}


/*
--------------------------------------------------------------------------------------
  Função limpa os campos nome e alterar os valores para o cenario de novo registro
  --------------------------------------------------------------------------------------
*/
function limpar() {
  document.getElementById("data").value = "";
  document.getElementById("optCliente").value = 0;
  document.getElementById("optProfissional").value = 0;
  document.getElementById("optServico").value = 0;
  document.getElementById("valor").value = 0;
  document.getElementById("observacao").value = "";  
  document.getElementById("btnSalvar").value = "Adicionar";  
  document.getElementById('optCliente').disabled  = false;
  document.getElementById('data').disabled = false;
}


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
      var id = 0 ;
      for (var i = 0; i <= cells.length - 1; i++) {
        if (i == 0) //id
        {
          id = cells[i].innerHTML;
          document.getElementById("idAgendamento").value = id;
        }        
      }
      document.getElementById("indexTabela").value = target.rowIndex;
      getAgendamento(id);
    }
    document.getElementById("btnSalvar").value = "Atualizar";
  };
}

function convertFormatoData(dataAgenda){  
  var info = dataAgenda.split(" ");
  var data = info[0].split('/');
  var horas = info[1].split(':');
  var dataRetorno = data[2] + '-' + data[1] + '-' + data[0] + 'T' + horas[0] + ":" + horas[1];  
  
  return dataRetorno;
}

/*
  Funcao para recuperar o agendamento  e atualizar os campos
*/
const getAgendamento = (id) =>{
  let url = 'http://127.0.0.1:5000/agendamento_id?id=' + id;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data)  {    
        let dataenc = new Date(data.data_agenda);
        let dataAgendaFmt = convertFormatoData(dataenc.toLocaleString().replace(',',''));
        document.getElementById('data').value = dataAgendaFmt;
        document.getElementById('optCliente').value = data.cliente_id;
        document.getElementById('optProfissional').value = data.profissional_id;
        document.getElementById('optServico').value = data.servico_id;
        document.getElementById('valor').value = data.valor_servico;
        document.getElementById('observacao').value = data.observacao;

        document.getElementById('optCliente').disabled  = true;
        document.getElementById('data').disabled = true;
      }      
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

    inseriListaAgendamento(data);
    alert("Item adicionado!");
    limpar();

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
const putItem = async () => {
  //captura das informacoes
  var id = document.getElementById('idAgendamento').value;
  var data = new Date(document.getElementById("data").value);
  var idCliente = document.getElementById("optCliente").value;
  var idProfissional = document.getElementById("optProfissional").value;
  var idServico = document.getElementById("optServico").value;  
  var observacao = document.getElementById("observacao").value;
  var dataLocal = data.toLocaleDateString().split('/');
  var horaLocal = data.toLocaleTimeString();
  console.log(dataLocal);
  console.log(horaLocal);
  const formData = new FormData();
  formData.append('id', id);
  formData.append('data_agenda', dataLocal[2] + '-' + dataLocal[1] + '-' + dataLocal[0]   + ' ' + horaLocal);
  formData.append('cliente_id', idCliente);
  formData.append('profissional_id', idProfissional);
  formData.append('servico_id', idServico);
  formData.append('observacao', observacao);

  let json;
  let url = 'http://127.0.0.1:5000/agendamento';
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
  Função para atualizar a linha da tabela do agendamento
  --------------------------------------------------------------------------------------
*/
function editRow() {
  var table = document.getElementById("tabelaAgendamento");
  var rIndex = document.getElementById("indexTabela").value;

  var nomeCliente = document.getElementById('optCliente').options[document.getElementById('optCliente').selectedIndex].text;
  var nomeProfissional = document.getElementById('optProfissional').options[document.getElementById('optProfissional').selectedIndex].text;
  var nomeServico = document.getElementById('optServico').options[document.getElementById('optServico').selectedIndex].text;

  table.rows[rIndex].cells[2].innerHTML = nomeCliente;
  table.rows[rIndex].cells[3].innerHTML = nomeProfissional;
  table.rows[rIndex].cells[4].innerHTML = nomeServico;
  table.rows[rIndex].cells[5].innerHTML = document.getElementById('valor').value;
  table.rows[rIndex].cells[6].innerHTML = document.getElementById('observacao').value;
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
const salvarItem = () => {
  // consistencia   
  if (preenchimentoCamposObrigatoriosValido() == true){
    //identificando a operação
    // atualizacao do registro
    if (document.getElementById("btnSalvar").value == "Atualizar") {
      putItem();
    }
    // novo registro
    else 
    {      
      postItem();
      
    }
  }  
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = async (id) => {  
  
  const formData = new FormData();
  formData.append('id', id);
  let url = 'http://127.0.0.1:5000/agendamento';
  try{
    const response = await fetch(url, {
      method: 'delete',
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
    alert("Removido!");  
    limpar();
  }catch{
    if (error instanceof SyntaxError) {
          // Unexpected token < in JSON
          console.log('There was a SyntaxError', error);
        } else {
          console.log('There was an error', error);
        }
  }  
}