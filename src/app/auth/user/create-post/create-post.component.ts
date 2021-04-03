import { Component, Inject, Input, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PostModel } from 'src/app/Models/post.model';
import { PostsService } from 'src/app/Services/posts.service';
import { Router } from '@angular/router' 
import { mimeType } from 'src/app/auth/Validators/mime-type.validator'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  public mode = 'user';
  private postId : string;
  public post: PostModel;
  isLoading : boolean = false;
  imagePreview: string;
  

  PostForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    content: new FormControl('', [Validators.required, Validators.minLength(1)]),
    image: new FormControl(null,  {validators:[], asyncValidators: [mimeType] })
  })
 
  constructor(public postsService: PostsService, public route: ActivatedRoute, private router: Router){
    
  }

  ngOnInit(){

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postdata =>{
          this.isLoading = false;
          this.post = {id: postdata._id, title: postdata.title, content: postdata.content , imagePath: postdata.imagePath, creator: postdata.creator};
          this.PostForm.setValue({ title: this.post.title, content: this.post.content, image: this.post.imagePath || null});
        });
      }
      else{
        this.mode = 'user';
        this.postId = null;
      }
    })
  }

  
  onAddPost()
  
  {
    if(this.PostForm.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === 'user'){
      this.postsService.addPosts(this.PostForm.value.title, this.PostForm.value.content, this.PostForm.value.image)
      this.isLoading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post added!',
        showConfirmButton: false,
        timer: 2000
      })
      location.reload();
    }
    
    else{
      this.postsService.updatePosts(
        this.postId,
        this.PostForm.value.title,
        this.PostForm.value.content,
        this.PostForm.value.image
      );
      this.router.navigateByUrl('/user');
    }
    this.PostForm.reset();
  }
  

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.PostForm.patchValue({image: file});
    this.PostForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    
      reader.readAsDataURL(file);
    
    
  }
}
