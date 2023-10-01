const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');

const PADDING_AXIS = 50;

const AXIS_X = {
    from:{
        x: PADDING_AXIS,
        y: CANVAS.height - PADDING_AXIS,
    },
    to: {
        x: CANVAS.width - PADDING_AXIS,
        y: CANVAS.height - PADDING_AXIS,
    }
}

const AXIS_Y = {
    from:{
        x: PADDING_AXIS,
        y: CANVAS.height - PADDING_AXIS,
    },
    to: {
        x: PADDING_AXIS,
        y: PADDING_AXIS,
    }
}

const AXIS_X_SIZE = AXIS_X.to.x - AXIS_X.from.x;
const AXIS_Y_SIZE = AXIS_Y.from.y - AXIS_Y.to.y;
const AXIS_X_TITLE = {
    string: "Tanggal",
    x: AXIS_X.to.x + 5,
    y: AXIS_X.to.y + 3,
}
const AXIS_Y_TITLE = {
    string: "Jumlah",
    x: AXIS_Y.to.x - 15,
    y: AXIS_Y.to.y - 10,
}

const CHART_DATA = [14, 21, 70, 35, 60, 16, 48, 30];
const CHART_LABEL = [1, 2, 3, 4, 5, 6, 7, 8];

const LABEL_X_SHOW = CHART_LABEL.length;
const LABEL_Y_SHOW = 5;
const LABEL_X_GAP = AXIS_X_SIZE / LABEL_X_SHOW;
const LABEL_Y_GAP = AXIS_Y_SIZE / LABEL_Y_SHOW;


/*Logic Function*/

function drawCanvas() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = "#FFF";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

function line(property) {
    CTX.beginPath();
    CTX.moveTo(property.from.x, property.from.y);
    CTX.lineTo(property.to.x, property.to.y);
    CTX.stroke();
}

function lineChart(property) {
    CTX.beginPath();
    CTX.strokeStyle = "#ff3737";
    CTX.moveTo(property.from.x, property.from.y);
    CTX.lineTo(property.to.x, property.to.y);
    CTX.stroke();
}

function text(property) {
    CTX.font = "10px Arial";
    CTX.fillStyle = "#000";
    CTX.fillText(property.string, property.x, property.y);
}

function lineAxis() {
    line(AXIS_X);
    line(AXIS_Y);
}

function labelDraw() {
    text(AXIS_X_TITLE);
    text(AXIS_Y_TITLE);
    for (let i = 0; i < LABEL_X_SHOW; i++) {
        line({
            from:{
                x: AXIS_X.from.x + ((i + 1) * LABEL_X_GAP),
                y: AXIS_X.from.y,
            },
            to:{ 
                x: AXIS_X.from.x + ((i + 1) * LABEL_X_GAP),
                y: AXIS_X.from.y + 5,
            }
        });
        text({
            string: CHART_LABEL[i],
            x: AXIS_X.from.x + ((i + 1) * LABEL_X_GAP) - 3,
            y: AXIS_X.from.y + 20,
        })
    }
    for (let i = 1; i <= LABEL_Y_SHOW; i++) {
        line({ 
            from:{ 
                x: AXIS_Y.from.x,
                y: AXIS_Y.from.y - (i * LABEL_Y_GAP),
            },
            to:{ 
                x: AXIS_Y.from.x - 5,
                y: AXIS_Y.from.y - (i * LABEL_Y_GAP),
            }
        });
        text({
            string: i * (70 / LABEL_Y_SHOW),
            x: AXIS_Y.from.x - 20,
            y: AXIS_Y.from.y - (i * LABEL_Y_GAP) + 3,
        })
    }
}

function chart() {
    for (let index = 0; index < CHART_DATA.length; index++) {
        lineChart({
            from:{
                x: AXIS_X.from.x + ((index + 1) * LABEL_X_GAP),
                y: AXIS_Y.from.y - (CHART_DATA[index] * (LABEL_Y_GAP / (70 / LABEL_Y_SHOW))),
            },
            to: {
                x: AXIS_X.from.x + ((index + 2) * LABEL_X_GAP),
                y: AXIS_Y.from.y - (CHART_DATA[index + 1] * (LABEL_Y_GAP / (70 / LABEL_Y_SHOW))),
            }
        });
    }
}

function draw() {
    drawCanvas();
    lineAxis();
    labelDraw();
    chart();
}

draw();