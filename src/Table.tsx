import { Entry } from "./types";

const Table = ({ entries }: { entries: Entry[] }) => {
	const headers = Object.keys(entries[0]);

	return (
		<table>
			<thead>
				<tr>
					{headers.map((header) => (
						<th className="capitalize p-2">{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{entries.map((entry) => (
					<tr>
						{Object.values(entry).map((cell) => (
							<td className="px-2 py-1">{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
