# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

First, Following TDD I started writing tests and having the green before doing any refactors. (per commit history).

Once I was confident with the different scenarios for all possible branching, I started the refactor by moving out constant values to be used in the tests as well.

Then I extracted a couple of functions like isString(utils.js) and another two to make the code more readable and reduce the number of things the function does (Single-Responsibility-Principle).

And finally, the code now is more readable/maintainable because of the tests, and the cyclomatic complexity was reduced by removing unnecessary nested if statements and creating small functions with a single responsibility.