import { Component } from "@angular/core";

@Component({
    selector: "icon-checkmark", // tslint:disable-line component-selector
    template: `
    <svg height='14px' width='14px' fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;" viewBox="0 0 333 333" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd">
      <defs>
        <style type="text/css">
          .fil0 {fill:#000000}
        </style>
      </defs>
      <g>
        <path class="fil0" d="M47 165c-20,-21 -52,11 -31,31 26,27 52,55 79,81 12,11 21,11 32,0l191 -190c20,-21 -11,-53 -32,-32l-174 174 -65 -64z"></path>
      </g>
    </svg>
    `
})
export class CheckmarkComponent { }
