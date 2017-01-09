# synaptic-test
Sanbox project to try and use NN libraries for JS.
(As the name suggests, it started with only synaptic.js.)

The code is based on [this tutorial] (http://blog.webkid.io/neural-networks-in-javascript/)
and uses [mnist js library](https://github.com/cazala/mnist)
and [synaptic.js](https://github.com/cazala/synaptic).

The project is powered by Node.js, so a combination of `npm install` and `npm start` should get it running..
At which point you might wonder why it doesn't stop. I've no idea yet.

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
  even more convinient to use it at this point, as the
  `main.js` code for serializing NN doesn't work anyway.
  To run it, instead of `main.js`, require it from `app/index.js`.
- `main.js` is a simple code for loading/creating NN
  and serializing in to a file. Like a lot of simple code,
  it doesn't work: serializing NN didn't work out,
  there's a comment in the file. Yet, it is a default
  running option in `app/index.js`. The code can work with
  either `numbers-recognition-network.js` or
  `single-number-recognition-network.js`. To change the used
  network, require it form the top of `main.js`.
- `numbers-recognition-network.js` is a mnist digit recognising
  NN from `network.js`. It doesn't quite work: it probably needs more
  neurons on the hidden layer and/or more layers, but, either because
  of the slow machine, slow library or both, it is hardly achievable.
  To run it, require it from the top of `main.js`.
- `single-number-recognition-network.js` is a mnist single digit
  recognising network. It really seems to work well, hence it is
  a default running option (it is required from the `main.js`).
  
