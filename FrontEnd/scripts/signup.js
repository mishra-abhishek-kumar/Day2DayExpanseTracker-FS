const form = document.getElementById('form');
const formName = document.getElementById('form-name');
const formEmail = document.getElementById('form-email');
const formPassword = document.getElementById('form-password');
const alert = document.querySelector('.alert');

form.addEventListener('submit', createUser);

async function createUser(e) {
    e.preventDefault();

    const userInfo = {
        name: `${formName.value}`,
        email: `${formEmail.value}`,
        password: `${formPassword.value}`
    };

    try {
        const response = await axios.post('http://localhost:4000/user/signup', userInfo);
        if (response.status == '201') {
            window.location.href = 'http://127.0.0.1:5500/FrontEnd/pages/home.html';
        }
    } catch (error) {
        if (error.response.status == '409') {
            alert.classList.add('error');
            alert.innerHTML = 'User is already registered. Try Login!';
            setTimeout(() => {
                alert.classList.remove('error');
                alert.innerHTML = '';
            }, 3000);
        }
        console.log(error);
    }

    formName.value = '';
    formEmail.value = '';
    formPassword.value = '';
}

let alertShow = false;
setInterval(() => {
    document.title = alertShow ? "Welcome to Day2Day" : "User - Signup";
    alertShow = !alertShow;
}, 2000);