import React from 'react';
import Link from 'next/link';

import style from './style.scss';
import Container from '../container';

const Header = () => (
	<header className={style.header}>
		<Container>
			<h1 className={style.headerTitle}>
				<Link href="/">
					<a className={style.headerLogo}>
						Ze Delivery
					</a>
				</Link>
			</h1>
		</Container>
	</header>
);

export default Header;
