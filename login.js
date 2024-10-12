function submitLogin() {
    let username = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    fetch("https://polytones.online/api/auth/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            'username': username,
            'password': password,
        })
    }).
    then(
        res => {
            if (res.ok) {
                console.log("Login is successfull.");
                res.json().then(
                    resJsonData => {
                        console.log(resJsonData.access_token);
                        window.location.replace(`scanner.html?accessToken=${resJsonData.access_token}`);
                    }
                )
            }
        },
        err => {
            console.log(err)
        })
}