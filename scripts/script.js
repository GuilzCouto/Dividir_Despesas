// Todas as despesas da viagem serão lançadas e divididas igualmente pelo número de pessoas.
// As despesas são trabalhadas com valores reais positivos, arredondando pra cima as quebras decimais.


let inputNameOfTraveller = document.getElementById("traveller"); //Recebe texto digitado no campo Nome do Viajante
let inputName = document.getElementById("Name"); //Recebe texto digitada no campo Despesa
let inputQuantity = document.getElementById("quantity"); //Recebe valor digitado no campo Quantidade
let inputValue = document.getElementById("unitaryValue"); //Recebe valor digitado no campo Valor Unitário(R$)
var qttTotalEvent = 0; //Contabiliza o número total de despesas adicionadas pela função adicionar
var qttTotalValue = 0; //Contabiliza o valor total gasto de despesas adicionadas pela função adicionar
let result = document.getElementById("result"); //Recebe texto da div com id resultado
let Participants = []; //Recebe matriz de participantes com os valores de cada despesa
let expenseList = []; //Recebe matriz de despesas com todos os dados informados
let people = document.getElementById("people"); //Recebe formulário de viajantes incluídos
let value = 0; //Contabiliza e da valor as pessoas incluídos


//desabilita o botão no início de incluir viajante
document.getElementById("buttonAddTraveller").disabled = true;
//cria um event listener que escuta mudanças no input
document.getElementById("traveller").addEventListener("input", function(event){
  //busca conteúdo do input
    var content = document.getElementById("traveller").value;
    //valida conteudo do input 
    if (content !== null && content !== '') {
      //habilita o botão de incluir viajante
      document.getElementById("buttonAddTraveller").disabled = false;
    } else {
      //desabilita o botão de incluir viajante se o conteúdo do input ficar em branco
      document.getElementById("buttonAddTraveller").disabled = true;
    }
});

//Esta função serve para criar uma matriz de participantes, além de disponibiliza-los para
//a divisão das despesas, ao serem marcados no lançamento de despesas.
function addTraveller() {
    let NameOfTraveller = inputNameOfTraveller.value;
    people.innerHTML += `<input type="checkbox" value=${value} id="people" checked >${NameOfTraveller}</input>`;
    Participants.push([NameOfTraveller,0]);
    value++;
    ClearFields() //Chama a função que limpa os campos preenchidos
}

//desabilita o botão de adicionar despesa
document.getElementById("buttonAddExpense").disabled = true;
//cria um event listener que escuta mudanças
document.getElementById("unitaryValue").addEventListener("input", function(event){
  //busca conteúdo do input
    var content = document.getElementById("unitaryValue").value;
    //valida conteudo do input 
    if (content !== null && content !== '' && content !== "0") {
      //habilita o botão de adicionar despesa
      document.getElementById("buttonAddExpense").disabled = false;
    } else {
      //desabilita o botão de adicionar despesa se o conteúdo do input ficar em branco
      document.getElementById("buttonAddExpense").disabled = true;
    }
});

//A função abaixo(addExpense()) lê e cria uma matriz de despesas lançadas,
//calcula o valor para cada viajante que estava presente
//(Arredondando valor para cima, trabalhando com números reais inteiros)
//e lança na matriz criada na primeira função.
//imprime na tela uma lista com todas as despesas lançadas e executa a função Total().
function addExpense() {
    let Name = inputName.value;
    let quantity = inputQuantity.value;
    let Value = inputValue.value;
    let ValueOfTraveller = 0;
    var checkBox = document.querySelectorAll("#people");
    var selected = 0;
    checkBox.forEach(function(el) {
        if(el.checked) {
            selected++;
        }
    });
    ValueOfTraveller=Math.ceil((quantity*Value)/selected); //Arredondando valor para cima, trabalhando com números reais inteiros
    
    checkBox.forEach(function(el){
        if(el.checked){
            Participants[el.value][1] += ValueOfTraveller;
        }
    });
    qttTotalEvent = qttTotalEvent + 1;
    qttTotalValue = qttTotalValue + (quantity * Value); 

    alert("Despesa "+Name+" Adicionada")
    expenseList.push([Name,quantity,Value,quantity*Value]);
    
    //imprime na tela uma lista com a despesa lançada.
    expensePosted.innerHTML += `<p> ${qttTotalEvent} - Despesa ${expenseList[(qttTotalEvent)-1][0]} 
    com a quantidade ${expenseList[(qttTotalEvent)-1][1]} e valor unitário 
    R$${expenseList[(qttTotalEvent)-1][2]}, totalizando R$${expenseList[(qttTotalEvent)-1][3]}.</p>`

    Total() // Chama a função Total
    ClearFields() //Chama a função que limpa os campos preenchidos
}

//Função Total - Imprime na página 2 relatórios finais, 
//um dividindo por igual a todos os viajantes, arredondando valor para cima, 
//trabalhando com números reais inteiros
//o segundo com a divisão arredondada por pessoa com todas as despesas lançadas,

function Total() {
             
    result.innerHTML = `<br><p>Nesta viagem, fomos ${Participants.length} amigos </p>`
    result.innerHTML += `<p>foram lançados ${qttTotalEvent} despesas </p>`
    result.innerHTML += `<p>somadas totalizam R$ ${qttTotalValue}</p>`
    result.innerHTML += `<p>se dividirmos tudo por todos ficaria R$ ${Math.ceil( qttTotalValue / Participants.length)} por pessoa</p>`
    result.innerHTML += `<br><p>O débito por viajante é de:</p>`

    for (let x = 0; x < Participants.length; x++){
        result.innerHTML += `<p> ${Participants[x][0]} gastou R$ ${Participants[x][1]},00 </p>`
    }
}

//A função clearfields foi feita para limpar os campos após a inclusão dos dados
function ClearFields() {

  document.getElementById("traveller").value = "";
  document.getElementById("buttonAddTraveller").disabled = true;
  document.getElementById("Name").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("unitaryValue").value = "";
  document.getElementById("buttonAddExpense").disabled = true;

}
