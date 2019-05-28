# Project Generator

A npm project which can be installed globally and used to generate projects

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
