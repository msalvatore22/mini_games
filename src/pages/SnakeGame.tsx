import React, { useState, useEffect, useCallback } from "react";
import "../styles/snake.css";

interface BoardProps {
	children: React.ReactNode;
}

const Board: React.FC<BoardProps> = ({ children }) => {
	return <div className="snake-board">{children}</div>;
};

interface CellProps {
	isFood?: boolean;
	isSnake?: boolean;
}

const Cell: React.FC<CellProps> = ({ isFood, isSnake }) => {
	return (
		<div
			className="snake-cell"
			style={{
				backgroundColor: isFood
					? "rgba(251, 93, 93, 0.5)"
					: isSnake
					? "#FFFF"
					: "#242424",
			}}
		></div>
	);
};

const initialSnake = [{ x: 9, y: 9 }];
const initialGameSpeed = 500

interface Food {
	x: number;
	y: number;
}

const SnakeGame: React.FC = () => {
	const generateFood = () => {
		let newFood: Food;
		do {
			newFood = {
				x: Math.floor(Math.random() * 20),
				y: Math.floor(Math.random() * 20),
			};
		} while (
			snake.some(
				(cell) => cell.x === newFood.x && cell.y === newFood.y
			)
		);

		return newFood;
	};

	const [snake, setSnake] = useState(initialSnake);
	const [food, setFood] = useState(generateFood());
	const [direction, setDirection] = useState<
		"UP" | "DOWN" | "LEFT" | "RIGHT"
	>("RIGHT");
	const [gameSpeed, setGameSpeed] = useState(initialGameSpeed);

	const moveSnake = useCallback(() => {
		setSnake((prevSnake) => {
			const newSnake = [...prevSnake];
			const head = { ...newSnake[0] };

			switch (direction) {
				case "UP":
					head.y -= 1;
					break;
				case "DOWN":
					head.y += 1;
					break;
				case "LEFT":
					head.x -= 1;
					break;
				case "RIGHT":
					head.x += 1;
					break;
				default:
					break;
			}

			newSnake.unshift(head);
			newSnake.pop();

			return newSnake;
		});
	}, [snake, direction]);

	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			switch (event.key) {
				case "ArrowUp":
					if (direction !== "DOWN") {
						setDirection("UP");
					}
					break;
				case "ArrowDown":
					if (direction !== "UP") {
						setDirection("DOWN");
					}
					break;
				case "ArrowLeft":
					if (direction !== "RIGHT") {
						setDirection("LEFT");
					}
					break;
				case "ArrowRight":
					if (direction !== "LEFT") {
						setDirection("RIGHT");
					}
					break;
				default:
					break;
			}
		},
		[direction, setDirection]
	);

	const handleGameTick = () => {
		moveSnake();

		// Check for collisions with walls, self, or food
		const head = snake[0];

		// Check for collision with walls
		if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
			// Game over - reset the game
			setSnake(initialSnake);
			setFood(generateFood());
			setDirection("RIGHT");
			setGameSpeed(initialGameSpeed);
			return;
		}

		// Check for collision with self
		for (let i = 1; i < snake.length; i++) {
			if (snake[i].x === head.x && snake[i].y === head.y) {
				// Game over - reset the game
				setSnake(initialSnake);
				setFood(generateFood());
				setDirection("RIGHT");
				setGameSpeed(initialGameSpeed)
				return;
			}
		}

		// Check for collision with food
		if (head.x === food.x && head.y === food.y) {
			// Snake eats the food, grow the snake and generate new food
			setSnake((prevSnake) => {
				const newHead = { x: head.x, y: head.y };
				return [...prevSnake, newHead];
			});
			setFood(generateFood());
			setGameSpeed((prevSpeed) => Math.max(100, prevSpeed - 100));
		}
	};

	useEffect(() => {
		// Set up event listeners for keyboard input
		window.addEventListener("keydown", handleKeyPress);

		// Set up interval for game ticks
		const intervalId = setInterval(handleGameTick, gameSpeed); // Adjust speed as needed

		// Clean up event listeners and interval on component unmount
		return () => {
			window.removeEventListener("keydown", handleKeyPress);
			clearInterval(intervalId);
		};
	}, [handleKeyPress, handleGameTick]);

	return (
		<div className="snake-game">
			<Board>
				{Array.from({ length: 20 * 20 }).map((_, index) => {
					const x = index % 20;
					const y = Math.floor(index / 20);
					const isSnake = snake.some(
						(cell) => cell.x === x && cell.y === y
					);
					const isFood = food.x === x && food.y === y;

					return (
						<Cell key={index} isSnake={isSnake} isFood={isFood} />
					);
				})}
			</Board>
		</div>
	);
};

export default SnakeGame;
