const fs = require('fs');
const Network = require('./numbers-recognition-network');

const DEFAULT_NETWORK_FILENAME = './app/network.json';
const DEFAULT_TEST_DATA_AMOUNT = 20;


main();  // <--- runs main function


function main(filename, testDataAmount) {
    filename = filename || DEFAULT_NETWORK_FILENAME;
    testDataAmount = testDataAmount || DEFAULT_TEST_DATA_AMOUNT;

    const dataset = Network.getData(testDataAmount);

    // TODO:
    // Even using a desent JS serializing library (serialize-javascript),
    // one cannot deserialize an object properly, because its prototype is not saved,
    // and, while one can assign it by hand, it is not going to work for each subobject.
    // (Clarification: it IS going to work with a lot of custom logic.)
    // So, the solution is to learn how Network object is actually build
    // and construct it properly from serialized data.

    // let network = loadNetwork(filename);
    // if (network == null) {
    //     network = Network.trainNetwork(dataset);
    //     saveNetwork(network, filename);
    // }

    const network = Network.trainNetwork(dataset);
    Network.testNetwork(network, dataset);
}

function saveNetwork(network, filename) {
    const json = JSON.stringify(network);
    fs.writeFileSync(filename, json, 'utf8');
}

function loadNetwork(filename) {
    try {
        const json = fs.readFileSync(filename, 'utf8');
        const network = JSON.parse(json);
        return network;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return null;
        } else {
            throw err;
        }
    }
}