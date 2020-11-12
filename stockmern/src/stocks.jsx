import React, { Component } from 'react';

import axios from 'axios';
import {Line} from 'react-chartjs-2';
import logo from './logo-stockmernfit.png'

export default class Stocks extends Component {






	constructor(props) {
		super(props)


		this.state = {list: [

						{symbol: '--', shortName: '--' }],
					  timeseries: [
					 	{close: [0,1,2,3]}],
					  timestamps: [
					  	{series: [0,1,2,3]}],
					  	stock:'',
					  	searching:false	
					 }

		this.handleChange = this.handleChange.bind(this)

		this.search = this.search.bind(this)
		}


	


	render() {

		var stockinfo = this.state.list;

		console.log("Stock Info:" + stockinfo)

		var chartinfo = this.state.timeseries[0].close
		var chartTimestamps = this.state.timestamps

		console.log("chart info:" + chartinfo)
		console.log("chart timestamps:" + chartTimestamps)
	

		const graph = {
			labels: chartTimestamps,
			datasets: [
				{
					label: 'Stock Price',
					fill: false,
					lineTension: 0.5,
					backgroundColor: 'rgba(75,192,192,1)',
					borderColor: 'rgba(44,130,201,1)',
					borderwidth: 2,
					data: chartinfo

				}]
		}

		

		var infolist = stockinfo.map(stock => {
			return (
				<p key={stock.symbol}> Ticker: {stock.symbol} Company: {stock.shortName}</p>)
		})

		var stockdit = stockinfo.map(stock => {
			return(
				<p key={stock.regularMarketPrice}> Price: {stock.regularMarketPrice} {stock.financialCurrency} | 52-week low: {stock.fiftyTwoWeekLow} {stock.financialCurrency} | 52-week high: {stock.fiftyTwoWeekHigh} {stock.financialCurrency} 
				 									 </p>
				)
	
		})
		var regularmarket = stockinfo.map(stock => {
			return(
				<p key = {stock.regularMarketDayOpen}> Open: {stock.regularMarketOpen} {stock.financialCurrency} | Volume: {stock.regularMarketVolume} | Mkt Cap: {stock.marketCap}</p>)
		})

		return (
			<div>
				<header><h1>stockMERN</h1></header>
				

				<ul><input name="stock" 
						   value={this.state.stock}
						   onChange={this.handleChange}/><br></br>

						   <button onClick={this.search}> Search </button>
				</ul>

				<ul> {infolist}


			<Line
				data={graph}
				options={{
					title:{
						display:true,
						text:this.state.stock+' price over time',
						fontSize:10
					},
					legend:{
						display:false,
						position:'right'
					},
					scales: {
						xAxes: [{
							ticks: {
								display:false
							}
						}]
					},
					elements: {
						point: {
							radius: 0
						},
						responsive: true,
						maintainAspectRatio: true
					}
			        }
				}
				/>
					 {stockdit} 
					 {regularmarket}

					 <form action = '/'>
					<input type="submit" value="Logout" />
						</form>

						 </ul>
				</div>

			);

	
}	search(){


		const options = {
				method: 'GET',
				url: 'https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote',
  				params: {symbols: this.state.stock},
  				 headers: {
    				'x-rapidapi-key': '8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2',
    				'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'}
		};

		const chartoptions = {
		 		 method: 'GET',
		  		url: 'https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/chart/'+this.state.stock,
		  		headers: {
		    		'x-rapidapi-key': '8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2',
		    		'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'}
		};





			axios.request(options)
			.then((response) => {
				if(Math.floor(response.status/100)===2){
				this.setState({list: response.data.quoteResponse.result});
			// this.state.list.shortName = response.data.quoteResponse.result[0].shortName;
					console.log("Result: ",this.state)
					return;
				}
			// console.log ("Company: ", this.state.list)
		}).catch(function (error){
			console.error(error);
		})

		axios.request(chartoptions)
			.then((response) => {
				if(Math.floor(response.status/100)===2){
					this.setState({timeseries: response.data.chart.result[0].indicators.quote,
									timestamps: response.data.chart.result[0].timestamp});
					console.log("chart result:", this.state.timeseries)
					console.log("timestamps:", this.state.timestamps)
					return;

				}
			}).catch(function (error){
				console.error(error);
			})
			console.log("stock:" + this.state.stock)

}
	
	handleChange(event) {
				var handleState = (state, event) => {
					state[event.target.name] = event.target.value
					return state
				}
				this.setState(handleState(this.state, event))
			}


}







