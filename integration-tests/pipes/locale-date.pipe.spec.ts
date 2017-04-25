import { inject, TestBed } from '@angular/core/testing';
import { PipeResolver } from '@angular/compiler';

import { LocaleDatePipe } from './../../index';
import {
    LocalizationModule,
    LocaleService
} from './../../index';

describe('LocaleDatePipe', () => {

    let locale: LocaleService;

    let pipe: LocaleDatePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                LocalizationModule.forRoot()
            ]
        });

        locale = TestBed.get(LocaleService);

        locale.addConfiguration()
            .disableStorage()
            .defineDefaultLocale('en', 'US');
        locale.init();

        pipe = new LocaleDatePipe();
    });

    it('should be marked as pure', () => {
        expect(new PipeResolver().resolve(LocaleDatePipe).pure).toEqual(true);
    });

    it('should localize a date', () => {
        const date = new Date('7/19/2016');

        expect(pipe.transform(date, locale.getDefaultLocale(), 'shortDate')).toEqual('7/19/2016');
        
        locale.setDefaultLocale('it', 'IT');
        expect(pipe.transform(date, locale.getDefaultLocale(), 'shortDate')).toEqual('19/7/2016');
    });

});