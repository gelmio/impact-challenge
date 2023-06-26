import { useEffect, useState } from "react";
import { Entry, Filters, PaginationOptions, YearOptions } from "./types";
import Table from "./Table";
import Pagination from "./Pagination";

const App = () => {
	const defaultPagination: PaginationOptions = { page: 1, size: 25 };
	const [entries, setEntries] = useState<Entry[] | undefined>();
	const [error, setError] = useState<Error | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [filters, setFilters] = useState<Filters | undefined>();
	const [selectedYearRangeOption, setSelectedYearRangeOption] =
		useState<YearOptions>();
	const [paginationOptions, setPaginationOptions] =
		useState<PaginationOptions>(defaultPagination);

	// Load entries
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			const queryParams = new URLSearchParams({
				...filters,
				...(paginationOptions?.page
					? { page: paginationOptions?.page.toString() }
					: {}),
			}).toString();

			const response = await fetch(
				`https://impact-code-test.fly.dev/fetch-data${
					queryParams ? "?" + queryParams.toString() : ""
				}`
			);
			if (response.ok) {
				const responseJSON = await response.json();
				setEntries(responseJSON);
				setError(undefined);
			} else {
				setError(
					new Error(
						"Bummer, something broke, please have another go at it"
					)
				);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [filters, paginationOptions?.page]);

	const yearRangeOptions = [
		"All Years",
		"Last 12 months",
		...Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i),
	] as const;

	const updateYearFilter = (nextYearFilter: YearOptions) => {
		setSelectedYearRangeOption(nextYearFilter);
		if (Number.isSafeInteger(+nextYearFilter)) {
			setFilters({
				...filters,
				startDateFrom: `${nextYearFilter}-01-01`,
				startDateTo: `${nextYearFilter}-12-31`,
			});
		} else if (nextYearFilter === "Last 12 months") {
			const now = new Date();
			setFilters({
				...filters,
				startDateFrom: `${now.getFullYear() - 1}-${
					now.getMonth() + 1
				}-${now.getDate()}`,
				startDateTo: `${now.getFullYear()}-${
					now.getMonth() + 1
				}-${now.getDate()}`,
			});
		} else {
			setFilters({
				...filters,
				startDateFrom: undefined,
				startDateTo: undefined,
			});
		}
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<label>
					🔎
					<input
						name="search"
						id="search"
						placeholder="Search"
						value={filters?.search || ""}
						onChange={({ target: { value: nextSearch } }) => {
							setPaginationOptions(defaultPagination);
							setFilters({ ...filters, search: nextSearch });
						}}
					/>
				</label>
				<select
					name="range"
					id="range"
					value={selectedYearRangeOption}
					onChange={({ target: { value } }) => {
						setPaginationOptions(defaultPagination);
						updateYearFilter(value as YearOptions);
					}}
				>
					{yearRangeOptions.map((selectedYearRangeOption) => (
						<option value={selectedYearRangeOption}>
							{selectedYearRangeOption}
						</option>
					))}
				</select>
			</div>
			{isLoading ? (
				<span>⏳⏳ Hold up, I'm loading ⏳⏳</span>
			) : error ? (
				<span>💥💥 {error.message} 💥💥</span>
			) : !entries?.length ? (
				<span>🧐🧐 No entries here 🧐🧐</span>
			) : (
				<>
					<Table entries={entries} />
					<Pagination
						currentPage={paginationOptions.page}
						onPageChange={(nextPage) =>
							setPaginationOptions({
								...defaultPagination,
								page: nextPage,
							})
						}
					/>
				</>
			)}
		</>
	);
};

export default App;
