import type { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
	title: 'CGPA Calculator – BTEB Diploma & Polytechnic (2010/2016/2022)',
	description:
		'Free BTEB CGPA Calculator for Diploma & Polytechnic. Compute CGPA using official semester weightings for regulations 2010, 2016, and 2022.',
	keywords: [
		'BTEB CGPA Calculator',
		'Diploma CGPA Calculator',
		'Polytechnic CGPA',
		'BTEB 2010 regulation CGPA',
		'BTEB 2016 regulation CGPA',
		'BTEB 2022 regulation CGPA',
	],
};

export default function CgpaCalculatorPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<h1 className="text-2xl font-bold text-gray-900">CGPA Calculator - BTEB Diploma & Polytechnic</h1>
						<span className="text-sm text-gray-600">Official semester weightings for 2010, 2016 and 2022</span>
					</div>
				</div>
			</header>
			<Calculator />
		</div>
	);
}
