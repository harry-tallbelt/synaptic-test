# synaptic-test
Sanbox project to try and use NN libraries for JS.
(As the name suggests, it started with only synaptic.js.)

The code is based on [this tutorial] (http://blog.webkid.io/neural-networks-in-javascript/)
and uses [mnist js library](https://github.com/cazala/mnist)
and [synaptic.js](https://github.com/cazala/synaptic).

The project is powered by Node.js, so a combination of `npm install` and `npm start` should get it running..
At which point you might wonder why it doesn't stop. I've no idea yet.

Synaptic.js seems to be unreasonably slow on simple architecures
(it seems it is really build for recurrent NNs),so at some it seems
to be a good idea to try out some other libraries.
[This article](http://haileyfoster.com/Neural-Networks/) seems to give
a brief owerview of several JS NN libraries, and
[this one](https://habrahabr.ru/post/304414/) is specificaly
about [brain.js](https://github.com/harthur/brain).
