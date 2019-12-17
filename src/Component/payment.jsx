import React, { Component } from 'react';
import { paymentSend } from '../actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import mandiri from '../Image/Mandiri_logo.png';
import bca from '../Image/bca.png';
import ovo from '../Image/ovo.jpg';
import bsCustomFileInput from 'bs-custom-file-input';

class payment extends Component {
	componentDidMount() {
		bsCustomFileInput.init();
	}

	// ngesend data ke database
	paymentOnclick = () => {
		let { paymentProof, PaymentOption, creditNumber, securityCode, date} = this.state;
		this.props.paymentSend(paymentProof, PaymentOption, creditNumber, securityCode, date, this.props.user_id);
	};

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

	state = {
		PaymentOption: '',
		creditNumber: '',
		securityCode: '',
		date: null,
		paymentProof: null
	};

	render() {
		if (!this.props.transaction_proof) {
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
								<img className="ml-2" src={mandiri} width="100px" height="30px" />
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
								<img className="ml-2" src={bca} width="100px" height="30px" />
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
								<img className="ml-2" src={ovo} width="100px" height="30px" />
							</div>
						</form>
					</div>

					{/* membikin credit number */}
					<div className="mb-3">
						<span>
							<font size="2" color="ABB2B9">
								Credit Number:
							</font>
						</span>
						{/* menyimpan data ke state */}
						<input
							className="card col-sm-2"
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
						<div className="d-inline-block" style={{ width: '120px' }}>
							<span>
								<font size="2" color="ABB2B9">
									Security Code:
								</font>
							</span>
							<br />
							<input
								className="card col-sm-10"
								type="text"
								minLength="3"
								maxLength="6"
								// kalau input di ganti state terupdate
								onChange={(num) => {
									this.setState({ securityCode: num.target.value });
								}}
							/>
						</div>

						<div className="d-inline-block" style={{ width: '150px' }}>
							<span>
								<font size="2" color="ABB2B9">
									Expiry Date:
								</font>
							</span>
							<br />

							{/* membikin action untuk memudah memilih tanggal */}
							<DatePicker
								className="card col-sm-10"
								selected={this.state.date}
								onChange={this.updateDate}
							/>
						</div>
					</div>

					{/* inputing image */}
					<div class="input-group mb-3" style={{ width: '350px' }}>
						<div class="custom-file">
							<input
								id="filename"
								type="file"
								name="image"
								class="custom-file-input"
								onChange={(e) => {
									this.setState({
										paymentProof: e.target.files[0]
									});
								}}
							/>
							<label for="filename" class="custom-file-label">
								Choose file
							</label>
						</div>
					</div>

					<div className="mb-2">
						<button className="btn btn-outline-secondary col-2" onClick={this.paymentOnclick}>
							Send
						</button>
					</div>
				</div>
			);
		} else {
			console.log('success');
			return <Redirect to="/" />;
		}
	}
}

const mstp = (state) => {
	return {
		transaction_proof: state.auth.transaction,
		user_id: state.auth.id
	};
};

export default connect(mstp, { paymentSend })(payment);
