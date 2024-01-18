const login = async () => {
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    //console.log(userId, password)
    try {
        const response = await fetch("http://localhost:3001/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, password })
        })
        if (response.ok) {
            data = await response.json();
            alert(data.message);
            localStorage.setItem('userId', userId);
            if (data.success === true) window.location.href = './updateUser.html'
        }
    } catch (err) {
        console.log(err)
    }
}

function openUserDetail() {


    // const width = window.innerWidth / 2;
    // const height = window.innerHeight;
    // const options = `width=${width},height=${height},top=0,right=0,location=no,status=no,menubar=no,scrollbars=yes`;

    // window.open('./userDetail.html', '_blank', options);
}

function openUserDetail() {



    const userDetailDiv = document.getElementById('userDetail');
    userDetailDiv.classList.remove('hidden');
    document.getElementById('userDetailName').innerText = userName;
}

// Optional: Close the userDetail div by clicking outside of it
document.addEventListener('click', function (event) {
    const userDetailDiv = document.getElementById('userDetail');
    if (!event.target.closest('#userDetail') && !event.target.closest('.view-btn')) {
        userDetailDiv.classList.add('hidden');
    }
});
async function openUserDetail() {

    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch("http://localhost:3001/user/detail", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
        })
        data = await response.json();
        //console.log(data)
        const username = await data.user.name;
        const photo = await data.user.photo
        const status = await data.user.status;


        if (username !== null && username !== undefined) {
            document.getElementById('userName').innerHTML = username;
        }
        if (photo !== undefined) {
            const userphoto = document.getElementById('userphoto')
            userphoto.innerHTML = `<img src=${photo} style="height: 318px; width: 332px">`
        }
        if (status === "true") {
            document.getElementById('status').innerHTML = '<p style="color:#249E45">Accepted by Admin</p>'
        } else {
            document.getElementById('status').innerHTML = '<p style="color:#F54949">Not Accepted by Admin</p>'
        }
        //console.log(username)
    } catch (err) {
        console.log(err)
    }



    const userName = document.getElementById('name').value;
    const userDetailDiv = document.getElementById('userDetail');
    userDetailDiv.classList.remove('hidden');
    document.getElementById('userDetailName').innerText = userName;
}

function closeUserDetail() {

    const userDetailDiv = document.getElementById('userDetail');
    userDetailDiv.classList.add('hidden');
}
//  const uploadPreset = 'social-media';
const setImage = async () => {
    const name = document.getElementById('name').value;
    if (name === '') {
        alert("please enter name")
        return
    }

    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    const uploadPreset = 'social-media';
    const data = new FormData();
    data.append("file", file);
    data.append('upload_preset', uploadPreset); // Replace with your actual upload preset
    data.append("cloud_name", "dvx7ayyya");
    let photo;
    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dvx7ayyya/image/upload", {
            method: "POST",
            body: data
        });

        if (response.ok) {
            const responseData = await response.json();
            //console.log(responseData);
            photo = responseData.url;
        } else {
            console.error('Failed to upload image:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }


    const userId = localStorage.getItem('userId');

    try {
        const response = await fetch("http://localhost:3001/user/update", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, name, photo })
        })
        if (response.ok) {
            data = await response.json()
            //console.log(data);
        }
    } catch (err) {
        console.log(err)
    }
    alert('image upload successful')
    window.location.href = './updateUser.html'
    // console.log(name)
    // console.log(photo)
} 