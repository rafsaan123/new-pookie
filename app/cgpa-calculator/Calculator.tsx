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
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{/* Left: CGPA Calculator panel */}
			<section className="bg-white border border-gray-200 rounded-lg p-8">
				<div className="mb-8">
					<h2 className="text-2xl font-light text-gray-900 mb-2">Manual Calculator</h2>
					<p className="text-gray-500 text-sm">Enter your semester GPA values to calculate CGPA</p>
				</div>

				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 mb-2">Regulation</label>
					<select
						value={regulation}
						onChange={(e) => setRegulation(e.target.value as '2010' | '2016' | '2022')}
						className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
					>
						<option value="2010">2010</option>
						<option value="2016">2016</option>
						<option value="2022">2022</option>
					</select>
				</div>

				{/* 8 semester inputs in two columns */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
					{Array.from({ length: 8 }).map((_, idx) => {
						const current = semesters[idx] ?? { id: `s-${idx}`, gpa: '' } as SemesterEntry;
						const gpaNum = parseFloat(current.gpa);
						const gpaInvalid = current.gpa !== '' && (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4);
						const ord = idx === 0 ? '1st' : idx === 1 ? '2nd' : idx === 2 ? '3rd' : `${idx + 1}th`;
						return (
							<div key={current.id}>
								<label className="block text-sm font-medium text-gray-700 mb-2">{ord} Semester</label>
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
									className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
										gpaInvalid 
											? 'border-red-300 focus:ring-red-200 focus:border-red-300' 
											: 'border-gray-200 focus:ring-gray-900 focus:border-transparent'
									}`}
								/>
							</div>
						);
					})}
				</div>

				<div className="flex items-center gap-3 mb-8">
					<button
						type="button"
						onClick={() => setSemesters((prev) => prev.map((p) => ({ ...p, gpa: '' })))}
						className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
					>
						Clear All
					</button>
				</div>

				{/* CGPA Result */}
				<div className="bg-gray-50 rounded-lg p-6 text-center">
					<p className="text-sm text-gray-600 mb-2">Your CGPA</p>
					<div className="text-4xl font-light text-gray-900">{formatNumber(cgpa, 2)}</div>
					<p className="text-xs text-gray-500 mt-1">Out of 4.0</p>
				</div>
			</section>

			{/* Right: Fill Result panel */}
			<section className="bg-white border border-gray-200 rounded-lg p-8">
				<div className="mb-8">
					<h2 className="text-2xl font-light text-gray-900 mb-2">Auto Fill</h2>
					<p className="text-gray-500 text-sm">Automatically fetch your results using roll number</p>
				</div>

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
					className="space-y-6"
				>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
						<select
							value={program}
							onChange={(e) => setProgram(e.target.value)}
							className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
						>
							<option>Diploma In Engineering</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Regulation</label>
						<select
							value={regulation}
							onChange={(e) => setRegulation(e.target.value as '2010' | '2016' | '2022')}
							className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
						>
							<option value="2010">2010</option>
							<option value="2016">2016</option>
							<option value="2022">2022</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
						<input
							type="text"
							value={roll}
							onChange={(e) => setRoll(e.target.value)}
							placeholder="Enter your roll number"
							className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
						/>
					</div>
					<div>
						<button
							type="submit"
							disabled={loading || !roll}
							className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
								loading || !roll
									? 'bg-gray-300 text-gray-500 cursor-not-allowed'
									: 'bg-gray-900 text-white hover:bg-gray-800'
							}`}
						>
							{loading ? 'Fetching Results...' : 'Fetch Results'}
						</button>
					</div>
					{fetchError && (
						<div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
							{fetchError}
						</div>
					)}
				</form>
			</section>
		</div>
	);
}
