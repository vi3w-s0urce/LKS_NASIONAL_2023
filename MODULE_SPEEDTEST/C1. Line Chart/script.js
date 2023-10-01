const CANVAS = document.getElementById('canvas');
const CTX =  CANVAS.getContext('2d');

const PADDING_LINE = 50;
const LINE_Y = {from:{x: PADDING_LINE, y: CANVAS.height - PADDING_LINE}, to:{x: PADDING_LINE, y: PADDING_LINE}}
const LINE_X = {from:{x: PADDING_LINE, y: CANVAS.height - PADDING_LINE}, to:{x: CANVAS.width - PADDING_LINE, y: CANVAS.height - PADDING_LINE}}
const LINE_X_SIZE = (LINE_X.to.x - LINE_X.from.x);
const LINE_Y_SIZE = (LINE_Y.from.y - LINE_Y.to.y);

const LABEL_X_SHOW = 8;
const LABEL_Y_SHOW = 5;

const LABEL_X_GAP = LINE_X_SIZE / LABEL_X_SHOW;
const LABEL_Y_GAP = LINE_Y_SIZE / LABEL_Y_SHOW;

const DATA = [];
const LABEL = []

function clearCanvas() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = "white";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.strokeRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.imageSmoothingEnabled = true;
}

function line(position) {
    CTX.beginPath();
    CTX.moveTo(position.from.x, position.from.y);
    CTX.lineTo(position.to.x, position.to.y);
    CTX.stroke();
}

function line_red(position) {
    CTX.beginPath();
    CTX.moveTo(position.from.x, position.from.y);
    CTX.lineTo(position.to.x, position.to.y);
    CTX.strokeStyle = 'red';
    CTX.stroke();
}

function text(property) {
    CTX.font = "10px Arial"
    CTX.fillStyle = "black"
    CTX.fillText(property.string, property.x, property.y);
}

function label_x() {
    for (let i = 1; i <= LABEL_X_SHOW; i++) {
        line({from:{x: LINE_X.from.x + (i * LABEL_X_GAP), y: LINE_X.from.y}, to:{x: LINE_X.from.x + (i * LABEL_X_GAP), y: LINE_X.from.y + 5}})
        text({string: i, x: LINE_X.from.x + (i * LABEL_X_GAP - 3), y: LINE_Y.from.y + 20});
    }
    text({string: "Tanggal", x: LINE_X.to.x + 5, y: LINE_X.to.y + 5})
}

function label_y() {
    for (let i = 1; i <= LABEL_Y_SHOW; i++) {
        line({from:{x: LINE_Y.from.x, y: LINE_Y.from.y - (i * LABEL_Y_GAP)}, to:{x: LINE_Y.from.x - 5, y: LINE_Y.from.y - (i * LABEL_Y_GAP)}});
        text({string: i * (70 / 5), x: LINE_Y.from.x - 20, y: LINE_Y.from.y - (i * LABEL_Y_GAP) + 3});
    }
    text({string: "Jumlah", x: LINE_Y.to.x - 15, y: LINE_Y.to.y - 10})
}

function axis_line() {
    line(LINE_Y);
    line(LINE_X);
}

function chart() {
    LINE_CHART_1 = {from:{ x: LINE_X.from.x + LABEL_X_GAP, y: LINE_Y.from.y - LABEL_Y_GAP }, to:{x: LINE_X.from.x + (LABEL_X_GAP * 2), y: LINE_Y.from.y - (LABEL_Y_GAP * 1.5)}};
    LINE_CHART_2 = {from:{ x: LINE_X.from.x + (LABEL_X_GAP * 2), y: LINE_Y.from.y - (LABEL_Y_GAP * 1.5) }, to:{x: LINE_X.from.x + (LABEL_X_GAP * 3), y: LINE_Y.from.y - (LABEL_Y_GAP * LABEL_Y_SHOW)}};
    LINE_CHART_3 = {from:{ x: LINE_X.from.x + (LABEL_X_GAP * 3), y: LINE_Y.from.y - (LABEL_Y_GAP * LABEL_Y_SHOW) }, to:{x: LINE_X.from.x + (LABEL_X_GAP * 4), y: LINE_Y.from.y - (LABEL_Y_GAP * 3)}};
    LINE_CHART_4 = {from:{ x: LINE_X.from.x + (LABEL_X_GAP * 4), y: LINE_Y.from.y - (LABEL_Y_GAP * 3) }, to:{x: LINE_X.from.x + (LABEL_X_GAP * 5), y: LINE_Y.from.y - (LABEL_Y_GAP * 4.5)}};
    LINE_CHART_5 = {from:{ x: LINE_X.from.x + (LABEL_X_GAP * 5), y: LINE_Y.from.y - (LABEL_Y_GAP * 4.5) }, to:{x: LINE_X.from.x + (LABEL_X_GAP * 6), y: LINE_Y.from.y - (LABEL_Y_GAP * 1.5)}};
    LINE_CHART_6 = {from:{ x: LINE_X.from.x + (LABEL_X_GAP * 6), y: LINE_Y.from.y - (LABEL_Y_GAP * 1.5) }, to:{x: LINE_X.from.x + (LABEL_X_GAP * 7), y: LINE_Y.from.y - (LABEL_Y_GAP * 3.5)}};
    LINE_CHART_7 = {from:{ x: LINE_X.from.x + (LABEL_X_GAP * 7), y: LINE_Y.from.y - (LABEL_Y_GAP * 3.5) }, to:{x: LINE_X.from.x + (LABEL_X_GAP * 8), y: LINE_Y.from.y - (LABEL_Y_GAP * 2)}};
    line_red(LINE_CHART_1);
    line_red(LINE_CHART_2);
    line_red(LINE_CHART_3);
    line_red(LINE_CHART_4);
    line_red(LINE_CHART_5);
    line_red(LINE_CHART_6);
    line_red(LINE_CHART_7);
}

function draw() {
    clearCanvas();
    axis_line();
    label_x();
    label_y();
    chart();
}

draw();