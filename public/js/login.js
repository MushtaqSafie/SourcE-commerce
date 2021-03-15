document.getElementById("login-form").addEventListener("submit", (e) => {
    alert("you clicked me");
    e.preventDefault();
});

fetch(`api/customers`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(Customer),
}).then(() => {
    document.getElementById('login-form').value = '';
    location.reload('');
});


