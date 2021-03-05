import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../blog.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  model = {
    left: true,
    middle: false,
    right: false
  };
  posts = [];

  constructor(private blogService: BlogService) { }
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  ngOnInit() {

    this.blogService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      console.log(data);
      this.posts = data;
    })  
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  
}
