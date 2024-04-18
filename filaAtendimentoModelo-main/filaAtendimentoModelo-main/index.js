// Crie uma instância da fila
let minhaFila = new FilaCircular(5);

// Função para adicionar um elemento à fila
function adicionarElemento() {
  const nomeInput = document.getElementById("txtnovoNome");
  const cpfInput = document.getElementById("txtnovoCpf");
  const nome = nomeInput.value;
  const cpf = cpfInput.value;
  
  if (nome === "" || cpf === "") {
    alert("Preencha todos os campos antes de adicionar à fila!");
    nomeInput.focus();
    return;
  }
  
  const novoAtendimento = new Atendimento();
  novoAtendimento.nome = nome;
  novoAtendimento.cpf = cpf;
  novoAtendimento.data = obterDataAtual();
  novoAtendimento.hora = obterHoraAtual();
  
  if (!minhaFila.isFull()) { // Verificando se a fila não está cheia
    if (minhaFila.enqueue(novoAtendimento)) {
      nomeInput.value = "";
      cpfInput.value = "";
      nomeInput.focus();
    } else {
      alert("Erro ao adicionar à fila");
    }
  } else {
    alert("Fila cheia!");
  }

  atualizarFila();
}

// Função para remover o primeiro elemento da fila
function removerElemento() {
  mostrarMensagemRemocao();
  if (!minhaFila.isEmpty()) {
    let removido = minhaFila.dequeue();
    console.log(minhaFila.toString());
  } else {
    alert("Fila vazia");
  }

  atualizarFila();
}

// Função para buscar um CPF na fila
function buscarCpf() {
  const textoDoBuscar = document.getElementById("txtBuscar").value;
  let encontrado = false;

  for (let pessoa of minhaFila) {
    if (textoDoBuscar === pessoa.cpf) {
      alert("CPF encontrado!\n" + pessoa.toString());
      encontrado = true;
      break; // Sair do loop assim que encontrar o CPF
    }
  }

  if (!encontrado) {
    alert("CPF não encontrado!");
  }
}

// Função para mostrar mensagem de remoção
function mostrarMensagemRemocao() {
  const primeiroElemento = minhaFila.first();

  if (primeiroElemento) {
    const nome = primeiroElemento.nome;
    const horaAnterior = primeiroElemento.hora;
    alert("Chamado para ser atendido(a): " + nome + ", chegou às " + horaAnterior + " está sendo atendido(a) às " + obterHoraAtual() + " Tempo de espera:" + calcularDiferencaHoras(horaAnterior, obterHoraAtual()));
  }
}

// Função para atualizar a exibição da fila
function atualizarFila() {
  const nomeInput = document.getElementById("txtnovoNome");
  const lista = document.getElementById("listFila");
  lista.innerHTML = ""; // Limpa a fila.

  for (let pessoa of minhaFila) {
    let newItem = document.createElement('li');
    newItem.textContent = pessoa.toString();
    lista.appendChild(newItem);
  }

  nomeInput.focus();
}

// Função para obter a data atual
function obterDataAtual() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
  let ano = dataAtual.getFullYear();
  // Formata a data como "dd/mm/aaaa"
  let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  return dataFormatada;
}

// Função para obter a hora atual
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}

// Função para calcular a diferença entre duas horas
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);

  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}