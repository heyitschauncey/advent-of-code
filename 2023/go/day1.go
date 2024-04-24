package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"unicode"
)

func main() {
	f, err := os.Open("../inputs/day1_input.txt")
	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	scanner := bufio.NewScanner(f)

	var firstNum, lastNum int = -1, -1
	var sum int = 0

	for scanner.Scan() {
		// scan through each line of the file
		line := scanner.Text()
		fmt.Println(line)
		for _, c := range line {
			// fmt.Printf("the character is %c\n", c)
			// if the rune is not a number then continue to next iteration

			if !unicode.IsDigit(c) {
				continue
			}
			// if rune is a number convert it
			num := int(c - '0')
			// fmt.Println("NUMBER FOUND")
			// fmt.Printf("THE NUMBER IS: %d\n", num)

			// first number found is assigned to firstNum
			// all other numbers will reset lastNum which means
			// only the last number will be kept
			if firstNum == -1 {
				// fmt.Println("FIRST NUMBER IS NOW ASSIGNED")
				firstNum = num
			} else {
				lastNum = num
			}
		}
		// if there was only one number, just use firstNum
		// set lastNum to 0 for math
		if lastNum == -1 {
			lastNum = firstNum
		}

		// combine the nubmers
		num := firstNum*10 + lastNum
		fmt.Printf("COMBINED NUM: %d\n", num)

		sum = sum + num

		// reset
		firstNum, lastNum = -1, -1
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	fmt.Printf("The sum is: %d\n", sum)
}

func isDigit(r rune) bool {
	return r >= '0' && r <= '9'
}
