# Demo

View demo at https://mikegedelman.github.io/calc/

To run locally, clone the repo, then in project directory:

```
npm install
npm start
```

then nagivate to http://localhost:8080

The calculator supports basic arithmetic plus percentage and sqrt. Only positive integers may be entered by the user, but subsequent operations may use floats. 

To simplify design, user input is ignored unless the calculator has been cleared, or after an operation symbol. You can't type over a result that's being displayed.

# Notes

This is a simple demo calculator written in vanilla Javascript. No dependencies, not even jQuery!
Most logic can be found in `calc.js`, and tests for that file can be found in `test.js`.

To run tests:

```
npm install  # if necessary
node_modules/karma/bin/karma start --single run
```

`main.js` includes some basic wiring for keyboard input, and contains the logic that updates calculator display when necessary.

Normally, a fair amount of things would be different, and set up for scalability, but in the interest of doing this quickly, I opted to take the simplest approach I could think of.
Here are a few things I would do differently if I were setting this project up to scale normally, to name a few:

* I'd normally use React, Angular, or Vue, but assuming everything is vanilla:
* I'd set up the ability to use `require()`, probably using webpack
* Styling would be set up with SCSS, and have its own folder structure
* Keyboard input would have its own module instead of just slopped into `main.js`
* Code linting would be set up and there would be some sort of style guide on this page
* There'd be some solution for decimal inputs and operations on decimals, to avoid ugly floats like 1.000000001
