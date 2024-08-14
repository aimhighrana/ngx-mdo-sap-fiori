import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tabs } from '../interfaces/tabs';
import { Fields } from '../interfaces/Fields';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private _baseUrl = '/assets/mock-data';

    constructor(private http: HttpClient) { }

    public getTabs(): Observable<Tabs[]> {
        return this.http.get<Tabs[]>(`${this._baseUrl}/tabs.json`)
    }

    public getFields(tab: string): Observable<Fields[]> {
        return this.http.get<Fields[]>(`${this._baseUrl}/${tab}.json`)
    }
}