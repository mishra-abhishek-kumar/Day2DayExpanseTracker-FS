const inputExpense = document.getElementById('exp-amt');
const inputDescription = document.getElementById('desc');
const inputCategory = document.getElementById('expense-cat');
const expenseList = document.getElementById('expenses');
const form = document.getElementById('form');
const msg = document.querySelector('.msg');
const premiumBtn = document.getElementById('premium-btn');

form.addEventListener('submit', addExpense);
expenseList.addEventListener('click', removeExpense);
expenseList.addEventListener('click', editExpense);
premiumBtn.addEventListener('click', buyPremium);

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const expenses = await axios.get(`http://localhost:4000/expenses/get-expense`, {
            headers: {
                "Authorization": localStorage.getItem('accessToken')
            }
        });
        for(let i=0; i<expenses.data.length; i++) {
            displayExpenseDetails(expenses.data[i]);
        }
    } catch (error) {
        console.log(error);
    }
});

function displayExpenseDetails(expenseObj) {
    //Creating different elements to be added in DOM
    const li = document.createElement('li');
    const delBtn = document.createElement('input');
    const editBtn = document.createElement('input');

    //Creating Delete button
    delBtn.className = 'del float-right';
    delBtn.setAttribute('type', "button");
    delBtn.setAttribute('value', "DELETE");

    //Creating Edit button
    editBtn.className = 'edit float-right';
    editBtn.setAttribute('type', "button");
    editBtn.setAttribute('value', "EDIT");

    //Appending all above 3 elements
    li.appendChild(document.createTextNode(`${expenseObj.amt} - ${expenseObj.description} - ${expenseObj.category}`));
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    li.setAttribute("id", expenseObj.id);

    //appendimg the li to ul inside DOM
    expenseList.appendChild(li);
}

async function addExpense(e) {
    e.preventDefault();

    if (inputExpense.value === '' || inputDescription.value === '' || inputCategory.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 2000);
    } else {
        //Creating different elements to be added in DOM
        const li = document.createElement('li');
        const delBtn = document.createElement('input');
        const editBtn = document.createElement('input');

        //Creating Delete button
        delBtn.className = 'del float-right';
        delBtn.setAttribute('type', "button");
        delBtn.setAttribute('value', "DELETE");

        //Creating Edit button
        editBtn.className = 'edit float-right';
        editBtn.setAttribute('type', "button");
        editBtn.setAttribute('value', "EDIT");

        //Appending all above 3 elements
        li.appendChild(document.createTextNode(`${inputExpense.value} - ${inputDescription.value} - ${inputCategory.value}`));
        li.appendChild(delBtn);
        li.appendChild(editBtn);


        //appendimg the li to ul inside DOM
        expenseList.appendChild(li);

        //Storing user Data as an object
        const expenseObj = {
            amt: `${inputExpense.value}`,
            description: `${inputDescription.value}`,
            category: `${inputCategory.value}`
        }

        try {
            const response = await axios.post(`http://localhost:4000/expenses/add-expense`, expenseObj, {
                headers: {
                    "Authorization": localStorage.getItem('accessToken')
                }
            });
            li.setAttribute("id", response.data.id);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

        inputExpense.value = '';
        inputDescription.value = '';
        inputCategory.value = '';

    }
}

async function removeExpense(e) {
    if (e.target.classList.contains('del')) {
        try {
            const response = await axios.delete(`http://localhost:4000/expenses/delete-expense/${e.target.parentElement.id}`);
            expenseList.removeChild(e.target.parentElement);
        } catch (error) {
            console.log(error);
        }
    }
}

async function editExpense(e) {
    if (e.target.classList.contains('edit')) {
        partsString = e.target.parentElement.innerText.split('-');
        inputExpense.value = partsString[0].trim();
        inputDescription.value = partsString[1].trim();
        inputCategory.value = partsString[2].trim();
        try {
            const response = await axios.delete(`http://localhost:4000/expenses/delete-expense/${e.target.parentElement.id}`);
            expenseList.removeChild(e.target.parentElement);
        } catch (error) {
            console.log(error);
        }
    }
}

async function buyPremium() {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(`http://localhost:4000/purchase/buy-premium`, {
        headers: {
            "Authorization": accessToken
        }
    });
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order_id,
        "handler": async function (response) {
            await axios.post(`http://localhost:4000/purchase/update-txn-status`, {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            }, {headers: { "Authorization": accessToken }});

            alert("You're a premium user now");
        }
    }
}