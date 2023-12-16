const usersExpenseList = document.getElementById("list");

window.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("buy-premium").style.pointerEvents = "none";
	try {
		const allUserExpenses = await axios.get(
			`http://localhost:4000/premium/show-leaderboard`,
			{ headers: { Authorization: localStorage.getItem("accessToken") } }
		);

		for (let i = 0; i < allUserExpenses.data.length; i++) {
			displayLeaderBoard(allUserExpenses.data[i]);
		}
	} catch (error) {
		console.log(error);
	}
});

function displayLeaderBoard(data) {
	const tr = document.createElement("tr");
	const thName = document.createElement("td");
	const thAmt = document.createElement("td");

	thName.appendChild(document.createTextNode(data.name));
	thAmt.appendChild(document.createTextNode(data.totalExpense));
	tr.appendChild(thName);
	tr.appendChild(thAmt);

	usersExpenseList.appendChild(tr);
}
