'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
	{ href: '/', label: 'Individual Results' },
	{ href: '/cgpa-calculator', label: 'GPA Calculator' },
	{ href: '/booklists', label: 'Booklists' },
];

export default function NavBar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<nav className="bg-white/90 backdrop-blur border-b sticky top-0 z-40">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center gap-3">
						<Image src="/logo.png" alt="BTEB Results Hub" width={36} height={36} className="rounded" />
						<Link href="/" className="text-lg font-semibold text-gray-900 hover:text-blue-600">BTEB Results Hub</Link>
					</div>

					{/* Desktop links centered */}
					<div className="hidden md:flex flex-1 items-center justify-center">
						<div className="flex items-center gap-3">
							{links.map((l) => {
								const active = pathname === l.href;
								return (
									<Link
										key={l.href}
										href={l.href}
										className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
											active
												? 'bg-blue-600 text-white'
												: 'bg-gray-100 text-gray-800 hover:bg-blue-50'
										}`}
									>
										{l.label}
									</Link>
								);
							})}
						</div>
					</div>
					{/* Mobile toggle */}
					<button
						className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
						onClick={() => setOpen((v) => !v)}
						aria-label="Toggle navigation"
					>
						<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							{open ? (
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{open && (
				<div className="md:hidden border-t bg-white/95">
					<div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
						{links.map((l) => {
							const active = pathname === l.href;
							return (
								<Link
									key={l.href}
									href={l.href}
									className={`px-4 py-2 rounded-full text-sm font-medium text-center ${
										active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
									}`}
									onClick={() => setOpen(false)}
								>
									{l.label}
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</nav>
	);
}
