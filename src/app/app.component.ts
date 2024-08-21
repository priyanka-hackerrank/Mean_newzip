import { Component } from '@angular/core';
import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = ""; // "HackerRank";
  newPost: Post = new Post('', '');
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
  //   this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts()
  //     .subscribe((posts: Post[]) => this.posts = posts);
  }

  createPost(): void {
  //   if (!this.newPost.title || !this.newPost.content) {
  //     alert('Please enter both title and content!');
  //     return;
  //   }

    this.postService.addPost(this.newPost)
  //     .subscribe((post: Post) => {
  //       this.posts.unshift(post);
  //       this.newPost = new Post('', '');
  //     });
  }
}
