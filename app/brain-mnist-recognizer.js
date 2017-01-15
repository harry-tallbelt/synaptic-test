const mnist = require('mnist')
const brain = require('brain.js')

const set = mnist.set(3000, 200)
const network = new brain.NeuralNetwork({
    hiddenLayers: 50
})
network.train(set.training, {
    errorThresh: 5e-3,
    iterations: 200,
    log: true,
    logPeriod: 1,
    learningRate: 0.3
})

let hits = 0
console.log()

set.test.forEach(testSample => {
    const results = network.run(testSample.input)
    const correctAnswer = testSample.output.indexOf(1)
    const max = Math.max(...results)
    const networkAnswer = results.indexOf(max)
    
    const successSymbol = (networkAnswer === correctAnswer) ? (++hits, '+') : '-'
    console.log(`${successSymbol} Network thinks ${correctAnswer} is ${networkAnswer}.`)
})

const percentage = Math.round(hits / set.test.length * 100)
console.log(`\nSo it is ${hits} out of ${set.test.length} or ${percentage}%.`)