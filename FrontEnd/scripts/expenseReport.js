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

//downloading pdf using jsPDF
function downloadDailyReportPDF() {
	// Get the HTML table element
	var table = document.getElementById("daily-report");

	// Create a new jsPDF instance
	var pdf = new jsPDF();

	// Customize the heading and logo styles
	var logo = document.getElementById("app-logo");
	var imageData = new Image();
	imageData.src = logo.src;
	pdf.addImage(imageData, "PNG", 5, 5, 80, 30);

	// Use the autoTable plugin to add the table to the PDF
	pdf.autoTable({ html: table, startY: 35 });

	// Download the PDF
	pdf.save("DAY 2 DAY - Daily Report.pdf");
}

function downloadMonthlyReportPDF() {
	// Get the HTML table element
	var table = document.getElementById("monthly-report");

	// Create a new jsPDF instance
	var pdf = new jsPDF();

	// Customize the heading and logo styles
	var logo = document.getElementById("app-logo");
	var imageData = new Image();
	imageData.src = logo.src;
	pdf.addImage(imageData, "PNG", 5, 5, 80, 30);

	// Use the autoTable plugin to add the table to the PDF
	pdf.autoTable({ html: table, startY: 35 });

	// Download the PDF
	pdf.save("DAY 2 DAY - Monthly Report.pdf");
}

function downloadYearlyReportPDF() {
	// Get the HTML table element
	var table = document.getElementById("yearly-report");

	// Create a new jsPDF instance
	var pdf = new jsPDF();

	// Customize the heading and logo styles
	var logo = document.getElementById("app-logo");
	var imageData = new Image();
	imageData.src = logo.src;
	pdf.addImage(imageData, "PNG", 5, 5, 80, 30);

	// Use the autoTable plugin to add the table to the PDF
	pdf.autoTable({ html: table, startY: 35 });

	// Download the PDF
	pdf.save("DAY 2 DAY - Yearly Report.pdf");
}

document
	.querySelector("#download-yearly-report")
	.addEventListener("click", downloadDailyReportPDF);
document
	.querySelector("#download-daily-report")
	.addEventListener("click", downloadMonthlyReportPDF);
document
	.querySelector("#download-monthly-report")
	.addEventListener("click", downloadYearlyReportPDF);
