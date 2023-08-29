const { open } = require('node:fs/promises');

/**
 * Helper function to check if a given calorieSum is larger than any of
 * the current largest sums
 * @param {Array<number>} largestThreeCalorieCounts The three largest calorie counts
 * @param {number} calorieSum the new calorie sum to compare
 * @returns {void}
 */
function checkIfLarger(largestThreeCalorieCounts, calorieSum) {
    largestThreeCalorieCounts.push(calorieSum);

    // Why is this always so hard to understand?????
    // we want the largest values at the front
    // b - a will move a to the left if a is bigger
    // I wish JS had a heap impl
    largestThreeCalorieCounts.sort((a, b) => b - a);

    largestThreeCalorieCounts.pop();
}

/**
 * Async function to handle looping through file contents to find calorie amounts and sum them together
 */
async function getLargestCalorieAmount() {
    const file = await open('./day1_input.txt');
    const rf = await file.readFile();
    const fileString = rf.toString();
    file.close();

    // I like to declare my variables at the beginning instead of declaring a new
    // one every iteration of a looop
    // sue me
    // Part 2 needs the top 3 largest so we change largestCalorieSum to largestThreeCalorieCounts,
    // let largestCalorieSum = 0;
    const largestThreeCalorieCounts = [0, 0, 0];
    let currentCalorieSum = 0;
    let currentNumStr = '';
    let newLineCount = 0;
    let parsedNum = 0;

    for (const char of fileString) {
        parsedNum = parseInt(char);
        if (parsedNum >= 0) {
            currentNumStr += parsedNum;
            newLineCount = 0;
            continue;
        }

        // If reach this comment, then we encountered a new line character
        // we increment the newLineCount to keep track of how many newLines
        // we've seen.
        newLineCount++;

        // Now we need to check if we've doubled up on newLines
        // a single count means there is a valid number in currentNumStr
        // a double count means that we have reached the end of a given elf's data
        if (newLineCount > 1) {
            // we have reached the end of a given elf's data

            // PART 1
            // now we check if the current is larger that the current largest
            //  if it is we set largestCalorieSum to the new value
            // if (largestCalorieSum < currentCalorieSum) {
            //     largestCalorieSum = currentCalorieSum;
            //     console.log(`NEW LARGEST FOUND: ${largestCalorieSum}`);
            // }

            // PART 2
            // use helper function to compare current sum to top three and
            // replace if larger
            checkIfLarger(largestThreeCalorieCounts, currentCalorieSum);

            // since we have reached the end of a given elfs calories
            // we reset the currentCalorieSum and newLineCount to
            // continue on to the next elf
            currentCalorieSum = 0;
            newLineCount = 0;
        } else if (newLineCount == 1) {
            // we have reached the end of a number so parse the entire
            // number to a int and add it to the sum.
            currentCalorieSum += parseInt(currentNumStr);
            currentNumStr = '';
        }
    }

    console.log(largestThreeCalorieCounts);
    console.log(
        largestThreeCalorieCounts[0] +
            largestThreeCalorieCounts[1] +
            largestThreeCalorieCounts[2]
    );
}

getLargestCalorieAmount();
