import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private auth: string = `${environment.auth}/auth`;
  private api: string = `${environment.api}`;

  private userDetails: BehaviorSubject<User> = new BehaviorSubject(new User());


  constructor(
    private http: HttpClient
  ) { }


  /**
   * Use for signin basic authentication
   * @param username user username
   * @param password passcode for the user
   * @returns jwt tokens
   */
  public signIn(username: string, password: string): Observable<any> {
    const authorizationData = 'Basic ' + btoa(`${username}:${password}`);
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Authorization', authorizationData)
      .set('organization', environment.organization),
      observe: 'response' as 'body'
    };
    return this.http.post(`${this.auth}/signin`, {}, httpOptions);
  }

  public jwtRefresh(): string {
    return `${this.auth}/refresh`;
  }


  public userProfile(): Observable<User> {
    if(this.userDetails?.value?.userId) {
      return this.userDetails.asObservable();
    }
    return this.http.get<User>(`${this.api}/profile/get-personal-details`).pipe(tap(userDetails => this.userDetails.next(userDetails)));
  }


}
