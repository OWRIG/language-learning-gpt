import React from "react";

export default function Header() {
	return (
		<header aria-label="Page Header">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div className="text-center sm:text-left">
						<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
							Welcome Back, Mio!
						</h1>
						<p className="mt-1.5 text-sm text-gray-500">
							{/* eslint-disable-next-line react/no-unescaped-entities */}
							Let me help you finish the work! &nbsp;&nbsp;🎉
						</p>
					</div>
				</div>
		</header>
	);
}
