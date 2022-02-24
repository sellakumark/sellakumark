import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AppService {

  private emailUrl: string = 'https://sellakumark-services.vercel.app/api/email/';

  constructor(private httpClient: HttpClient) { }

  public sendEmail(message: IEmail): Observable<ArrayBuffer> {
    return this.httpClient.post(this.emailUrl, message).pipe(catchError(this.handleError) as any);
  }

  private handleError(error: HttpErrorResponse): Observable<ArrayBuffer> {
    if (error.error instanceof ErrorEvent) {
      console.error('No internet error:', error.error.message);
    }
    return throwError((error.status === 401) ? 'Session Expired' : 'Something error occurred, please try again later.');
  }

}

export interface IEmail {
  name?: string,
  email?: string,
  message?: string
}
