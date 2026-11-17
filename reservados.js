const LIMITE = 60;

let reservas = JSON.parse(
    localStorage.getItem("reservasIFPI")
) || [];

const formulario = document.getElementById("formReserva");
const vagas = document.getElementById("vagas");
const lista = document.getElementById("listaReservas");
const mensagem = document.getElementById("mensagem");

function atualizarTela() {

    vagas.textContent = LIMITE - reservas.length;

    lista.innerHTML = "";

    reservas.forEach((aluno) => {

        const item = document.createElement("li");

        item.textContent =
            aluno.nome + " - " +
            aluno.turma + " - " +
            aluno.dia;

        lista.appendChild(item);
    });
}

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const turma = document.getElementById("turma").value.trim();
    const dia = document.getElementById("dia").value;

    if (reservas.length >= LIMITE) {
        mensagem.textContent = "Todas as vagas foram preenchidas!";
        return;
    }

    const duplicado = reservas.some(aluno =>
        aluno.matricula === matricula &&
        aluno.dia === dia
    );

    if (duplicado) {
        mensagem.textContent =
            "Você já possui uma reserva para esse dia!";
        return;
    }

    reservas.push({
        nome,
        matricula,
        turma,
        dia
    });

    localStorage.setItem(
        "reservasIFPI",
        JSON.stringify(reservas)
    );

    mensagem.textContent = "Reserva realizada com sucesso!";

    formulario.reset();

    atualizarTela();
});

atualizarTela();