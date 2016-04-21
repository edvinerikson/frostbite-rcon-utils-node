# Change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [3.0.0] - 2016/04/21
### Project changes
 * Removed support for node 0.x (may work/may not).

### API changes
 * `Packet` now includes a `words` array instead of a `data` array.
 * `calculatePacketSize` takes a `words` array instead of a `Packet` object.

## [2.0.0] - 2015/08/13
Rewritten the library.
* restructured the library.
* Compiling with Babel.
* Switched to a functional programming style.
* Changed license to MIT.
* Added tests.
* Added eslint/style guide.
* Added Flowtype.
* Added a very simple example.
