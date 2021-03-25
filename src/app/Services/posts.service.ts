import { Injectable } from '@angular/core';
import { PostModel } from '../Models/post.model';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable(
  { providedIn: 'root' }
)

export class PostsService {
  constructor(private http: HttpClient) { }

  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>()

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3300/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            }
          })
        }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts])  //updating the posts so that it is available to the rest of the app
      })
  }
  getUpdatedPostsListener() {
    return this.postsUpdated.asObservable()
  }

  getPost(id: string) {
    // return {...this.posts.find( p => p.id === id)} //p implies each post, and p.id implies that post's id

    return this.http.get<{ _id: string; title: string; content: string, imagePath: string }>("http://localhost:3300/api/posts/" + id);
  }

  addPosts(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    if(image != undefined){
      postData.append('image', image, title);
    }
    this.http.post<{ message: string, post: PostModel }>('http://localhost:3300/api/posts', postData).subscribe((responseData) => {
      const post: PostModel = { id: responseData.post.id, title: title, content: content, imagePath: responseData.post.imagePath }
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })


  }

  updatePosts(id: string, title: string, content: string, image: File | string) {
    let postData: PostModel | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      if(image != undefined){
        postData.append("image", image, title);
      }
      
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http
      .put("http://localhost:3300/api/posts/" + id, postData)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post: PostModel = {
          id: id,
          title: title,
          content: content,
          imagePath: ""
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        // this.router.navigate(["/"]);
      });
  }

  deletePosts(postId: string) {
    this.http.delete('http://localhost:3300/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);

      })
  }
}
