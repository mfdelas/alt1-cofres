import * as a1lib from "alt1";

// Verifica se Alt1 está rodando
if (!a1lib) {
    console.error("Alt1 não detectado!");
}

// Configuração de OCR para detectar XP dos cofres
let reader = new a1lib.OcrReader();
reader.addFont("runescape", "path/to/font.png");

// Variáveis para contar cofres e XP
let cofresArrombados = 0;
let xpTotal = 0;
let inicioTempo = Date.now();

// Função para detectar XP ganho
function verificarCofre() {
    const img = a1lib.captureHoldFullRs();
    let xpText = reader.findRead("XP: ", img);

    if (xpText) {
        let xpGanho = parseInt(xpText.text.replace(/\D/g, ""));
        if (!isNaN(xpGanho)) {
            xpTotal += xpGanho;
            cofresArrombados++;
            let tempoPassado = (Date.now() - inicioTempo) / 3600000;
            let xpPorHora = (xpTotal / tempoPassado).toFixed(2);

            document.getElementById("status").innerText = `Cofres: ${cofresArrombados} | XP/H: ${xpPorHora}`;
            console.log(`Cofre Arrombado! XP: ${xpGanho} | XP/H: ${xpPorHora}`);
        }
    }
}

// Atualiza a cada 5 segundos
setInterval(verificarCofre, 5000);
