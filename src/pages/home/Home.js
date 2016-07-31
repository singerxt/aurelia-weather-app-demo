'use strict';

import { Configuration } from '../../common/Configuration/Configuration';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Configuration, Router)
export class Home {
  cityInputValue = '';

  /**
   *
   * @constructor
   * @param config
   * @param router
   */
  constructor(config, router) {
    this.geoButton = {
      disabled: false,
    }
    this.config = config;
    this.router = router;
  }

  /**
   *
   *
   */
  handleCityChoose() {
    const city = this.cityInputValue;
    this.config.geoData = { city };
    this.router.navigate('details');
  }

  /**
   * Change state of geo button after click
   */
  toggleGeoButton() {
    if (this.geoButton.disabled) {
      this.geoButton = {
        message: 'Click!',
        disabled: false,
      };
    } else {
      this.geoButton = {
        disabled: true,
      };
    }
  }

  /**
   * Get geoData
   */
  useGeoLocation() {
    if (this.geoButton.disabled) {
      return;
    }

    this.toggleGeoButton();
    navigator
      .geolocation
      .getCurrentPosition(
        this.handleGeoData.bind(this)
      );
  }

  /**
   * 
   * @param data
   */
  handleGeoData(data) {
    this.toggleGeoButton();
    this.config.geoData = {
      latitude: data.coords.latitude,
      longitude: data.coords.longitude,
    };
    this.router.navigate('details');
  }
}
