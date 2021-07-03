import { AJAX_EVENTS } from '../utils/events';
export class CableCar {
    constructor(cableReady, { mimeType } = {}) {
        this.boundScanner = this.scanner.bind(this);
        this.boundPerform = this.perform.bind(this);
        this.observer = new MutationObserver(this.boundScanner);
        this.elements = [];
        this.cableReady = cableReady;
        this.mimeType = (mimeType !== null && mimeType !== void 0 ? mimeType : 'application/vnd.cable-ready.json');
    }
    get name() {
        return 'CableCar';
    }
    connect() {
        this.scanner(); // Attach to all currently existing nodes / elements.
        // Now lets scan the dom on any big updates.
        document.addEventListener('DOMContentLoaded', this.boundScanner);
        document.addEventListener('turbolinks:load', this.boundScanner);
        document.addEventListener('turbo:load', this.boundScanner);
        document.addEventListener(AJAX_EVENTS.ajaxComplete, this.boundPerform);
        this.observer.observe(document.documentElement, {
            attributeFilter: ['data-cable-car'],
            childList: true,
            subtree: true
        });
    }
    disconnect() {
        this.elements.forEach((element) => {
            var _a;
            (_a = element.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
        });
        document.removeEventListener('DOMContentLoaded', this.boundScanner);
        document.removeEventListener('turbolinks:load', this.boundScanner);
        document.removeEventListener('turbo:load', this.boundScanner);
        document.removeEventListener(AJAX_EVENTS.ajaxComplete, this.boundPerform);
    }
    scanner() {
        if (this.isPreview)
            return;
        Array.from(document.querySelectorAll('[data-cable-car]'))
            .filter(element => {
            return (element.observer == null);
        })
            .forEach(element => {
            const el = element;
            el.dataset.type = this.mimeType;
            el.dataset.remote = 'true';
            el.observer = new MutationObserver(this.integrity);
            el.observer.observe(element, {
                attributeFilter: ['data-type', 'data-remote']
            });
            this.elements.push(el);
        });
    }
    integrity(mutations) {
        mutations.forEach(mutation => {
            const element = mutation.target;
            if (!element.hasAttribute('data-type'))
                element.dataset.type = this.mimeType;
            if (!element.hasAttribute('data-remote'))
                element.dataset.remote = 'true';
        });
    }
    perform(event) {
        var _a;
        console.log("Performing");
        const fetchResponse = event.detail.fetchResponse;
        if (fetchResponse == null)
            return;
        console.log("fetchResponse.contentType", fetchResponse.contentType);
        if (!((_a = fetchResponse.contentType) === null || _a === void 0 ? void 0 : _a.match(this.mimeType)))
            return;
        fetchResponse.responseText.then((response) => {
            console.log("responseText", response);
            this.cableReady.perform(JSON.parse(response));
        });
        // .catch((err: Error) => {
        //   console.error(err)
        // })
    }
    get isPreview() {
        return (document.documentElement.hasAttribute('data-turbolinks-preview') ||
            document.documentElement.hasAttribute('data-turbo-preview'));
    }
}
//# sourceMappingURL=cableCar.js.map