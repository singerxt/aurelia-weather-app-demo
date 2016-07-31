'use strict';

/**
 * Some of data need to be shared across all components.
 * That's why we have configuration class which sharing common data.
 *
 * @author Mateusz Śpiewak (mat.spiewak@gmail.com)
 * @class
 */
export class Configuration {
  constructor(){
    this.apiDefaults = '?APPID=51a3dad60583269ef8489d9c52ea8511&units=imperial&';
    this.baseUri = 'http://api.openweathermap.org/data/2.5/';
  }
}
