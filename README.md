# synaptic-test
Sanbox project to try and use NN libraries for JS.
(As the name suggests, it started with only synaptic.js.)

The code is based on [this tutorial](http://blog.webkid.io/neural-networks-in-javascript/)
and uses [mnist js library](https://github.com/cazala/mnist)
and [synaptic.js](https://github.com/cazala/synaptic).

The project is powered by Node.js, so a combination of
`npm install` and `npm start` should get it running.
If there is no saved network, the code will train a new one
and a bug that prevents program from finishing will appear.
The reasons behind this one are not yet clear,
but you can safely `CTRL + C` your way out.

Synaptic.js seems to be unreasonably slow on simple architecures
(it seems, it is really build for recurrent NNs),
so it is a good idea to try out some other libraries.
[This article](http://haileyfoster.com/Neural-Networks/) seems to give
a brief owerview of several JS NN libraries, and
[this one](https://habrahabr.ru/post/304414/) is specificaly
about [brain.js](https://github.com/harthur/brain).

The files in repo are:
- `network.js` is a mnist digit recognising NN's creation,
  training and running all in one `.js` file. It might be
  more convinient to use it if you just experimenting with the network.
  To run it, instead of `main.js`, require it from `app/index.js`.
- `main.js` is a simple code for loading/creating NN
  and serializing in to a file. It is a default
  running option in `app/index.js`. The code can work with
  either `numbers-recognition-network.js` or
  `single-number-recognition-network.js`. To change the used
  network, require it form the top of `main.js`.
- `numbers-recognition-network.js` is a mnist digit recognising
  NN from `network.js`. It doesn't quite work: it probably needs more
  neurons on the hidden layer and/or more layers, but, either because
  of the slow machine, slow library or both, this is hardly achievable.
  To run it, require it from the top of `main.js`.
- `single-number-recognition-network.js` is a mnist single digit
  recognising network. It really seems to work well, hence it is
  a default running option (it is required from the `main.js`).
- `network.json` is the saved network. If it exists, the program
  will load and use it; if it doesn't exist, the program will
  train a new one and save it.
- Some other networks can be found in `networks/`.
- `brain-mnist-recogniser.js` is a mnist digit recognising NN,
  built via brain.js library. brain.js learned faster and with
  less memory and CPU consumption, than synaptic.js, so it could
  be trained on larger datasets. In particular, a training set
  of 3000 samples gave ~95% accuracy for the trained network.