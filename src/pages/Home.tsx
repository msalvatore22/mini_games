import React from "react";

const Home: React.FC = () => {
	return (
		<main>
			<header>
				<h1 style={{marginBottom: '50px'}}>pick a game</h1>
			</header>
			<section>
				<a className="btn" href="/tic-tac-toe">
					Tic-Tac-Toe
				</a>
				<a className="btn" href="/snake">
					Snake
				</a>
			</section>
		</main>
	);
};

export default Home;
