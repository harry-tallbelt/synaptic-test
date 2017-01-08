const synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

const mnist = require('mnist');


const trainingOptions = {
    rate: 0.2,
    iterations: 10000,
    error: 0.1,
    // shuffle: true,
    // cost: Trainer.cost.CROSS_ENTROPY,
    log: 1  // log error and every 1st iterations
};

const perceptron = new Architect.Perceptron(24 * 24, 100, 10);
const trainer = new Trainer(perceptron, trainingOptions);
const set = mnist.set(1000, 50);

const trainingInfo = trainer.train(set.training);
console.log(`Training information: ${trainingInfo}.\n`);

set.test.forEach(function(item) {
    const result = perceptron.activate(item.input)
        .map(Math.round);
        
    const correct = result.indexOf(1) == item.output.indexOf(1);
    const symbol = correct ? '+' : '-';
    
    console.log(`${symbol} Network computed ${result} for ${item.output}.`);
});