import React, { Component } from 'react';

class subscription extends Component {
	render() {
		return (
			<div className="card-deck">
				{/* subscription 1 */}
				<div className="card col-sm-3 my-5 mx-auto p-3">
					<div className="card-title" style={{ textAlign: 'center' }}>
						<h3 className="mx-auto mt-1">Free</h3>
					</div>
					<div className="mx-auto ">
						<span>
							<font bolt size="7">
								RP5000
							</font>/ month
						</span>
					</div>
					<div className="mt-2 mx-5">
						<ul>
							<li>
								<p size="5">Todo List</p>
							</li>
							<li>
								<p size="5">reminder</p>
							</li>
						</ul>
					</div>

					<button className="btn btn-outline-secondary mt-3">subscribe</button>
				</div>

				{/* subscription 2 */}
				<div className="card col-sm-3 my-5 mx-auto ">
					<div className="card-title" style={{ textAlign: 'center', display:"block"}}>
						<h3 className="mx-auto mt-1">premium</h3>
					</div>
					<div className="mx-auto ">
						<span>
							<font bolt size="7">
								RP10000
							</font>/ month
						</span>
					</div>
					<a/>
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
					<button className="btn btn-outline-secondary">subscribe</button>
				</div>
			</div>
		);
	}
}

export default subscription;
