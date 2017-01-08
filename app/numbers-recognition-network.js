const mnist = require('mnist');
const synaptic = require('synaptic');
const Trainer = synaptic.Trainer, Architect = synaptic.Architect;

// NN's outputs lower than that value will not be considered significant.
const CERTAINTY_THRESHOLD = 0.7;

function getData(testDataAmount) {
    return mnist.set(500, testDataAmount);
}

function trainNetwork(dataset) {
    const network = new Architect.Perceptron(24 * 24, 50, 10);
    const trainer = new Trainer(network);
    const trainingOptions = {
        rate: 0.05,
        iterations: 20,
        error: 1e-5,
        log: 1
    };

    const trainingInfo = trainer.train(dataset.training, trainingOptions);

    const iterations = trainingInfo.iterations;
    const error = trainingInfo.error.toFixed(5);
    const time = (trainingInfo.time / 1000).toFixed(2);
    console.log(`\nTraining information: iterations = ${iterations}, error = ${error}, time = ${time}s.\n`);

    return network;
}

function testNetwork(network, dataset) {
    let hits = 0;
    dataset.test.forEach(function(item) {
        const expected = item.output.indexOf(1);

        const results = network.activate(item.input);
        const maxResult = Math.max(...results);

        const result = maxResult < CERTAINTY_THRESHOLD ? 'unknown' : results.indexOf(maxResult);
        const symbol = expected == result ? (++hits, '+') : '-';
        
        console.log(`${symbol} Network thinks it's ${result}, when it's actually ${expected}.`);
    });

    console.log(`\nSo it's ${hits} out of ${dataset.test.length}.`);
}

module.exports.getData = getData;
module.exports.trainNetwork = trainNetwork;
module.exports.testNetwork = testNetwork;