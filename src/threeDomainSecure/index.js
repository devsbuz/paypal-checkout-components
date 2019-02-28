/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

// import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'zoid/src';
// import { type Component } from 'zoid/src/component/component';

import { ENV } from '../constants';
import { getButtonSessionID, getBrowserLocale, getSessionID, getCurrentScriptUrl } from '../lib';
import { config } from '../config';

import { containerTemplate } from '../billing/template';

export const ThreeDomainSecure = create({
    tag:  'paypal-3ds',
    name: '3ds',

    buildUrl(props) : string {
        const env = props.env || config.env;
        return `${ config.inlinedCardFieldUrls[env] }/init3ds`;
    },

    get domain() : Object {
        return {
            ...config.paypalDomains,
            [ ENV.LOCAL ]: /^http:\/\/localhost.paypal.com:\d+$/
        };
    },

    scrolling: true,

    props: {
        sdkMeta: {
            type:        'string',
            queryParam:  true,
            sendToChild: false,
            def:         () => {
                return btoa(JSON.stringify({
                    url: getCurrentScriptUrl()
                }));
            }
        }
    },


    containerTemplate
});
