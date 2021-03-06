# Services Checker

[![Build Status](https://travis-ci.org/vinceshere/services-checker.svg?branch=master)](https://travis-ci.org/vinceshere/services-checker) [![Coverage Status](https://coveralls.io/repos/github/vinceshere/services-checker/badge.svg?branch=master)](https://coveralls.io/github/vinceshere/services-checker?branch=master)

A Node.js CLI that checks if most common development services are running.

![alt text](https://raw.githubusercontent.com/vinceshere/services-checker/master/image.gif)

## Installation

```sh
$ npm install --global services-checker
```

## How to use

### Terminal

```
// -s or --service param
services-checker -s [option]

// possible options: js, php, python, repositories
services-checker -s repositories';

// default option is repositories when -s parameter isn't passed
services-checker
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/vinceshere/services-checker/tags).

## Authors

| ![Vicente Santos](https://avatars2.githubusercontent.com/u/8030457?s=150&v=3)|
|:---------------------:|
|  [Vicente Santos](https://github.com/vinceshere/)   |

See also the list of [contributors](https://github.com/vinceshere/services-checker/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
