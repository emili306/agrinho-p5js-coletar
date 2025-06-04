
let personagem;
let itens = [];
let estado = "campo"; // Pode ser "campo" ou "cidade"
let timer = 0;

function setup() {
    createCanvas(800, 400);
    personagem = new Personagem();
    
    // Cria alguns itens aleatórios
    for (let i = 0; i < 5; i++) {
        itens.push(new Item(random(width), random(height)));
    }
}

function draw() {
    background(220);
    drawCenario();

    // Atualiza e exibe o personagem
    personagem.move();
    personagem.show();
    
    // Exibe e verifica coleta de itens
    for (let i = itens.length - 1; i >= 0; i--) {
        itens[i].show();
        if (personagem.collect(itens[i])) {
            itens.splice(i, 1); // Remove o item coletado
        }
    }

    // Exibe estado do jogo
    fill(0);
    textSize(24);
    text(`Itens coletados: ${personagem.itensColetados}`, 10, 30);
}

function drawCenario() {
    if (estado === "campo") {
        background(135, 206, 250); // céu azul
        fill(34, 139, 34); // grama verde
        rect(0, height - 100, width, 100); // chão do campo
        text("Você está no campo!", 10, 80);
    } else {
        background(200); // cor neutra para cidade
        fill(169, 169, 169); // prédios cinzentos
        for (let x = 0; x < width; x += 100) {
            rect(x, height - 150, 80, 150); // prédios
        }
        text("Você está na cidade!", 10, 80);
    }

    // Alterna entre campo e cidade a cada 5 segundos
    if (millis() - timer > 5000) {
        estado = (estado === "campo") ? "cidade" : "campo";
        timer = millis();
    }
}

class Personagem {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.itensColetados = 0;
        this.size = 30;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;
        if (keyIsDown(UP_ARROW)) this.y -= 5;
        if (keyIsDown(DOWN_ARROW)) this.y += 5;

        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height - 100); // não deixar passar da "área de chão"
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.size);
    }

    collect(item) {
        let d = dist(this.x, this.y, item.x, item.y);
        if (d < this.size / 2 + item.size / 2) {
            this.itensColetados++;
            return true;
        }
        return false;
    }
}

class Item {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.color = color(random(255), random(255), random(255));
    }

    show() {
        fill(this.color);
        ellipse(this.x, this.y, this.size);
    }}
  