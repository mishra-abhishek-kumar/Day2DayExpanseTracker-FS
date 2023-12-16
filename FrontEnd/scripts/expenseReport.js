const userDailyExpenseReport = document.getElementById("daily-report");
const userMonthlyExpenseReport = document.getElementById("monthly-report");
const userYearlyExpenseReport = document.getElementById("yearly-report");

window.addEventListener("DOMContentLoaded", async () => {
	document.getElementById("buy-premium").style.pointerEvents = "none";
	try {
		const dailyExpenseReport = await axios.get(
			`http://localhost:4000/premium/daily-expense-report`,
			{ headers: { Authorization: localStorage.getItem("accessToken") } }
		);

		for (let i = 0; i < dailyExpenseReport.data.dailyReport.length; i++) {
			displayDailyExpenseReport(dailyExpenseReport.data.dailyReport[i]);
		}
	} catch (error) {
		console.log(error);
	}

	try {
		const monthlyExpenseReport = await axios.get(
			`http://localhost:4000/premium/monthly-expense-report`,
			{ headers: { Authorization: localStorage.getItem("accessToken") } }
		);

		for (let i = 0; i < monthlyExpenseReport.data.monthlyReport.length; i++) {
			displayMonthlyExpenseReport(monthlyExpenseReport.data.monthlyReport[i]);
		}
	} catch (error) {
		console.log(error);
	}

	try {
		const yearlyExpenseReport = await axios.get(
			`http://localhost:4000/premium/yearly-expense-report`,
			{ headers: { Authorization: localStorage.getItem("accessToken") } }
		);

		for (let i = 0; i < yearlyExpenseReport.data.yearlyReport.length; i++) {
			displayYearlyExpenseReport(yearlyExpenseReport.data.yearlyReport[i]);
		}
	} catch (error) {
		console.log(error);
	}
});

function displayDailyExpenseReport(data) {
	const tr = document.createElement("tr");
	const thDate = document.createElement("td");
	const thDesc = document.createElement("td");
	const thCat = document.createElement("td");
	const thAmt = document.createElement("td");

	const date = data.createdAt.toString().split("T")[0];

	thDate.appendChild(document.createTextNode(date));
	thDesc.appendChild(document.createTextNode(data.description));
	thCat.appendChild(document.createTextNode(data.category));
	thAmt.appendChild(document.createTextNode(data.amt));
	tr.appendChild(thDate);
	tr.appendChild(thDesc);
	tr.appendChild(thCat);
	tr.appendChild(thAmt);

	userDailyExpenseReport.appendChild(tr);
}

function displayMonthlyExpenseReport(data) {
	const tr = document.createElement("tr");
	const thDate = document.createElement("td");
	const thDesc = document.createElement("td");
	const thCat = document.createElement("td");
	const thAmt = document.createElement("td");

	const date = data.createdAt.toString().split("T")[0];

	thDate.appendChild(document.createTextNode(date));
	thDesc.appendChild(document.createTextNode(data.description));
	thCat.appendChild(document.createTextNode(data.category));
	thAmt.appendChild(document.createTextNode(data.amt));
	tr.appendChild(thDate);
	tr.appendChild(thDesc);
	tr.appendChild(thCat);
	tr.appendChild(thAmt);

	userMonthlyExpenseReport.appendChild(tr);
}

function displayYearlyExpenseReport(data) {
	const tr = document.createElement("tr");
	const thDate = document.createElement("td");
	const thDesc = document.createElement("td");
	const thCat = document.createElement("td");
	const thAmt = document.createElement("td");

	const date = data.createdAt.toString().split("T")[0];

	thDate.appendChild(document.createTextNode(date));
	thDesc.appendChild(document.createTextNode(data.description));
	thCat.appendChild(document.createTextNode(data.category));
	thAmt.appendChild(document.createTextNode(data.amt));
	tr.appendChild(thDate);
	tr.appendChild(thDesc);
	tr.appendChild(thCat);
	tr.appendChild(thAmt);

	userYearlyExpenseReport.appendChild(tr);
}
