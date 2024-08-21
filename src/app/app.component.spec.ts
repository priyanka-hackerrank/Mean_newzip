import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostService } from './post.service';
import { Post } from './post';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async(() => {
    postServiceSpy = jasmine.createSpyObj<PostService>(['getPosts', 'addPost']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [{ provide: PostService, useValue: postServiceSpy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    postServiceSpy.getPosts.and.returnValue(of([]));
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should have as title 'HackerRank'`, () => {
    expect(component.title).toEqual('HackerRank');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content h2')?.textContent).toContain('HackerRank app is running!');
  });

  it('should initialize posts', () => {
    const posts: Post[] = [{ title: 'post1', content: 'content1' }, { title: 'post2', content: 'content2' }];
    postServiceSpy.getPosts.and.returnValue(of(posts));

    component.ngOnInit();

    expect(postServiceSpy.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(posts);
  });

  it('should create a new post', () => {
    const post: Post = { title: 'new post', content: 'new content' };
    postServiceSpy.addPost.and.returnValue(of(post));

    component.newPost.title = post.title;
    component.newPost.content = post.content;

    component.createPost();

    expect(postServiceSpy.addPost).toHaveBeenCalled();
    expect(component.posts[0]).toEqual(post);
    expect(component.newPost.title).toEqual(new Post('', '').title);
  });

  it('should not create a new post if title or content is missing', () => {
    component.newPost.title = 'new post';

    spyOn(window, 'alert');

    component.createPost();

    expect(window.alert).toHaveBeenCalledWith('Please enter both title and content!');
    expect(postServiceSpy.addPost).not.toHaveBeenCalled();
    expect(component.posts.length).toBe(0);
  });
});
