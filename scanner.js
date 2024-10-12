var isRunning = true;


let blockScanSuccess = document.getElementById("block_scan_success");
let blockMyQrReader = document.getElementById("my-qr-reader-holder");
blockScanSuccess.style.visibility = "hidden";
blockMyQrReader.style.visibility = "visible";

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function fetchTaskUserIds(taskId, userId) {
    console.log("fetching task_id and user_id ...");
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    fetch(`https://polytones.online/api/task/${taskId}/user/${userId}`, {
        method: "PATCH",
        headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            is_completed: true
        }),
    }).then(
        res => {
            if (res.ok) {
                console.log("taskId and userId were successfully sent.");
            }
        },
        err => {
            console.log(err);
        });
}

domReady(function () {
    let scanView = document.getElementById("my-qr-reader");
    let htmlScanner = new Html5QrcodeScanner(
        "my-qr-reader",
        {fps: 10, qrbos: 250}
    );
    async function onScanSuccess(decodeText, decodeResult) {
        if(!isRunning) {
            return;
        }
        let taskId = 0;
        let userId = 0;
        try {
            let resultJson = JSON.parse(decodeText);
            taskId = resultJson.task_id;
            userId = resultJson.user_id;
            console.log("QR was successfully recognized:", taskId, userId);
        } catch (ex) {
            console.error("HackatonException: Not a valid QR: " + decodeText);
            return;
        }

        await fetchTaskUserIds(taskId, userId);
        blockScanSuccess.style.visibility = "visible";
        blockMyQrReader.style.visibility = "hidden";
        isRunning = false;
    }
    htmlScanner.render(onScanSuccess);

});

function onClickButtonScanNew() {
    blockScanSuccess.style.visibility = "hidden";
    blockMyQrReader.style.visibility = "visible";
    console.log("button scan new clicked");
    isRunning = true;
}