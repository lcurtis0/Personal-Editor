const butInstall = document.getElementById('buttonInstall');




// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    const message = window.confirm("Are you sure you want ot install?");

    if (resonse === "yes" || "y") {
        alert("Your code has been installed");
    } else if (resonse === "no" || "n") {
        alert("Nothing was installed")
    } else {
        alert("Please enter 'yes' or 'no'");
    }

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => { });
