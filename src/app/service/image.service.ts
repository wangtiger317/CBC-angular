import {Injectable} from '@angular/core';
@Injectable()
export class ImageService {
  visibleImages = [];
  getImages() {
    return this.visibleImages = IMAGES.slice(0);
  }
  getImage(id: number) {
    // tslint:disable-next-line:triple-equals
    return IMAGES.slice(0).find(image => image.id == id);
  }
}
const IMAGES = [
  // tslint:disable-next-line:max-line-length
  {id: 1, desc: '$349 900',  de: '2 bds |2ba |1010 sqft', word: '60 Eutaw St #60,East Boston,MA 02128', url: 'assets/image/1.jpg', urls: 'assets/image/8_8.jpg'},
  // tslint:disable-next-line:max-line-length
  {id: 2, desc: '$399 900 ', de: '2 bds |2ba |640 sqft', word: '91 Fort Ave #1, Boston,MA 02119', url: 'assets/image/2.jpg', urls: 'assets/image/7_7.jpg'},
  {id: 3, desc: 'Oldfield preserve', de: '', word: '', url: 'assets/image/3.jpg', urls: 'assets/image/1_1.jpg'},
  // tslint:disable-next-line:max-line-length
  {id: 4, desc: '$349 900 ', de: '2 bds |2ba |1010 sqft', word: '60 Eutaw St #60,East Boston,MA 02128', url: 'assets/image/4.jpg', urls: 'assets/image/6_6.jpg'},
  // tslint:disable-next-line:max-line-length
  {id: 5, desc: '$349 900 ', de: '2 bds |2ba |1010 sqft', word: '60 Eutaw St #60,East Boston,MA 02128', url: 'assets/image/5.jpg', urls: 'assets/image/4_4.jpg'},
  // tslint:disable-next-line:max-line-length
  {id: 6, desc: '$349 900 ', de: '2 bds |2ba |1010 sqft', word: '60 Eutaw St #60,East Boston,MA 02128', url: 'assets/image/6.jpg', urls: 'assets/image/5_5.jpg'},
  // tslint:disable-next-line:max-line-length
  {id: 7, desc: '$349 900 ', de: '2 bds |2ba |1010 sqft', word: '60 Eutaw St #60,East Boston,MA 02128', url: 'assets/image/7.jpg', urls: 'assets/image/3_3.jpg'},
  // tslint:disable-next-line:max-line-length
  {id: 8, desc: '$349 900 ', de: '2 bds |2ba |1010 sqft', word: '60 Eutaw St #60,East Boston,MA 02128', url: 'assets/image/8.jpg', urls: 'assets/image/2_2.jpg'},
];
