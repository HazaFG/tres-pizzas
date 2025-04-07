let partes = 0;

function setup() {
    createCanvas(1230, 500);

    let boton = document.querySelector(".btn-partir");
    boton.addEventListener("click", () => {
        let valor = document.querySelector(".barra").value;
        partes = parseInt(valor);
    });
}

function draw() {
    background(255);

    // Dibujar 3 pizzas
    fill(255, 204, 0);
    stroke(150, 75, 0);
    strokeWeight(4);

    ellipse(205, 250, 300, 300);   
    ellipse(615, 250, 300, 300);   
    ellipse(1025, 250, 300, 300);  

    if (partes > 1) {
        // vamos a definir las pizzas y sus algoritmos
        const pizzas = [
            { x: 205, y: 250, metodo: "pendiente" },
            { x: 615, y: 250, metodo: "dda" },
            { x: 1025, y: 250, metodo: "bresenham" }
        ];

        for (let pizza of pizzas) {
            let cx = pizza.x;
            let cy = pizza.y;
            let radio = 150;

            for (let i = 0; i < partes; i++) {
                let angulo = TWO_PI * i / partes;
                let x2 = cx + radio * cos(angulo);
                let y2 = cy + radio * sin(angulo);

                switch (pizza.metodo) {
                    case "pendiente":
                        drawLinePendiente(cx, cy, x2, y2);
                        break;
                    case "dda":
                        drawLineDDA(cx, cy, x2, y2);
                        break;
                    case "bresenham":
                        drawLineBresemham(cx, cy, x2, y2);
                        break;
                }
            }
        }
    }
}

// punta recta xd
function drawLinePendiente(x1, y1, x2, y2) {
    stroke(255, 0, 150);
    strokeWeight(2);

    if (x1 === x2) {
        let yStart = Math.min(y1, y2);
        let yEnd = Math.max(y1, y2);
        for (let y = yStart; y <= yEnd; y++) {
            point(x1, y);
        }
    } else {
        if (x1 > x2) [x1, y1, x2, y2] = [x2, y2, x1, y1];
        let m = (y2 - y1) / (x2 - x1);
        let b = y1 - m * x1;

        for (let x = x1; x <= x2; x++) {
            let y = m * x + b;
            point(x, y);
        }
    }
}

// dda
function drawLineDDA(x1, y1, x2, y2) {
    stroke(0, 150, 255);
    strokeWeight(2);

    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.max(Math.abs(dx), Math.abs(dy));

    let xInc = dx / steps;
    let yInc = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        point(x, y);
        x += xInc;
        y += yInc;
    }
}

// bresenham
function drawLineBresemham(x0, y0, x1, y1) {
    stroke(0, 200, 0);
    strokeWeight(2);

    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        point(x0, y0);
        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}
