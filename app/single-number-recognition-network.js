const mnist = require('mnist');
const synaptic = require('synaptic');
const Trainer = synaptic.Trainer, Architect = synaptic.Architect;

const DIGIT_TO_RECOGNISE = 0;

// NN's outputs lower than that value will not be considered significant.
const CERTAINTY_THRESHOLD = 0.7;


function getData(testDataAmount) {
    const set = mnist.set(500, testDataAmount);

    const modifyOutputs = sample => sample.output = [sample.output[DIGIT_TO_RECOGNISE]];
    set.training.forEach(modifyOutputs);
    set.test.forEach(modifyOutputs);

    return set;
}

function trainNetwork(dataset) {
    const network = new Architect.Perceptron(24 * 24, 50, 1);
    const trainer = new Trainer(network);
    const trainingOptions = {
        rate: 0.05,
        iterations: 10,
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
    dataset.test.forEach(function(sample) {
        const expected = sample.output[0];
        const result = network.activate(sample.input)[0] > CERTAINTY_THRESHOLD;
        
        const networkIsCorrect = expected == result;

        const symbol = networkIsCorrect ? (++hits, '+') : '-';
        console.log(`${symbol} Network ${networkIsCorrect ? 'guessed' : 'didn\'t guess'} the number.`);
    });

    console.log(`\nSo it's ${hits} out of ${dataset.test.length}.`);
}

module.exports.getData = getData;
module.exports.trainNetwork = trainNetwork;
module.exports.testNetwork = testNetwork;