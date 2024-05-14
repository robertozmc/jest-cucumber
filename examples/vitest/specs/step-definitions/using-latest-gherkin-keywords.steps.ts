// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, beforeEach } from 'vitest';
import { loadFeature, defineFeature, DefineStepFunction } from '../../../../src';

import { Calculator, CalculatorOperator } from '../../src/calculator';

const feature = loadFeature('./examples/typescript/specs/features/using-latest-gherkin-keywords.feature');

defineFeature(feature, test => {
  let calculator: Calculator;
  let output: number | null;

  beforeEach(() => {
    calculator = new Calculator();
  });

  const givenIHaveEnteredXAsTheFirstOperand = (given: DefineStepFunction) => {
    given(/^I have entered "(\d+)" as the first operand$/, (firstOperand: string) => {
      calculator.setFirstOperand(parseFloat(firstOperand));
    });
  };

  const andIHaveEnteredXAsTheOperator = (and: DefineStepFunction) => {
    and(/^I have entered "([+-/*])" as the operator$/, (operator: CalculatorOperator) => {
      calculator.setCalculatorOperator(operator);
    });
  };

  const andIHaveEnteredXAsTheSecondOperand = (and: DefineStepFunction) => {
    and(/^I have entered "(\d+)" as the second operand$/, (secondOperand: string) => {
      calculator.setSecondOperand(parseFloat(secondOperand));
    });
  };

  const whenIPressTheEnterKey = (when: DefineStepFunction) => {
    when('I press the equals key', () => {
      output = calculator.computeOutput();
    });
  };

  const thenTheOutputOfXShouldBeDisplayed = (then: DefineStepFunction) => {
    then(/^the output of "(\w+)" should be displayed$/, (expectedOutput: string) => {
      if (!expectedOutput) {
        expect(output).toBeFalsy();
      } else {
        expect(output).toBe(parseFloat(expectedOutput));
      }
    });
  };

  test('Subtracting two numbers', ({ given, and, when, then }) => {
    givenIHaveEnteredXAsTheFirstOperand(given);
    andIHaveEnteredXAsTheOperator(and);
    andIHaveEnteredXAsTheSecondOperand(and);
    whenIPressTheEnterKey(when);
    thenTheOutputOfXShouldBeDisplayed(then);
  });

  test('Attempting to subtract without entering a second number', ({ given, and, when, then }) => {
    givenIHaveEnteredXAsTheFirstOperand(given);
    andIHaveEnteredXAsTheOperator(and);

    and('I have not entered a second operand', () => {
      // Nothing to do here
    });

    whenIPressTheEnterKey(when);

    then('no output should be displayed', () => {
      expect(output).toBeFalsy();
    });
  });

  test('Division operations', ({ given, and, when, then }) => {
    givenIHaveEnteredXAsTheFirstOperand(given);
    andIHaveEnteredXAsTheOperator(and);
    andIHaveEnteredXAsTheSecondOperand(and);
    whenIPressTheEnterKey(when);
    thenTheOutputOfXShouldBeDisplayed(then);
  });
});
