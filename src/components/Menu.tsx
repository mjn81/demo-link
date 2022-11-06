import React from 'react';

export interface MenuOption {
	onClick: () => void;
	children: React.ReactNode | string;
	extraClass?: string;
}
export interface MenuProps {
	prefix: string;
	type: "bottom" | "center" | "top";
	options: MenuOption[];
	isOpen: boolean;
}

export const ContextMenu = ({ prefix, options, type, isOpen }: MenuProps) => {
	return (
		<section className={isOpen ? 'visible' : 'hidden'}>
			<span className="triangle"></span>
			<ul className={`context-menu ${type}`}>
				{options.map(({ children, extraClass, onClick }, i) => (
					<li key={`ctx_${prefix}_opt_${i}`} className={`menu-item ${extraClass ?? ''}`}>
						<button onClick={onClick}>{children}</button>
					</li>
				))}
			</ul>
		</section>
	);
};
