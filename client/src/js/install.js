const butInstall = document.getElementById('buttonInstall');

// Before installing the prompt will not activate yet
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// The prompt will then show on click
butInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;

    // If not approved do nothing by returning nothing
    if (!promptEvent) {
        return;
    }

    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);

    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
    console.log("The install button has been pressed");

});

// Once approved it will console.log but also reset to null
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    window.deferredPrompt = null;
});
