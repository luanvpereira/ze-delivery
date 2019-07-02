import React from 'react';
import style from './style.scss';
console.log(style);
const Header = () => (
	<header className={style.header}>
		<h1>
			<a href="#">
				Ze Delivery
			</a>
		</h1>
	</header>
);

export default Header;
