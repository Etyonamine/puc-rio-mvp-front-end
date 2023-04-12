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
    montando o combo
    --------------------------------------------------------------------------------------
  */
  const inseriListaCliente = (id, nome) =>
  {
    var item = [id, nome];
    const select = document.querySelector('#optCliente');
    select.options[select.options.length] = new Option(nome, id);
  };

  /*
    --------------------------------------------------------------------------------------
    Função para contar a quantidade de caracteres restantes do campo observacao
    --------------------------------------------------------------------------------------
  */
  const contarCaracteresTextArea = ()=>{
    var textarea=document.getElementById("observacao");
    var caracteresRestantes=document.getElementById("caracteresRestantes");
    textarea.oninput=function(e){
        caracteresRestantes.innerHTML=(100-this.value.length);
}
  }

  /*
    --------------------------------------------------------------------------------------
    Iniciando as variaveis
    --------------------------------------------------------------------------------------
  */
  getListaClientes();