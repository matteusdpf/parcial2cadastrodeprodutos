function adicionar(evt) {
  // Não deixa a tela atualizar
  evt.preventDefault();
  let nome = document.getElementById("nome");

  let valorInput = document.getElementById("valor");
  let valor = Number(valorInput.value);

  let quantidadeInput = document.getElementById("quantidade");
  let quantidade = Number(quantidadeInput.value);

  // Declara um novo item e o adiciona a lista
  let novoItem = { nome: nome.value, valor: valor, quantidade: quantidade };
  listaDeItens.push(novoItem);

  // Após adicionar, renderiza os itens novamente
  exibirItens();
}

function removeElemento(index) {
  // Remove o elemento na posicao index
  listaDeItens.splice(index, 1);

  // Apos a remocao, limpa a tabela e preenche novamente
  exibirItens();
}

// Criar uma função para remover
// Dentro da função de remover, chamar a função exibirItens();

function exibirItens() {
  let corpoDaTabela = document.getElementById("conteudo");

  // Limpa a tabela antes
  corpoDaTabela.innerHTML = "";

  // Grava os elementos na memoria
  localStorage.setItem("itens", JSON.stringify(listaDeItens));

  // Loop em cada elemento da tabela
  for (let i = 0; i < listaDeItens.length; i++) {
    let item = listaDeItens[i];

    let linha = document.createElement("tr");
    corpoDaTabela.appendChild(linha);

    let posicao = document.createElement("th");
    linha.appendChild(posicao);
    posicao.innerText = i + 1;

    let celulaNome = document.createElement("td");
    celulaNome.innerText = item.nome;
    linha.appendChild(celulaNome);

    let celulaValor = document.createElement("td");
    celulaValor.innerText = "R$ " + item.valor.toFixed(2);
    linha.appendChild(celulaValor);

    let celulaQuantidade = document.createElement("td");
    celulaQuantidade.innerText = item.quantidade;
    linha.appendChild(celulaQuantidade);

    let total = item.valor * item.quantidade;
    let celulaTotal = document.createElement("td");
    celulaTotal.innerText = "R$ " + total.toFixed(2);
    linha.appendChild(celulaTotal);

    let acoes = document.createElement("td");
    linha.appendChild(acoes);

    let button = document.createElement("button");
    button.className = "btn btn-danger";
    button.innerHTML = '<i class="fas fa-trash-alt"></i>';
    button.onclick = function () {
      removeElemento(i);
    };
    acoes.appendChild(button);
  }
  exibirRodape();
}

function exibirRodape() {
  let rodape = document.getElementById("rodape");

  // Limpa o rodapé
  rodape.innerHTML = "";

  let linha = document.createElement("tr");
  rodape.appendChild(linha);

  // Adiciona celulas vazias para que o total esteja na coluna certa
  linha.appendChild(document.createElement("td"));
  linha.appendChild(document.createElement("td"));
  linha.appendChild(document.createElement("td"));
  linha.appendChild(document.createElement("td"));

  let total = 0;

  // Percorre toda a lista somando os valores
  for (let i = 0; i < listaDeItens.length; i++) {
    let item = listaDeItens[i];
    let valorTotalDoItem = item.valor * item.quantidade;

    // Acumula o resultado total com o valor calculado agora
    total += valorTotalDoItem;
  }
  let celulaTotal = document.createElement("td");
  celulaTotal.innerText = "R$ " + total.toFixed(2);
  linha.appendChild(celulaTotal);
}

const formulario = document.getElementById("formulario");
formulario.onsubmit = adicionar;

let tabelaSalva = localStorage.getItem("itens");

let listaDeItens = JSON.parse(tabelaSalva) || [];

// Renderiza a tabela
exibirItens();
