(function () {
    function overrideFunction() {
        var window = window ?? self; 
        if (window.App && window.App.relationshipsRouter && window.App.relationshipsRouter.relationshipDetailsView) {
            Object.defineProperty(window.App.relationshipsRouter.relationshipDetailsView, "showProUpsell", {
                value: function (e) { return false; },
                writable: false, // Prevents further modification
                configurable: false
            });
        }
    }

    const observer = new MutationObserver(() => {
        overrideFunction();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    overrideFunction();
})();
