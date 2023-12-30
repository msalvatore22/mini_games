import React from 'react'
import '../styles/nav.css'

const Nav: React.FC = () => {
  return (
		<div className="nav">
			<ul>
				<li>
					<a className="nav-btn" href="/">
						home
					</a>
				</li>
				<li>
					<a className="nav-btn" href="/tic-tac-toe">
						tic-tac-toe
					</a>
				</li>
				<li>
					<a className="nav-btn" href="/snake">
						snake
					</a>
				</li>
				<li>
					<a className="nav-btn" href="/wordle">
						wordle
					</a>
				</li>
			</ul>
		</div>
  );
}

export default Nav