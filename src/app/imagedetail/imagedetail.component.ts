import { Component, OnInit } from '@angular/core';
import {ImageService} from  '../service/image.service';
@Component({
  selector: 'app-imagedetail',
  templateUrl: './imagedetail.component.html',
  styleUrls: ['./imagedetail.component.css']
})
export class ImagedetailComponent implements OnInit {
  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

}
