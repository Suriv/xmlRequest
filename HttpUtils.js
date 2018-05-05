"use strict";

const Promise = require("bluebird");
const request = require("request");

class HttpUtils {

    /**
     * Empty constructor
     * @constructor
     * @returns {void}
     */
    constructor() {

    }

    /**
     * Stablish a http communications using REST Verbs: GET/POST/PUT/DELETE
     *
     * @param  {json} options          [define options to make the request with the CF component]
     * @param  {number} httpStatusAssert [set expected http status code (200,201,204, etc...)]
     * @param  {boolan} jsonOutput       [if the REST method retuns a String or a JSON representation]
     * @return {string}                  [JSON/String]
     *
     * @example
     * var url = "https://api.run.pivotal.io/v2/info";
     *       var options = {
     *           method: 'GET',
     *           url: url
     *       };
     * HttpUtils.request(options, "200", true);
    */
    request (options, httpStatusAssert, jsonOutput) {
        let result = null;

        const requestWithDefaults = request.defaults({
            rejectUnauthorized: false
        });

        return new Promise(function (resolve, reject) {

            try {

                requestWithDefaults(options, function (error, response, body) {
                    if (error) {
                        return reject(error);
                    }

                    if (jsonOutput) {
                        try {
                            result = JSON.parse(body);
                        } catch (errorJSON) {
                            return reject(body);
                        }
                    } else {
                        result = body;
                    }


                    if (!error && response.statusCode === httpStatusAssert) {
                        return resolve(result);
                    }

                    //Defensive code.
                    if (body.length === 0) {
                        return reject("EMPTY_BODY");
                    }
                    return reject(body);
                });

            } catch (error) {
                return reject(error);
            }

        });
    }
}

module.exports = HttpUtils;
