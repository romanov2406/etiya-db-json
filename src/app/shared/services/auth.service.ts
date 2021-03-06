import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: IUser[] = [];
  url = 'http://localhost:3000/users';
  constructor(private http: HttpClient,private route:Router) { }
  

  getJSONUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.url);
  }

  registration(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.url, user);
  }

  signIn(email: string,password:string): any {
    return this.http.get<any>(this.url).pipe(take(1)).subscribe(
      data => {
        const USER = [...data].filter(el => el.email === email && el.password === password);
        if(USER[0]){
          localStorage.setItem('user',JSON.stringify(USER[0]));
          this.route.navigateByUrl('user-profile')
        }else{
          alert('такого юзера немає')
        }
      },
      err => console.log(err)
    );
  }

  deleteJSONUser(id:number):Observable<IUser>{
   return this.http.delete<IUser>(`${this.url}/${id}`)
  }

  updateJSONUser(user: IUser): Observable<IUser>{
    return this.http.put<IUser>(`${this.url}/${user.id}`, user);
  }
}
