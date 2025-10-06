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
				<section className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Semester GPAs</h2>

					<div className="mb-6">
						<h3 className="text-sm font-semibold text-gray-800 mb-2">Fetch Results and Auto-Fill GPA</h3>
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
									// data is StudyAidResultData shape
									const ordered = data.semester_results
										.slice()
										.sort((a: any, b: any) => a.semester - b.semester);
									const gpas: string[] = ordered.map((s: any) => {
										const first = s.exam_results?.[0];
										if (!first) return '';
										return first.gpa != null ? String(first.gpa) : '';
									});
									const limited = gpas.slice(0, 8);
									setSemesters((prev) => {
										const arr = Array.from({ length: Math.min(8, Math.max(prev.length, limited.length || 2)) }).map((_, i) => ({
											id: crypto.randomUUID(),
											gpa: limited[i] ?? '',
										}));
										return arr.length ? arr : prev;
									});
								} catch (err: any) {
									setFetchError(err.message || 'Failed to fetch results');
								} finally {
									setLoading(false);
								}
							}}
							className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end border rounded-md p-3 mb-2"
						>
							<div className="md:col-span-5">
								<label className="block text-xs text-gray-600 mb-1">Roll Number</label>
								<input
									type="text"
									value={roll}
									onChange={(e) => setRoll(e.target.value)}
									placeholder="Enter roll number"
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="md:col-span-4">
								<label className="block text-xs text-gray-600 mb-1">Program</label>
								<select
									value={program}
									onChange={(e) => setProgram(e.target.value)}
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option>Diploma in Engineering</option>
								</select>
							</div>
							<div className="md:col-span-3 flex md:justify-end">
								<button
									type="submit"
									disabled={loading || !roll}
									className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
								>
									{loading ? 'Fetching...' : 'Fetch & Auto-Fill'}
								</button>
							</div>
						</form>
						{fetchError && (
							<p className="text-xs text-red-600">{fetchError}</p>
						)}
					</div>

					<div className="mb-4">
						<label className="block text-xs text-gray-600 mb-1">Regulation</label>
						<select
							value={regulation}
							onChange={(e) => setRegulation(e.target.value as '2010' | '2016' | '2022')}
							className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							aria-label="Select BTEB regulation"
						>
							<option value="2010">2010</option>
							<option value="2016">2016</option>
							<option value="2022">2022</option>
						</select>
					</div>

					<div className="space-y-4">
						{semesters.map((s, idx) => {
							const gpaNum = parseFloat(s.gpa);
							const gpaInvalid = s.gpa !== '' && (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4);
							const weightPct = tableWeights[idx] ?? 0;

							return (
								<div key={s.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end border rounded-md p-3">
									<div className="md:col-span-3">
										<label className="block text-xs text-gray-600 mb-1">Semester</label>
										<div className="text-sm font-medium">{idx + 1}</div>
										<p className="text-[11px] text-gray-500">Weight: {weightPct}%</p>
									</div>
									<div className="md:col-span-8">
										<label className="block text-xs text-gray-600 mb-1">GPA (0.00 - 4.00)</label>
										<input
											type="number"
											step="0.01"
											min={0}
											max={4}
											value={s.gpa}
											onChange={(e) => updateSemester(s.id, e.target.value)}
											placeholder="e.g., 3.25"
											className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${gpaInvalid ? 'border-red-400 focus:ring-red-300' : 'focus:ring-blue-500'}`}
											aria-label={`Enter GPA for semester ${idx + 1}`}
										/>
										{gpaInvalid && (
											<p className="text-xs text-red-600 mt-1">Enter a valid GPA between 0.00 and 4.00</p>
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
								className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50"
								disabled={semesters.length >= 8}
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
						<div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
							<p className="text-gray-700 text-sm">Your CGPA</p>
							<p className="text-3xl font-bold text-blue-700">{formatNumber(cgpa, 2)}</p>
							<p className="text-xs text-gray-500 mt-2">CGPA uses semester weightings for regulation {regulation}.</p>
						</div>
						<div>
							<h3 className="text-sm font-semibold text-gray-800 mb-2">Semester Weight Table</h3>
							<div className="overflow-x-auto">
								<table className="min-w-full text-xs text-left border">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-3 py-2 border">Semester</th>
											<th className="px-3 py-2 border">2010</th>
											<th className="px-3 py-2 border">2016</th>
											<th className="px-3 py-2 border">2022</th>
										</tr>
									</thead>
									<tbody>
										{Array.from({ length: 8 }).map((_, i) => (
											<tr key={i}>
												<td className="px-3 py-2 border">{i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}</td>
												<td className="px-3 py-2 border">{REGULATION_WEIGHTS['2010'][i]}%</td>
												<td className="px-3 py-2 border">{REGULATION_WEIGHTS['2016'][i]}%</td>
												<td className="px-3 py-2 border">{REGULATION_WEIGHTS['2022'][i]}%</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<div className="text-xs text-gray-500">
							Note: Calculation normalizes weights to semesters with entered GPA.
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
