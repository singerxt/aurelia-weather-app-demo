'use strict';

import { Configuration } from '../../common/Configuration/Configuration';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';

/**
 *
 * @author Mateusz Śpiewak
 * @class
 */
@inject(Configuration, Router, Lazy.of(HttpClient))
export class Details {

  constructor(config, router, getHttpClient) {
    this.config = config;
    this.router = router;
    this.getHttpClient = getHttpClient;
    if (this.validate()) {
      this.getWeather();
    }
  }

  /**
   * Validate data for API request.
   * @param error
   * @returns {boolean}
   */
  validate() {
    const isInvalid = !this.config ||
      !this.config.geoData ||
      !this.config.geoData.latitude;

    if (isInvalid && this.config.geoData.city === '') {
      this.detailsPageState = {
        loading: true,
        error: {
          status: true,
          message: 'Not valid geo data',
        },
      };
      return;
    }

    this.detailsPageState = {
      loading: false,
      error: {
        status: false,
      },
    };

    return true;
  }
  
  backClick() {
    this.router.navigate('');
  }

  getReqParams() {
    let params;

    if (this.config.geoData.latitude) {
      params = `${this.config.apiDefaults}lat=${this.config.geoData.latitude}&lon=${this.config.geoData.longitude}`
    } else {
      params = `${this.config.apiDefaults}q=${this.config.geoData.city}`;
    }

    return params;
  }

  /**
   * getWeather
   * fetching data from openweather api
   */
  async getWeather() {
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(this.config.baseUri)
    });

    const responseNow = await http.fetch(
      `/weather/${this.getReqParams()}`
    );

    console.log(responseNow);
    const responseNext = await http.fetch(
      `/forecast/${this.getReqParams()}`
    );

    this.weather = await responseNow.json();
    this.weatherNext = await responseNext.json();
    this.detailsPageState.loading = true;
  }
}
