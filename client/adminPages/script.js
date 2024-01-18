const login = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3001/admin/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
        if (response.ok) {
            data = await response.json();
            //console.log(data.success)
            if (data.success === true) {
                alert(data.message)
                window.location.href = './createUser.html'
            } else {
                alert(data.message)
            }
        } else {
            alert("error")
        }
    } catch (err) {
        console.log(err)
    }
}
const createuser = async () => {
    const userIdInput = document.getElementById('userid');
    const passwordInput = document.getElementById('password');

    const userId = userIdInput.value;
    const password = passwordInput.value;

    if (userId === "" || password === "") {
        alert("Please fill all field")
        return;
    }
    //console.log(userid)
    try {
        const response = await fetch("http://localhost:3001/user/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, password })
        })
        if (response.ok) {
            data = await response.json();
            alert(data.message)
            userIdInput.value = "";
            passwordInput.value = "";
            //console.log(data);
        }
    } catch (err) {
        console.log(err)
    }
}
const viewDetail = async () => {
    const userId = document.getElementById('useridd').value;
    // const userIdd = document.getElementById('useriddd').value;
    try {
        const response = await fetch("http://localhost:3001/user/detail", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
        })
        if (response.ok) {
            const data = await response.json();

            // Convert user data to a query string
            const userDataQueryString = Object.entries(data.user)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');

            // Construct the URL with the query string
            const userDetailUrl = `./userDetail.html?${userDataQueryString}`;

            // Navigate to userDetail.html
            window.location.href = userDetailUrl;
        }
    } catch (err) {
        console.log(err)
    }
}
const deleteUser = async (id) => {
    try {
        const response = await fetch("http://localhost:3001/admin/deletuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        })
        if (response.ok) {
            const data = await response.json();
            alert(data.message)
            window.location.href = './createUser.html'
        }
    } catch (err) {
        console.log(err)
    }
}
const accept = async (id) => {
    try {
        const response = await fetch("http://localhost:3001/admin/updateuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        })
        if (response.ok) {
            data = response.json();
            alert("Accept the user")
            window.location.href = './createUser.html'
        }
    } catch (err) {
        console.log(err)
    }
}
document.addEventListener('DOMContentLoaded', function () {

    const urlParams = new URLSearchParams(window.location.search);


    const userId = urlParams.get('userId');
    const name = urlParams.get('name');
    const photo = urlParams.get('photo')
    const status = urlParams.get('status');
    const id = urlParams.get('_id')

    const userDetailsId = document.getElementById('userId');
    userDetailsId.innerHTML = `<p>${userId}</p>`;

    const userName = document.getElementById('userName');
    userName.innerHTML = `<p>${name !== null ? name : ''}</p>`;

    const userPhoto = document.getElementById('userPhoto');
    userPhoto.innerHTML = `<img src="${photo !== null ? photo : 'https://i.stack.imgur.com/l60Hf.png'}" alt="User Photo" style="height: 80px; width: 77px;">`;

    const userStatus = document.getElementById('userUp');
    //userStatus.innerHTML = `<p>${status !== null ? (status === 'false' ? '<a class="done-btn">Done</a> <a class="dlt-btn" onclick="deleteUser(${id})">Delete</a>' : '<a class="dlt-btn" onclick="deleteUser(${id})">Delete</a>') : ''}</p>`;

    const deleteButton = (id) => `<a class="dlt-btn" onclick="deleteUser('${id}')">Delete</a>`;
    const doneButton = `<a class="done-btn" onclick="accept('${id}')">Done</a>`;


    userStatus.innerHTML = `<p>${status !== null ? (status === 'false' ? `${doneButton} ${deleteButton(id)}` : deleteButton(id)) : ''}</p>`;


    // console.log({
    //       userId,
    //       name,
    //       photo,
    //       status,
    //       id
    //   });
});