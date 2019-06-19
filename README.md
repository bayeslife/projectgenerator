# Project Generator

A npm project which can be installed globally and used to generate projects.

## Why?

When creating solution it will be necessary to create projects.  The need to create projects quickly increases with the desire to create more re-usable artefacts.


Projects generally need
- a READ ME structure
- a structure for version information
- a structure for source, test source
- a linting capability
- a task to run unit tests
- a task to build distributables
- a task to publish distributables

It is tedious and difficult to standardize when there is no automated way to establish these things if a consistent way.

One mechanism to enable standardization is to create projects from templates projects
In MineQ there has been some attempt at this.
- https://github.com/quartileone/MineQ-API-NodeJS-Template : A template for a node js back end service 


Another approach is a a project generator that can layout the project in standard form but also populate it based on questions answers.

There are plenty of example of this in: 
- [Yeomon](https://yeoman.io/) : searchable multi language public open project generator 
- [React Create SCript](https://github.com/facebook/create-react-app) : react-create-scripts package explicity to layout projects in standard ways
- [Express Generator](https://expressjs.com/en/starter/generator.html) : express generator
- [Electrode](http://www.electrode.io/) : Walmart open source platform for applications 

It is very easy to create our own generator and this project is an example of this.

An further capability is to use [archetypes](https://gitlab.com/short-interval-control/archetype).

## Usage
### Install
```npm install```

 ### How to install globally
```npm install -g```

### How to use after installing globally

```
$ generate

? What project template would you like to generate? (Use arrow keys)
❯ api-project
  documentation-project
  gen-project
  lib-project
  processor-project
  ui-component-project
```

## Development

## How to add more templates

Create another directory under templates
Use handlebars escaping ``{{ key }}``` to interpolate values into the template.


## Reference

This was create after reviewing the Walmart tooling available through [electrode](http://www.electrode.io/)
