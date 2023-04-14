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