describe('calculator', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    it('adds', () => {
        calc.setDisplay(1);
        calc.add();
        calc.setDisplay(2);
        calc.equals();

        expect(calc.getDisplay()).toBe(3);
    });

    it('adds multiple numbers', () => {
        calc.setDisplay(1);
        calc.add();
        calc.setDisplay(2);
        calc.add();
        calc.setDisplay(3);
        calc.equals();

        expect(calc.getDisplay()).toBe(6);
    });

    it('subtracts', () => {
        calc.setDisplay(5);
        calc.sub();
        calc.setDisplay(2);
        calc.equals();

        expect(calc.getDisplay()).toBe(3);
    })

    it('multiplies', () => {
        calc.setDisplay(10);
        calc.mul();
        calc.setDisplay(20);
        calc.equals();

        expect(calc.getDisplay()).toBe(200);
    });

    it('divides', () => {
        calc.setDisplay(400);
        calc.div();
        calc.setDisplay(10);
        calc.equals();

        expect(calc.getDisplay()).toBe(40);
    });

    it('percentage', () => {
        calc.setDisplay(32);
        calc.pct();

        expect(calc.getDisplay()).toBe(0.32);
    });

    it('sqrt', () => {
        calc.setDisplay(9);
        calc.sqrt();

        expect(calc.getDisplay()).toBe(3);
    });

    it('can handle key presses', () => {
        // Enter "10" and multiply by 3
        calc.press(1);
        calc.press(0);

        expect(calc.getDisplay()).toBe(10);

        calc.mul();
        calc.press(3);
        calc.equals();

        expect(calc.getDisplay()).toBe(30);
    });

    it('ignores key presses in a result', () => {
        calc.press(1);
        calc.press(0);
        calc.pct();

        calc.press(2);
        expect(calc.getDisplay()).toBe(0.1);
    });


    it('can clear', () => {
        calc.press(1);
        calc.clear();

        expect(calc.getDisplay()).toBeFalsy();
    });

    it('can backspace', () => {
        calc.press(1);
        calc.press(2);
        calc.press(3);
        calc.backspace();
        calc.press(4);
        calc.press(5);
        calc.backspace();

        expect(calc.getDisplay()).toBe(124);
    })

    it('emits update-display events', done => {
        calc.on('update-display', done);

        calc.press(1);
    });
});