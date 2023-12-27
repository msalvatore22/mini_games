import React from "react";

const Home: React.FC = () => {
	return (
		<main>
			<header>
				<h1>mini games</h1>
			</header>
			<section>
				<a className="game-btn" href="/tic-tac-toe">
					Tic-Tac-Toe
				</a>
			</section>
		</main>
	);
};

export default Home;
