const form = document.getElementById("form");
const formEmail = document.getElementById("form-email");
const formPassword = document.getElementById("form-password");
const alert = document.querySelector(".alert");
const checkbox = document.getElementById("show-password");

form.addEventListener("submit", loginUser);
checkbox.addEventListener("change", togglePassword);

async function loginUser(e) {
	e.preventDefault();

	const userInfo = {
		email: `${formEmail.value}`,
		password: `${formPassword.value}`,
	};

	try {
		const response = await axios.post(
			"http://localhost:4000/user/login",
			userInfo
		);
		if (response.status == "200") {
			localStorage.setItem("accessToken", response.data);
			window.location.href = `http://127.0.0.1:5500/FrontEnd/pages/home.html`;
		}
	} catch (error) {
		if (error.response.status == "409") {
			alert.classList.add("error");
			alert.innerHTML = "User not registered. Try regestering user!";
			setTimeout(() => {
				alert.classList.remove("error");
				alert.innerHTML = "";
			}, 3000);
		}
		if (error.response.status == "403") {
			alert.classList.add("error");
			alert.innerHTML = "Incorrect Password";
			setTimeout(() => {
				alert.classList.remove("error");
				alert.innerHTML = "";
			}, 3000);
		}
		console.log(error);
	}

	formEmail.value = "";
	formPassword.value = "";
}

let alertShow = false;
setInterval(() => {
	document.title = alertShow ? "Welcome to Day2Day" : "User - Login";
	alertShow = !alertShow;
}, 2000);

function togglePassword() {
	if (checkbox.checked) {
		formPassword.type = "text";
	} else {
		formPassword.type = "password";
	}
}
