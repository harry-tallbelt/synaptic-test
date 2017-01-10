const fs = require('fs');
const synaptic = require('synaptic');
const Network = synaptic.Network;
const MyNetwork = require('./single-number-recognition-network');

const DEFAULT_NETWORK_FILENAME = './app/network.json';
const DEFAULT_TEST_DATA_AMOUNT = 100;


main();  // <--- runs main function


function main(filename, testDataAmount) {
    filename = filename || DEFAULT_NETWORK_FILENAME;
    testDataAmount = testDataAmount || DEFAULT_TEST_DATA_AMOUNT;

    const dataset = MyNetwork.getData(testDataAmount);

    let network = loadNetwork(filename);
    if (network == null) {
        network = MyNetwork.trainNetwork(dataset);
        saveNetwork(network, filename);
    }

    // This returns a function equivalent to network.activate(),
    // only it does not depend on the library (can be serialized).
    // network.standalone();

    MyNetwork.testNetwork(network, dataset);
}

function saveNetwork(network, filename) {
    const networkData = network.toJSON();
    const json = JSON.stringify(networkData);
    fs.writeFileSync(filename, json, 'utf8');
}

function loadNetwork(filename) {
    try {
        const json = fs.readFileSync(filename, 'utf8');
        const networkData = JSON.parse(json);
        const network = Network.fromJSON(networkData);
        return network;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return null;
        } else {
            throw err;
        }
    }
}