const dias = [
    {
        nome: "Segunda-Feira",
        comida: "Arroz, feijão, frango e salada"
    },
     {
        nome: "Terça-Feira",
        comida: "Arroz, carne moida e legumes"
    },
     {
        nome: "Quarta-Feira",
        comida: "Macarrão, frango e salada"
    },
     {
        nome: "Quinta-Feira",
        comida: "Arroz, feijão e carne cozida"
    },
     {
        nome: "Sexta-Feira",
        comida: "Arroz, frango e purê de batata"
    },
];

let votos = JSON.parse(localStorage.getItem("votosIFPI")) || {};

const cardapio = document.getElementById("cardapio");

const hoje = new Date();
const numeroDia = hoje.getDay();

document.getElementById("data-hoje").textContent =
    "Hoje: " + hoje.toLocaleDateString("pt-br");
    
dias.forEach((dia, indice) => {

    if (!votos[indice]) {
        votos[indice] = {
            positivo: 0,
            negativo: 0
    };
}


const card = document.createElement("div");

card.className = "card";

if (numeroDia === indice + 1) {
    card.classList.add("hoje");
}

card.innerHTML = `   

    <h3>${dia.nome}</h3>

    
    <p><strong>Refeição</strong></p>
    <p>${dia.comida}</p>

    <div class="votacao">
        <button class="postivo" onclick="votar(${indice}, 'positivo')">
            👍 <span id="positivo-${indice}">${votos[indice].positivo}</span>
        </button>

         <button class="negativo" onclick="votar(${indice}, 'negativo')">
            👎 <span id="negativo-${indice}">${votos[indice].negativo}</span>
        </button>
    </div>
    `;

    cardapio.appendChild(card);
});

function votar(indice, tipo) {

    votos[indice][tipo]++;

    localStorage.setItem(
        "votosIFPI",
        JSON.stringify(votos)
    );

    document.getElementById("positivo-${indice}").textContent =
        votos[indice].positivo;

    document.getElementById("negativo-${indice}").textContent = 
        votos[indice].negativo;
}