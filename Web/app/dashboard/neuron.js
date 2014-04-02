var global_loss = 0.9;
var global_threshold = 1;

function rand() {
    return 1 - 2 * Math.random();
}
function neuron(threshold, inputs, weights, lastspike, loss, x, y, value) {
    this.threshold = threshold || global_threshold;
    this.inputs = inputs || [];
    this.weights = weights || [];
    if (this.weights.length != this.inputs.length) {
        this.weights.length = this.inputs.length;
        for (var i = 0; i < this.weights.length; i++) {
            if (!this.weights[i]) {
                this.weights[i] = rand();
            }
        }
    }
    this.lastspike = lastspike || 0;
    this.loss = loss || global_loss;
    this.x = x || 0;
    this.y = y || 0;
    this.value = value || 0;
}

neuron.prototype.init = function (threshold, inputs, weights, lastspike, loss, x, y, value) {
    this.threshold = threshold || global_threshold;
    this.inputs = inputs || [];
    this.weights = weights || [];
    if (this.weights.length != this.inputs.length) {
        this.weights.length = this.inputs.length;
        for (var i = 0; i < this.weights.length; i++) {
            if (!this.weights[i]) {
                this.weights[i] = rand();
            }
        }
    }
    this.lastspike = lastspike || 0;
    this.loss = loss || global_loss;
    this.x = x || 0;
    this.y = y || 0;
    this.value = value || 0;
}

neuron.prototype.fire = function () {
    with (this) {
        var v = 0;

        //mark steps since last spike
        lastspike++;
        if (spike) {
            value = 0;
        }

        //sum all inputs
        for (var i = 0, len = inputs.length; i < len; i++) {
            v += inputs[i].spike * weights[i];
        }

        //todo: spike timing dependent add
        value *= loss;
        value += v;
        history.push(value);

        //check if needs to fire
        if (value > threshold) {
            spike = 1;
            lastspike = 0;
        }
        else {
            spike = 0;
        }

        //todo: plasticity
    }
}

var columns = 10;
var global_speed = 10;

function ind(i, j) {
    return i * columns + j;
}

function init_all() {
    //inits

    var brain = [];
    for (var i = 0; i < columns; i++)
        for (var j = 0; j < columns; j++) {
            brain.push(new window.neuron());
        }

    var tablestring = '<table border=1 class="brain">';
    for (var i = 0; i < columns; i++) {
        tablestring += '<tr>';
        for (var j = 0; j < columns; j++) {
            tablestring += '<td class="cell" id="' + j + '_' + i + '">&nbsp;</td>';
        }
        tablestring += '</tr>';
    }
    var braintable = $(tablestring).appendTo($('body'));

    for (var i = 0; i < columns; i++)
        for (var j = 0; j < columns; j++) {
            var neuron = brain[ind(i, j)];
            var inputs = [];
            if (i > 0) {
                if (j > 0) {
                    inputs.push(brain[ind(i - 1, j - 1)]);
                }
                inputs.push(brain[ind(i - 1, j)]);
                if (j < columns - 1) {
                    inputs.push(brain[ind(i - 1, j + 1)]);
                }
            }
            if (i < columns - 1) {
                if (j > 0) {
                    inputs.push(brain[ind(i + 1, j - 1)]);
                }
                inputs.push(brain[ind(i + 1, j)]);
                if (j < columns - 1) {
                    inputs.push(brain[ind(i + 1, j + 1)]);
                }
            }
            if (j > 0) {
                inputs.push(brain[ind(i, j - 1)]);
            }
            if (j < columns - 1) {
                inputs.push(brain[ind(i, j + 1)]);
            }
            neuron.init(1, inputs, [], 0, null, j, i, 0);
        }

    setTimeout(run_all, 10);
}

function run_all() {
    var i;
    for (i = 0; i < columns; i++) {

    }
    setTimeout(run_all, global_speed);
}