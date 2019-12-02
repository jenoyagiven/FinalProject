import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import mandiri from '../Image/Mandiri_logo.png';
import bca from '../Image/bca.png';
import ovo from '../Image/ovo.jpg';

class payment extends Component {
	// mengupdate radio button setiap kali ganti
	updateRadio = (changeEvent) => {
		this.setState({
			PaymentOption: changeEvent.target.value
		});
	};

	// // menghapus function default from
	// handleFormSubmit = (formSubmitEvent) => {
	// 	formSubmitEvent.preventDefault();
	// };

	// mengupdate tanggal yang baru
	updateDate = (date) => {
		this.setState({
			Date: date
		});
	};

	checkCode = () => {
		console.log(this.state.paymentProof);
	};

	state = {
		PaymentOption: '',
		creditNumber: '',
		securityCode: '',
		Date: '',
		paymentProof: ''
	};

	render() {
		return (
			// membikin tab untuk pembayaran
			<div className="container card mt-3">
				<div className="card-title mt-2">
					<h5>Payment</h5>
					<hr />
				</div>

				{/* membikin opsi cara pembayaran */}
				<h4>choose payment method</h4>
				<div className="card-body">
					<form>
						<div className="form-check">
							<input
								type="radio"
								className="mb-4"
								value="mandiri"
								// setiap kali radio button ganti state di update
								onChange={this.updateRadio}
								// checked - radio button di check condition di bawah terpenuhi
								checked={this.state.PaymentOption === 'mandiri'}
								name="payment method"
							/>
							<img src={mandiri} width="100px" height="30px" />
						</div>
						<br />
						<div className="form-check">
							<input
								type="radio"
								className="mb-4"
								value="bca"
								onChange={this.updateRadio}
								checked={this.state.PaymentOption === 'bca'}
								name="payment method"
							/>
							<img src={bca} width="100px" height="30px" />
						</div>
						<br />
						<div className="form-check">
							<input
								type="radio"
								className="mb-4"
								value="ovo"
								onChange={this.updateRadio}
								checked={this.state.PaymentOption === 'ovo'}
								name="payment method"
							/>
							<img src={ovo} width="100px" height="30px" />
						</div>
					</form>
				</div>

				{/* membikin credit number */}
				<div className="mb-3">
					<span>
						<font size="2" color="ABB2B9">
							credit number:
						</font>
					</span>
					{/* menyimpan data ke state */}
					<input
						className="card"
						type="text"
						maxLength="16"
						// kalau input terganti state di update
						onChange={(num) => {
							this.setState({ creditNumber: num.target.value });
						}}
					/>
				</div>

				{/* menyimpan security code */}
				<div className="mb-3">
					<div className="d-inline-block">
						<span>
							<font size="2" color="ABB2B9">
								Security Code:
							</font>
						</span>
						<br />
						<input
							className="card col-sm-10"
							placeholder="CVC"
							type="text"
							minLength="3"
							maxLength="6"
							// kalau input di ganti state terupdate
							onChange={(num) => {
								this.setState({ securityCode: num.target.value });
							}}
						/>
					</div>

					<div className="d-inline-block">
						<span>
							<font size="2" color="ABB2B9">
								expiry date:
							</font>
						</span>
						<br />

						{/* membikin action untuk memudah memilih tanggal */}
						<DatePicker selected={this.state.Date} onChange={this.updateDate} />
					</div>
				</div>

				{/* inputing image */}
				<div class="input-group mb-3" style={{ width: '350px' }}>
					<div class="custom-file">
						<input
							type="file"
							class="custom-file-input"
							onChange={(e) => {
								this.setState({ paymentProof: e.target.value });
							}}
						/>
						<label class="custom-file-label text-muted">Choose file</label>
					</div>
				</div>

				<div className="mb-2">
					<button className="btn btn-outline-secondary col-2" onClick={this.checkCode}>
						Send
					</button>
				</div>
			</div>
		);
	}
}

export default payment;
