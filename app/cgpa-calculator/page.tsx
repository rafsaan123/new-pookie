'use client';

import { useMemo, useState } from 'react';

type SemesterEntry = {
	id: string;
	gpa: string; // keep as string for controlled input, parse when computing
	credits: string;
};

// Utility to format numbers safely
function formatNumber(value: number, fractionDigits = 2): string {
	if (!isFinite(value)) return '0.00';
	return value.toFixed(fractionDigits);
}

export default function CgpaCalculatorPage() {
	const [semesters, setSemesters] = useState<SemesterEntry[]>([
		{ id: crypto.randomUUID(), gpa: '', credits: '' },
		{ id: crypto.randomUUID(), gpa: '', credits: '' },
	]);

	const totalCredits = useMemo(() => {
		return semesters.reduce((sum, s) => sum + (parseFloat(s.credits) || 0), 0);
	}, [semesters]);

	const weightedGpaSum = useMemo(() => {
		return semesters.reduce((sum, s) => {
			const g = parseFloat(s.gpa);
			const c = parseFloat(s.credits);
			if (isNaN(g) || isNaN(c)) return sum;
			return sum + g * c;
		}, 0);
	}, [semesters]);

	const cgpa = useMemo(() => {
		if (totalCredits <= 0) return 0;
		return weightedGpaSum / totalCredits;
	}, [totalCredits, weightedGpaSum]);

	function updateSemester(id: string, field: 'gpa' | 'credits', value: string) {
		setSemesters((prev) =>
			prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
		);
	}

	function addSemester() {
		setSemesters((prev) => [...prev, { id: crypto.randomUUID(), gpa: '', credits: '' }]);
	}

	function removeSemester(id: string) {
		setSemesters((prev) => (prev.length <= 1 ? prev : prev.filter((s) => s.id !== id)));
	}

	function resetAll() {
		setSemesters([
			{ id: crypto.randomUUID(), gpa: '', credits: '' },
			{ id: crypto.randomUUID(), gpa: '', credits: '' },
		]);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<h1 className="text-2xl font-bold text-gray-900">CGPA Calculator - BTEB Diploma & Polytechnic</h1>
						<span className="text-sm text-gray-600">Calculate CGPA using GPA and credits</span>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<section className="bg-white rounded-lg shadow-lg p-6">
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Semester GPAs and Credits</h2>

						<div className="space-y-4">
							{semesters.map((s, idx) => {
								const gpaNum = parseFloat(s.gpa);
								const creditsNum = parseFloat(s.credits);
								const gpaInvalid = s.gpa !== '' && (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4);
								const creditsInvalid = s.credits !== '' && (isNaN(creditsNum) || creditsNum < 0);

								return (
									<div key={s.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end border rounded-md p-3">
										<div className="md:col-span-3">
											<label className="block text-xs text-gray-600 mb-1">Semester</label>
											<div className="text-sm font-medium">{idx + 1}</div>
										</div>
										<div className="md:col-span-4">
											<label className="block text-xs text-gray-600 mb-1">GPA (0.00 - 4.00)</label>
											<input
												type="number"
												step="0.01"
												min={0}
												max={4}
												value={s.gpa}
												onChange={(e) => updateSemester(s.id, 'gpa', e.target.value)}
												placeholder="e.g., 3.25"
												className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${gpaInvalid ? 'border-red-400 focus:ring-red-300' : 'focus:ring-blue-500'}`}
												aria-label={`Enter GPA for semester ${idx + 1}`}
											/>
											{gpaInvalid && (
												<p className="text-xs text-red-600 mt-1">Enter a valid GPA between 0.00 and 4.00</p>
											)}
										</div>
										<div className="md:col-span-4">
											<label className="block text-xs text-gray-600 mb-1">Credits (>= 0)</label>
											<input
												type="number"
												step="0.5"
												min={0}
												value={s.credits}
												onChange={(e) => updateSemester(s.id, 'credits', e.target.value)}
												placeholder="e.g., 20"
												className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${creditsInvalid ? 'border-red-400 focus:ring-red-300' : 'focus:ring-blue-500'}`}
												aria-label={`Enter credits for semester ${idx + 1}`}
											/>
											{creditsInvalid && (
												<p className="text-xs text-red-600 mt-1">Enter a valid non-negative credit value</p>
											)}
										</div>
										<div className="md:col-span-1 flex md:justify-end">
											<button
												type="button"
												onClick={() => removeSemester(s.id)}
												className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100"
												aria-label={`Remove semester ${idx + 1}`}
											>
												Remove
											</button>
										</div>
									</div>
								);
							})}
							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={addSemester}
									className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
								>
									Add Semester
								</button>
								<button
									type="button"
									onClick={resetAll}
									className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
								>
									Reset
								</button>
							</div>
						</div>
					</section>

					<section className="bg-white rounded-lg shadow-lg p-6">
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">CGPA Summary</h2>
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<p className="text-gray-600">Total Credits</p>
									<p className="text-gray-900 font-semibold">{formatNumber(totalCredits, 2)}</p>
								</div>
								<div>
									<p className="text-gray-600">Weighted GPA Sum</p>
									<p className="text-gray-900 font-semibold">{formatNumber(weightedGpaSum, 2)}</p>
								</div>
							</div>
							<div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
								<p className="text-gray-700 text-sm">Your CGPA</p>
								<p className="text-3xl font-bold text-blue-700">{formatNumber(cgpa, 2)}</p>
								<p className="text-xs text-gray-500 mt-2">CGPA is calculated as Σ(GPA × Credits) ÷ Σ(Credits)</p>
							</div>
							<div className="text-xs text-gray-500">
								Note: This calculator is for guidance only. Please verify results with your institute if needed.
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
