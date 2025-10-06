'use client';

import { useMemo, useState } from 'react';

type SemesterEntry = {
	id: string;
	gpa: string;
};

const REGULATION_WEIGHTS: Record<'2010' | '2016' | '2022', number[]> = {
	'2010': [5, 5, 5, 15, 15, 20, 25, 10],
	'2016': [5, 5, 5, 10, 15, 20, 25, 15],
	'2022': [5, 5, 10, 10, 20, 20, 20, 10],
};

function formatNumber(value: number, fractionDigits = 2): string {
	if (!isFinite(value)) return '0.00';
	return value.toFixed(fractionDigits);
}

export default function Calculator() {
	const [regulation, setRegulation] = useState<'2010' | '2016' | '2022'>('2022');
	const [semesters, setSemesters] = useState<SemesterEntry[]>([
		{ id: crypto.randomUUID(), gpa: '' },
		{ id: crypto.randomUUID(), gpa: '' },
	]);
  const [roll, setRoll] = useState('');
  const [program, setProgram] = useState('Diploma in Engineering');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

	const cgpa = useMemo(() => {
		const weights = REGULATION_WEIGHTS[regulation];
		const validEntries = semesters
			.map((s, index) => ({ index, g: parseFloat(s.gpa) }))
			.filter((x) => !isNaN(x.g) && x.g >= 0 && x.g <= 4);

		if (validEntries.length === 0) return 0;

		const selectedWeights = validEntries.map((v) => weights[v.index] ?? 0);
		const weightSum = selectedWeights.reduce((a, b) => a + b, 0);
		if (weightSum <= 0) return 0;

		const weighted = validEntries.reduce((sum, v, i) => sum + v.g * (selectedWeights[i] / weightSum), 0);
		return weighted;
	}, [regulation, semesters]);

	function updateSemester(id: string, value: string) {
		setSemesters((prev) => prev.map((s) => (s.id === id ? { ...s, gpa: value } : s)));
	}

	function addSemester() {
		if (semesters.length >= 8) return;
		setSemesters((prev) => [...prev, { id: crypto.randomUUID(), gpa: '' }]);
	}

	function removeSemester(id: string) {
		setSemesters((prev) => (prev.length <= 1 ? prev : prev.filter((s) => s.id !== id)));
	}

	function resetAll() {
		setSemesters([
			{ id: crypto.randomUUID(), gpa: '' },
			{ id: crypto.randomUUID(), gpa: '' },
		]);
		setRegulation('2022');
	}

	const tableWeights = REGULATION_WEIGHTS[regulation];

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Left: CGPA Calculator panel */}
				<section className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-3xl font-bold text-gray-900 mb-1">CGPA Calculator</h2>
					<p className="text-sm text-gray-600 mb-6">Calculate your Final CGPA!</p>

					<div className="mb-4">
						<label className="block text-xs text-gray-600 mb-1">Regulation <span className="text-red-500">*</span></label>
						<select
							value={regulation}
							onChange={(e) => setRegulation(e.target.value as '2010' | '2016' | '2022')}
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="2010">2010</option>
							<option value="2016">2016</option>
							<option value="2022">2022</option>
						</select>
					</div>

					{/* 8 semester inputs in two columns */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{Array.from({ length: 8 }).map((_, idx) => {
							const current = semesters[idx] ?? { id: `s-${idx}`, gpa: '' } as SemesterEntry;
							const gpaNum = parseFloat(current.gpa);
							const gpaInvalid = current.gpa !== '' && (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4);
							const ord = idx === 0 ? '1st' : idx === 1 ? '2nd' : idx === 2 ? '3rd' : `${idx + 1}th`;
							return (
								<div key={current.id}>
									<label className="block text-xs text-gray-600 mb-1">{ord} Semester</label>
									<input
										type="number"
										step="0.01"
										min={0}
										max={4}
										value={current.gpa}
										onChange={(e) => {
											setSemesters((prev) => {
												const copy = [...prev];
												copy[idx] = { id: copy[idx]?.id ?? `s-${idx}` as any, gpa: e.target.value } as SemesterEntry as any;
												return copy.slice(0, 8);
											});
										}}
										placeholder="0.00"
										className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${gpaInvalid ? 'border-red-400 focus:ring-red-300' : 'focus:ring-blue-500'}`}
									/>
								</div>
							);
						})}
					</div>

					<div className="flex items-center gap-3 mt-6">
						<button
							type="button"
							onClick={() => setSemesters((prev) => prev.map((p) => ({ ...p, gpa: '' })))}
							className="px-4 py-2 bg-rose-100 text-rose-700 rounded-md hover:bg-rose-200"
						>
							Clear
						</button>
						<button
							type="button"
							onClick={() => void 0}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
						>
							Calculate CGPA
						</button>
					</div>

					<div className="mt-6 text-xl font-semibold text-gray-900">
						<span className="mr-2">CGPA:</span>
						<span className="text-yellow-500">{formatNumber(cgpa, 2)}</span>
					</div>
				</section>

				{/* Right: Fill Result panel */}
				<section className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-3xl font-bold text-gray-900 mb-1">Fill Result</h2>
					<p className="text-sm text-gray-600 mb-6">Lazy to Type? Fill your result Automatically!</p>

					<form
						onSubmit={async (e) => {
							e.preventDefault();
							setFetchError(null);
							setLoading(true);
							try {
								const params = new URLSearchParams({ studentId: roll, regulation, program });
								const res = await fetch('/api/data-fetch?' + params.toString());
								if (!res.ok) {
									const err = await res.json();
									throw new Error(err.error || 'Failed to fetch');
								}
								const data = await res.json();
								const ordered = data.semester_results
									.slice()
									.sort((a: any, b: any) => a.semester - b.semester);
								const gpas: string[] = ordered.map((s: any) => {
									const first = s.exam_results?.[0];
									if (!first) return '';
									return first.gpa != null ? String(first.gpa) : '';
								});
								const limited = gpas.slice(0, 8);
								setSemesters(() => {
									return Array.from({ length: Math.max(2, limited.length) }).map((_, i) => ({
										id: crypto.randomUUID(),
										gpa: limited[i] ?? '',
									}));
								});
							} catch (err: any) {
								setFetchError(err.message || 'Failed to fetch results');
							} finally {
								setLoading(false);
							}
						}}
						className="space-y-4"
					>
						<div>
							<label className="block text-xs text-gray-600 mb-1">Exam <span className="text-red-500">*</span></label>
							<select
								value={program}
								onChange={(e) => setProgram(e.target.value)}
								className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option>Diploma In Engineering</option>
							</select>
						</div>
						<div>
							<label className="block text-xs text-gray-600 mb-1">Regulation <span className="text-red-500">*</span></label>
							<select
								value={regulation}
								onChange={(e) => setRegulation(e.target.value as '2010' | '2016' | '2022')}
								className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="2010">2010</option>
								<option value="2016">2016</option>
								<option value="2022">2022</option>
							</select>
						</div>
						<div>
							<label className="block text-xs text-gray-600 mb-1">Roll Number <span className="text-red-500">*</span></label>
							<input
								type="text"
								value={roll}
								onChange={(e) => setRoll(e.target.value)}
								placeholder="600000"
								className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<button
								type="submit"
								disabled={loading || !roll}
								className={`w-full px-4 py-2 rounded-md text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'}`}
							>
								{loading ? 'Fetching...' : 'Fill Result'}
							</button>
						</div>
						{fetchError && <p className="text-xs text-red-600">{fetchError}</p>}
					</form>
				</section>
			</div>
		</main>
	);
}
