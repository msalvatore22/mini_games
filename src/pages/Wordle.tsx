// src/components/WordInput.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../styles/wordle.css";

type Char = {
	letter: string;
	status: string;
};

type BoardState = Array<Array<Char>>;

let initalBoardState: BoardState = [
	[
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
	],
	[
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
	],
	[
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
	],
	[
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
	],
	[
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
	],
	[
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
		{ letter: "", status: "none" },
	],
];

let keyboardState: BoardState = [
	[
		{ letter: "Q", status: "none" },
		{ letter: "W", status: "none" },
		{ letter: "E", status: "none" },
		{ letter: "R", status: "none" },
		{ letter: "T", status: "none" },
		{ letter: "Y", status: "none" },
		{ letter: "U", status: "none" },
		{ letter: "I", status: "none" },
		{ letter: "O", status: "none" },
		{ letter: "P", status: "none" },
	],
	[
		{ letter: "A", status: "none" },
		{ letter: "S", status: "none" },
		{ letter: "D", status: "none" },
		{ letter: "F", status: "none" },
		{ letter: "G", status: "none" },
		{ letter: "H", status: "none" },
		{ letter: "J", status: "none" },
		{ letter: "K", status: "none" },
		{ letter: "L", status: "none" },
	],
	[
		{ letter: "Enter", status: "none" },
		{ letter: "Z", status: "none" },
		{ letter: "X", status: "none" },
		{ letter: "C", status: "none" },
		{ letter: "V", status: "none" },
		{ letter: "B", status: "none" },
		{ letter: "N", status: "none" },
		{ letter: "M", status: "none" },
		{ letter: "Del", status: "none" },
	],
];

interface LetterBoxProps {
	letter: string;
	color: string;
	type: string;
}

const StyledLetterBox = styled.div.attrs<{ $type?: string }>((props) => ({}))`
	border: 1px solid
		${({ color }) => {
			if (color === "none") {
				return "white";
			}
			return color;
		}};
	border-radius: ${(props) => {
		if (props.$type == "board") {
			return "1px";
		} else {
			return "6px";
		}
	}};
	height: 60px;
	width: ${(props) => {
		if (props.$type == "keyboard") {
			return "40px";
		} else {
			return "60px";
		}
	}};
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 3px;
	font-size: ${(props) => {
		if (props.$type == "board") {
			return "xx-large";
		} else {
			return "";
		}
	}};
	background-color: ${({ color }) => color};
	cursor: ${(props) => {
		if (props.$type == "keyboard") {
			return "pointer";
		}
	}};
`;

const LetterBox: React.FC<LetterBoxProps> = ({ letter, color, type }) => {
	return (
		<StyledLetterBox color={color} $type={type}>
			{letter}
		</StyledLetterBox>
	);
};

const fullWord = (
	letterIdx: number,
	max_word_idx: number,
	letter: string
): Boolean => {
	return letterIdx === max_word_idx && letter !== "";
};

// const setColor = (board: BoardState, word: string): BoardState => {

// }

const Wordle: React.FC = () => {
	const [board, setBoard] = useState(initalBoardState);
	const [keyboard, setKeyboard] = useState(keyboardState);
	const [rowIdx, setRowIdx] = useState(0);
	const [letterIdx, setLetterIdx] = useState(0);
	const MAX_WORD_IDX = 4;
	const MAX_ROW_IDX = 5;
	const wordle = ["R", "E", "A", "C", "T"];

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
        
        let newKeyboard = [...keyboard]

		switch (keyCode) {
			case "Backspace":
				if (letterIdx == 0) return;
				if (wordIsFull) {
					setLetterIdx(MAX_WORD_IDX);
					newBoard[rowIdx][letterIdx] = {
						letter: "",
						status: "none",
					};
				} else {
					setLetterIdx(curIdx - 1);
					newBoard[rowIdx][curIdx - 1] = {
						letter: "",
						status: "none",
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
					status: "none",
				};
				setBoard(newBoard);
				setLetterIdx(Math.min(curIdx + 1, MAX_WORD_IDX));
				break;
			case "Enter":
				if (wordIsFull) {
					// color change
					newBoard[rowIdx].forEach((c, i) => {
						if (wordle.includes(c.letter)) {
							if (wordle[i] === c.letter) {
								newBoard[rowIdx][i] = {
									letter: c.letter,
									status: "#538d4e",
								};
							} else {
								newBoard[rowIdx][i] = {
									letter: c.letter,
									status: "#b59f3b",
								};
							}
						} else {
                            newBoard[rowIdx][i] = {
								letter: c.letter,
								status: "#3a3a3d",
							};
                        }
					});
                    newBoard[rowIdx].forEach((c, i) => {
                        newKeyboard.forEach((row, i) => {
                            row.forEach((l, k) => {
                                if(c.letter === l.letter){
                                    newKeyboard[i][k] = c
                                }
                            })
                        })
                    })
					
					setBoard(newBoard);
                    setKeyboard(newKeyboard)
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
									type="board"
									key={idx}
								/>
							);
						})}
					</div>
				);
			})}
			{keyboard.map((k, idx) => {
				return (
					<div className="wordle-word-row" key={idx}>
						{k.map((row, idx) => {
							return (
								<LetterBox
									letter={row.letter}
									color={row.status}
									type="keyboard"
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

export default Wordle;
