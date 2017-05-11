// Localization

function Localizer () {
    this.init();
};

Localizer.prototype.init = function () {
    var request = new XMLHttpRequest(),
        myself = this;

    this.locale = localStorage['locale'];
    this.translations = {};

    if (!this.locale || this.locale === 'en') {
        return;
    }

    request.open('GET', 'locales/' + this.locale + '.json?random=' + Math.random(1000), false);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status === 0) {
                myself.loadTranslations(request.responseText);
            }
        }
    };
    request.send(null);
};


Localizer.prototype.loadTranslations = function (fileContents) {
    this.translations = JSON.parse(fileContents);
    this.localizePage();
};

Localizer.prototype.localizePage = function () {
    var myself = this;
    document.querySelectorAll('[localizable]').forEach(function (element) {
        element.innerHTML = myself.localize(element.innerHTML);
    })
};

Localizer.prototype.localize = function (aString) {
    return this.translations[aString] || aString;
};
