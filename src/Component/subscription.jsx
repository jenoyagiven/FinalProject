import React, { Component } from 'react';

class subscription extends Component {
	render() {
		return (
			<div className="card-deck">
				{/* subscription 1 */}

				<div className="hoverable view shadow card col-sm-3 my-5 mx-auto p-3 d-flex flex-column">
					<div className="card-title" style={{ textAlign: 'center' }}>
						<h4 className="mx-auto mt-1">plain</h4>
					</div>
					<div className="mx-auto">
						<h1>FREE</h1>
					</div>
					<div className="mt-2 mx-5 mb-4">
						<ul>
							<li>
								<p size="5">Todo List</p>
							</li>
							<li>
								<p size="5">reminder</p>
							</li>
						</ul>
					</div>

					<a href="/" className="btn btn-outline-secondary mt-5">
						<span className="mx-auto">subscribe</span>
					</a>
				</div>

				{/* subscription 2 */}
				<div className="card hoverable view shadow col-sm-3 my-5 mx-auto p-3">
					<div className="card-title" style={{ textAlign: 'center' }}>
						<h4 className="mx-auto mt-1">premium</h4>
					</div>
					<div className="mx-auto ">
						<span>
							<font bolt size="7">
								RP10000
							</font>/ month
						</span>
					</div>
					<a />
					<div className="mt-2 mx-5">
						<ul>
							<li>
								<p size="5">Todo List</p>
							</li>

							<li>
								<p size="5">reminder</p>
							</li>
							<li>
								<p size="5">style change</p>
							</li>
						</ul>
					</div>
					<a href="/payment" className="btn btn-outline-secondary mt-3">
						<span className="mx-auto">subscribe</span>
					</a>
				</div>
			</div>
		);
	}
}

export default subscription;
