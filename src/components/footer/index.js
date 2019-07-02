import React from 'react';

import Container from '../container';
import style from './style.scss';

const Footer = () => (
	<footer className={style.footer}>
		<Container>
			<p className={style.footerCopyright}>
				&copy; {new Date().getFullYear()} Zé Delivery - Todos os direitos reservados.
			</p>

			<p className={style.footerLogo}>Ze Delivery</p>

			<ul className={style.footerList}>
				<li>
					<a target="_blank"
						rel="noopener noreferrer"
						href="https://zedelivery.zendesk.com/hc/pt-br"
						className={style.footerListItem}>
						Dúvidas?
					</a>
				</li>

				<li>
					<a href="/terms" className={style.footerListItem}>
						Termos de Condições e Política de <br /> Privacidade
					</a>
				</li>

				<li>
					<a href="/partner" className={style.footerListItem}>
						Seja nosso parceiro
					</a>
				</li>
			</ul>
		</Container>
	</footer>
);

export default Footer;
