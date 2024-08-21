import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private currentHost = window?.location?.host || 'localhost:8000';
  private currentProtocol = window?.location?.protocol || 'http:';
  private postsUrl = `${this.currentProtocol}//${this.currentHost.replace('8000', '8080')}/api/posts`;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }
}
