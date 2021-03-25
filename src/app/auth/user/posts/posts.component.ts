import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/Services/posts.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { PostModel } from 'src/app/Models/post.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  Posts = [];
  private authSubs: Subscription;
  public isAuthenticated = false;
  private postsSub: Subscription;
  // private editDialogRef: MatDialogRef<CreatePostComponent>;

  constructor(public postsService: PostsService, private authService: AuthService){} //private dialog: MatDialog) { }

  onDelete(postId: string) {
    Swal.fire({
      title: 'Are you sure you want to delete the post?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.postsService.deletePosts(postId);
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
      } else if (result.isDenied) {
        Swal.fire('Not Deleted!', '', 'error')
      }
    })
    
  }

  // onEdit(post: PostModel){
  //   this.editDialogRef = this.dialog.open(CreatePostComponent, {
  //     data: post
  //   });

  //   this.editDialogRef.afterClosed().subscribe(post =>{
  //     this.postsService.updatePosts(post.id, post.title, post.content)
      
  //   })
  // }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getUpdatedPostsListener().subscribe(
      (Posts) => {
        this.isLoading = false;
        this.Posts = Posts;
      })
      this.isAuthenticated = this.authService.getIsAuth();
      this.authSubs = this.authService.getAuthStatusListener().subscribe(UserAuthenticatedStatus => {
        this.isAuthenticated = UserAuthenticatedStatus;
      })
      
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authSubs.unsubscribe()

  }

}
