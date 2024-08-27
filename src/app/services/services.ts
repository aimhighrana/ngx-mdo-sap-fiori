import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Tabs } from '../interfaces/tabs';
import { Fields } from '../interfaces/Fields';
import { environment } from 'src/environments/environment';
import { Dataset, Dropdown, Flow } from '../models/dataset';

@Injectable({
    providedIn: 'root',
})
export class AppService {

    
    private _baseUrl = '/assets/mock-data';

    private $selectedDatasetInfo: BehaviorSubject<Dataset> = new BehaviorSubject<Dataset>(new Dataset());

    constructor(private http: HttpClient) { }


    public set setSelectedDatasetInfo(dataset: Dataset) {
        this.$selectedDatasetInfo.next(dataset);
    }

    public get getSelectedDatasetInfo(): Observable<Dataset> {
        return this.$selectedDatasetInfo.asObservable();
    }

    public getModules(fetchcount: string = '0', fetchsize: string = '0', language: string='en', searchString: string = ''): Observable<Dataset[]> {
        return this.http.get<Dataset[]>(`${environment.api}/core/module/get-all-modules`, {params:{fetchcount, fetchsize, language, searchString}});
    }



    public getFlow(dataset: string ,fetchCount: string ='0', fetchSize: string = '0', lang: string = 'en', searchString: string = '', eventId: string = '1'): Observable<Flow[]> {
        return this.http.get<any> (`${environment.api}/process/steps/getall-dataset-mapping/V3/${dataset}`, {params:{fetchCount, fetchSize, lang, searchString, eventId}})
        .pipe((map((m)=> m['flows'] || [])));
    }


    public getTabs(formId: string, structure: number [] = [1], lang: string = 'en', fetchCount: string = '0', fetchSize: string = '0', searchTerm: string = ''): Observable<Tabs[]> {
        return this.http.post<Tabs[]>(`${environment.api}/core/tab/${formId}/get-layout-tab-list/${lang}`,{structureIds:structure}, {params:{fetchCount, fetchSize, searchTerm}})
    }

    public getFields(tabId: string, datasetId: string , flowId: string ,structure: number [] = [1], fetchCount: string = '0', fetchSize: string = '0', language: string = 'en', userStepId: string = ''): Observable<Fields[]> {
        return this.http.post<Fields[]>(`${environment.api}/core/tab/fields/${datasetId}/get-tab-fields/${tabId}`, {structureIds:structure},{params:{fetchCount, fetchSize, language, flowId, userStepId}})
    }

    public getDropdown(dataset: string, fieldId: string, language:string = 'en', formId: string='', isRestricted: boolean = false): Observable<Dropdown[]> {
        return this.http.post<any>(`${environment.api}/rule/dropval/edit/list/${dataset}/${fieldId}/${language}`, {"searchString":"","parent":{},"page":0,"size":20}, {params:{formId, isRestricted}}).pipe(map((m)=>{
            return m['content'] || [];
        }));
    }


    public generateRestEndPoint(flowId: string = ''): Observable<string> {
        return this.http.get(`${environment.api}/core-crud/generate/endpoint`, {params:{flowId}, responseType: 'text'});
    }

    public saveRecord(endpoint: string, body: any): Observable<any> {
        return this.http.post(endpoint, body);
    }
    
}