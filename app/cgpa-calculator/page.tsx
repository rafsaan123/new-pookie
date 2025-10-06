import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
const Calculator = dynamic(() => import('./Calculator'), { ssr: false });

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
					<div className="flex justify-between items-center py-6">
						<h1 className="text-2xl font-bold text-gray-900">CGPA Calculator - BTEB Diploma & Polytechnic</h1>
						<span className="text-sm text-gray-600">Official semester weightings for 2010, 2016 and 2022</span>
					</div>
				</div>
			</header>
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
				<div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
					<h2 className="text-lg font-semibold text-blue-800">BTEB CGPA Calculator</h2>
					<p className="text-sm text-blue-700 mt-1">Compute your CGPA for BTEB Diploma & Polytechnic using regulation-based semester weightings (2010, 2016, 2022). Add your per-semester GPA or fetch them automatically from your result.</p>
				</div>
			</section>
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
				<div className="prose max-w-none text-gray-700 text-sm">
					<h2>BTEB CGPA Calculation Guide</h2>
					<p>
						Use this free <strong>BTEB CGPA calculator</strong> to compute your diploma CGPA according to official
						semester weightings for the <strong>2010</strong>, <strong>2016</strong>, and <strong>2022</strong> regulations.
						Enter your <strong>semester GPA</strong> values or fetch them automatically using your roll number, then
						see your final <strong>CGPA</strong> instantly.
					</p>
					<h3>Supported Programs</h3>
					<ul>
						<li>Diploma in Engineering</li>
						<li>Polytechnic Diploma Programs</li>
					</ul>
				</div>
			</section>
			<Calculator />
		</div>
	);
}
