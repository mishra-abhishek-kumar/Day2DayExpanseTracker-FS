const form = document.getElementById('form');
const formName = document.getElementById('form-name');
const formEmail = document.getElementById('form-email');
const formPassword = document.getElementById('form-password');

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
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }

    formName.value = '';
    formEmail.value = '';
    formPassword.value = '';
}

let alertShow = false;
setInterval(() => {
    document.title = alertShow ? "Welcome to Day2Day": "User - Signup";
    alertShow = !alertShow;
}, 2000);