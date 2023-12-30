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

const fullWord = (
	letterIdx: number,
	max_word_idx: number,
	letter: string
): Boolean => {
	return letterIdx === max_word_idx && letter !== "";
};

const BoardGame: React.FC = () => {
	const [board, setBoard] = useState(initalBoardState);
	const [rowIdx, setRowIdx] = useState(0);
	const [letterIdx, setLetterIdx] = useState(0);
	const MAX_WORD_IDX = 4;
	const MAX_ROW_IDX = 5;
	// const wordle = ["R", "E", "A", "C", "T"];

	const handleKeyPress = (event: KeyboardEvent) => {
		let keyCode = event.code;
		let key = event.key;
		let newBoard = [...board];
		let curIdx = letterIdx;
		let wordIsFull = fullWord(
			letterIdx,
			MAX_WORD_IDX,
			newBoard[rowIdx][letterIdx].letter
		);

		switch (keyCode) {
			case "Backspace":
				if (letterIdx == 0) return;
				if (wordIsFull) {
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
				break;
			case `Key${key.toUpperCase()}`:
				if (wordIsFull) {
					return;
				}
				newBoard[rowIdx][letterIdx] = {
					letter: event.key.toUpperCase(),
					status: "white",
				};
				setBoard(newBoard);
				setLetterIdx(Math.min(curIdx + 1, MAX_WORD_IDX));
				break;
			case "Enter":
				if (wordIsFull) {
					setLetterIdx(0);
					setRowIdx((prev) => Math.min((prev += 1), MAX_ROW_IDX));
				}
				break;
			default:
				break;
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
