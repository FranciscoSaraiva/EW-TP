import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

function App() {
	const [crosswalks, setCrosswalks] = useState([]);

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
			setCrosswalks(res.data);
		});
	});

	return (
		<div className='App'>
			<Table>
				<thead>
					<tr>
						<th>#id</th>
						<th>Text</th>
					</tr>
				</thead>
				<tbody>
					{crosswalks.length ? (
						crosswalks.map((crosswalk) => (
							<tr key={crosswalk.id}>
								<td>{crosswalk.id}</td>
								<td>{crosswalk.title}</td>
							</tr>
						))
					) : (
						<tr>
							<td>-</td>
							<td>-</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
}

export default App;
