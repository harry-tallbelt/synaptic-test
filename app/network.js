const synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

const mnist = require('mnist');


const trainingOptions = {
    rate: 0.05,
    iterations: 40,
    error: 1e-5,
    log: 1
};

const perceptron = new Architect.Perceptron(24 * 24, 40, 10);
const trainer = new Trainer(perceptron);
const set = mnist.set(500, 20);

const trainingInfo = trainer.train(set.training, trainingOptions);

const iterations = trainingInfo.iterations;
const error = trainingInfo.error.toFixed(5);
const time = (trainingInfo.time / 1000).toFixed(2);

console.log(`\nTraining information: iterations = ${iterations}, error = ${error}, time = ${time}s .\n`);

let hits = 0;
set.test.forEach(function(item) {
    const expected = item.output.indexOf(1);
    const result = perceptron.activate(item.input)
        .map(Math.round)
        .indexOf(1);

    const symbol = expected == result ? (++hits, '+') : '-';
    console.log(`${symbol} Network thinks it's ${result}, when it's actually ${expected}.`);
});

console.log(`\nSo it's ${hits} out of ${set.test.length}.`);