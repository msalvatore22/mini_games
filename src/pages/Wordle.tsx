// src/components/WordInput.tsx
import React, { useState, useEffect } from "react";
import "../styles/wordle.css";

type Char = {
	letter: string;
	status: string;
};

type BoardState = Array<Array<Char>>;

let initalBoardState: BoardState = [
	[
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
	],
	[
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
	],
	[
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
	],
	[
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
	],
	[
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
	],
	[
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
		{ letter: "", status: "white" },
	],
];

interface LetterBoxProps {
	letter: string;
	color: string;
}

const LetterBox: React.FC<LetterBoxProps> = ({ letter, color }) => {
	return <div className="wordle-char">{letter}</div>;
};

interface WordProps {
	rowIndex: number;
}

// const Word: React.FC<WordProps> = ({ rowIndex }) => {
// 	const [chars, setChars] = useState<string[]>(["", "", "", "", ""]);
// 	const [charIdx, setCharIdx] = useState(0);

// 	const handleKeyPress = (event: KeyboardEvent) => {
// 		console.log(event.key);
// 		// if letter
// 		const newWord = chars.map((c, i) => {
// 			if (i == charIdx) {
// 				return (c = event.key);
// 			} else {
// 				return c;
// 			}
// 		});
// 		setCharIdx((prev) => (prev += 1));
// 		setChars(newWord);
// 	};

// 	useEffect(() => {
// 		// Set up event listeners for keyboard input
// 		window.addEventListener("keydown", handleKeyPress);

// 		// Clean up event listeners and interval on component unmount
// 		return () => {
// 			window.removeEventListener("keydown", handleKeyPress);
// 		};
// 	}, [handleKeyPress]);

// 	return (
// 		<div className="wordle-word">
// 			{chars.map((val, i) => (
// 				<Char key={i} char={val} />
// 			))}
// 		</div>
// 	);
// };

const BoardGame: React.FC = () => {
	const [board, setBoard] = useState(initalBoardState);
	const [rowIdx, setRowIdx] = useState(0);
	const [letterIdx, setLetterIdx] = useState(0);
	const [curWord, setCurWord] = useState(board[rowIdx]);
	const MAX_WORD_IDX = 4;
	console.log(curWord);
	console.log(letterIdx);
	const handleKeyPress = (event: KeyboardEvent) => {
		let keyCode = event.code;
		let key = event.key;
		let newBoard = [...board];
		let curIdx = letterIdx;

		const handleBackSpace = () => {
			if (letterIdx == 0) return;
			if (
				letterIdx === MAX_WORD_IDX &&
				newBoard[rowIdx][letterIdx].letter !== ""
			) {
				setLetterIdx(MAX_WORD_IDX);
				newBoard[rowIdx][curIdx] = {
					letter: "",
					status: "white",
				};
			} else {
				setLetterIdx(curIdx - 1);
				newBoard[rowIdx][curIdx - 1] = {
					letter: "",
					status: "white",
				};
			}
			setBoard(newBoard);
		};

		if (key === "Backspace") {
			handleBackSpace();
		}

		if (newBoard[rowIdx][MAX_WORD_IDX].letter != "") {
			return;
		}

		if (keyCode === `Key${key.toUpperCase()}`) {
			newBoard[rowIdx][letterIdx] = {
				letter: event.key,
				status: "white",
			};
			setBoard(newBoard);
			setLetterIdx(Math.min((curIdx + 1), MAX_WORD_IDX));
		}
	};

	useEffect(() => {
		// Set up event listeners for keyboard input
		window.addEventListener("keydown", handleKeyPress);

		// Clean up event listeners and interval on component unmount
		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleKeyPress]);

	return (
		<div className="wordle-game">
			{board.map((b, idx) => {
				return (
					<div className="wordle-word-row" key={idx}>
						{b.map((row, idx) => {
							return (
								<LetterBox
									letter={row.letter}
									color={row.status}
									key={idx}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default BoardGame;
