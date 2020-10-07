import { Component, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {Directive, HostListener} from '@angular/core';
import * as screenfull from 'screenfull';


@Directive({
  selector: '[toggleFullscreen]'
  
})
export class ToggleButtonComponent  {
	@ViewChild('pdfLoaderArea') pdfLoaderArea: ElementRef;
	@HostListener('click') onClick() {

		if (screenfull.isEnabled) {
			var res = this.pdfLoaderArea;
			screenfull.toggle();
		}
	}
}
