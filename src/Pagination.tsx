const Pagination = ({
	currentPage,
	onPageChange,
}: {
	currentPage: number;
	onPageChange: (nextPageNumber: number) => void;
}) => {
	return (
		<div className="flex items-center gap-4">
			<button
				onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
			>
				⬅️
			</button>
			{currentPage}
			<button onClick={() => onPageChange(currentPage + 1)}>😅</button>
		</div>
	);
};

export default Pagination;
