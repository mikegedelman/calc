// Normally we wouldn't pollute the global namespace here
const calc = new Calculator();
const display = document.getElementById('display');
display.value = null;

// Hook up keyboard
const keymap = {
	'0': () => calc.press(0),
	'1': () => calc.press(1),
	'2': () => calc.press(2),
	'3': () => calc.press(3),
	'4': () => calc.press(4),
	'5': () => calc.press(5),
	'6': () => calc.press(6),
	'7': () => calc.press(7),
	'8': () => calc.press(8),
	'9': () => calc.press(9),
	'+': () => calc.add(),
	'-': () => calc.sub(),
	'*': () => calc.mul(),
	'/': () => calc.div(),
	'%': () => calc.pct(),
	'Enter': () => calc.equals(),
	'=': () => calc.equals(),
	'Clear': () => calc.clear(),
	'Escape': () => calc.clear(),
	'Backspace': () => calc.backspace()
};

document.onkeydown = e => {
    e = e || window.event;
    const key = e.key
    
    if (keymap[key]) {
    	e.preventDefault();
    	keymap[key]();
    }
};

calc.on('update-display', () => {
	display.innerHTML = calc.getDisplay();
});