import React, { Component } from 'react';
// import {Payment} from "../actions/index"
// import {paymentPicture} from "../actions/index"
import axios from 'axios';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import mandiri from '../Image/Mandiri_logo.png';
import bca from '../Image/bca.png';
import ovo from '../Image/ovo.jpg';
const url_api = 'http://localhost:2004/';

class payment extends Component {
	// mengupdate radio button setiap kali ganti
	updateRadio = (radioOption) => {
		this.setState({
			PaymentOption: radioOption.target.value
		});
	};

	// mengupdate tanggal yang baru
	updateDate = (date) => {
		this.setState({
			date: date
		});
	};

	// ngesend data ke database
	paymentPicture = () => {
		var data = new FormData();
		data.append('image', this.state.paymentProof);
		data.append('option', this.state.PaymentOption);
		data.append('creditNumber', this.state.creditNumber);
		data.append('securityCode', this.state.securityCode);
		data.append('date', this.state.date);
		data.append('id', this.props.user_id);
		axios
			.patch(url_api + 'authRouter/upload', data, {
				headers: {
					'Content-Type': `multipart/form-data`
				}
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	state = {
		PaymentOption: '',
		creditNumber: '',
		securityCode: '',
		date: '',
		paymentProof: null
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
							name="image"
							class="custom-file-input"
							onChange={(e) => {
								this.setState({
									paymentProof: e.target.files[0]
								});
							}}
						/>
						<label class="custom-file-label text-muted">Choose file</label>
					</div>
				</div>

				<div className="mb-2">
					<button className="btn btn-outline-secondary col-2" onClick={this.paymentPicture}>
						Send
					</button>
				</div>
			</div>
		);
	}
}

const mstp = (state) => {
	return {
		user_id: state.auth.id
	};
};

export default connect(mstp)(payment);
