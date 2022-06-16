import { Component, OnInit } from '@angular/core';
import {ImageService} from '../service/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  title = 'recentimage ';
  visibleImages: any[] = [];
  constructor(private imageService: ImageService) {
    this.visibleImages = this.imageService.getImages();
  }

  ngOnInit() {
  }

}
