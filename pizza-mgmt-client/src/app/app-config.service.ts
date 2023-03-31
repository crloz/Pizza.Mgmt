import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { AppConfig } from './shared/app-config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  static CONFIG_URL = '/assets/config.json';
  #config$: Observable<AppConfig> | undefined;
  #http: HttpClient;

  constructor(http: HttpClient) {
    this.#http = http;
  }

  load() {
    if (this.#config$ === undefined) {
      this.#config$ = this.#http.get<AppConfig>(AppConfigService.CONFIG_URL).pipe(shareReplay());
    }
  }

  get config$(): Observable<AppConfig> {
    if (this.#config$ === undefined) {
      throw new Error('AppConfigService not initialized');
    }
    return this.#config$;
  }

  get baseUrl(): Observable<string> {
    return this.config$.pipe(
      map(config => `${config.baseUrl}/${config.apiPath}/v${config.apiVersion}`)
    );
  }
}
