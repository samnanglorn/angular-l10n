import { Component } from '@angular/core';
// Services.
import { Locale, LocaleService, LocalizationService } from 'angular2localization/angular2localization';

export type LayoutDirection = 'ltr' | 'rtl';

@Component({
    selector: 'app-component',
    templateUrl: './app/app.component.html'
})

export class AppComponent extends Locale {

    dir: LayoutDirection;

    constructor(public locale: LocaleService, public localization: LocalizationService) {
        super(null, localization);

        // Adds a new language (ISO 639 two-letter or three-letter code).
        this.locale.addLanguage('en');
        this.locale.addLanguage('it');
        this.locale.addLanguage('ar');
        // Add a new language here.

        // Required: default language, country (ISO 3166 two-letter, uppercase code) and expiry (No days). If the expiry is omitted, the cookie becomes a session cookie.
        this.locale.definePreferredLocale('en', 'US', 30);

        // Optional: default currency (ISO 4217 three-letter code).
        this.locale.definePreferredCurrency('USD');

        // Initializes LocalizationService: asynchronous loading.
        this.localization.translationProvider('./resources/locale-'); // Required: initializes the translation provider with the given path prefix.
        this.localization.updateTranslation(); // Need to update the translation.

        // Initializes direction.
        if (this.locale.getCurrentLanguage() == "ar") {

            this.dir = 'rtl';

        } else {

            this.dir = 'ltr';

        }

    }

    // Gets the current country.
    get currentCountry(): string {

        return this.locale.getCurrentCountry();

    }

    // Sets a new locale & currency.
    selectLocale(language: string, country: string, currency: string): void {

        this.locale.setCurrentLocale(language, country);
        this.locale.setCurrentCurrency(currency);

    }

}
