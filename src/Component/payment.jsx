import React, { Component } from 'react';
import mandiri from '../Image/Mandiri_logo.png';
import bca from '../Image/bca.png';
import ovo from '../Image/ovo.jpg';

class payment extends Component {
	state = {
		bank: '',
		proof: this.proof
    };
    
    function (changeEvent) {
        this.setState({
          bank: changeEvent.target.value
        });
      }

	render() {
		return (
			<div className="container card mt-3">
				<div className="card-title mt-2">
					<h5>Payment</h5>
					<hr />
				</div>
				<h4>choose payment method</h4>
				<div className="card-body">
					<input
						type="radio"
						className="mb-4"
						checked={this.state.bank == 'mandiri'}
						onChange={this.handleOptionChange}
					/>{' '}
					<img src={mandiri} width="100px" height="30px" />
					<br />
					<input
						type="radio"
						className="mb-4"
						checked={this.state.bank == 'bca'}
						onChange={this.handleOptionChange}
					/>{' '}
					<img src={bca} width="100px" height="30px" />
					<br />
					<input
						type="radio"
						className="mb-4"
						checked={this.state.bank == 'ovo'}
						onChange={this.handleOptionChange}
					/>{' '}
					<img src={ovo} width="100px" height="30px" />
				</div>

				<div className="mb-3">
					<span>
						<font size="2" color="ABB2B9">
							credit number:
						</font>
					</span>
					<input className="card" type="text" />
				</div>

				<div className="d-inline-flex mb-3">
					<input className="card d-inline col-2 mr-3" placeholder="CVC" type="text" />
					<input className="card d-inline col-2" placeholder="MM/YY" type="text" />
				</div>

				{/* inputing image */}
				<div className="custom-file col-4">
					<input
						type="file"
						ref={(input) => {
							this.proof = input;
						}}
						class="custom-file-input"
						id="validatedCustomFile"
						required
					/>
					<label class="custom-file-label" for="validatedCustomFile">
						Proof of Payment
					</label>
					<div class="invalid-feedback">Example invalid custom file feedback</div>
				</div>
			</div>
		);
	}
}

export default payment;
