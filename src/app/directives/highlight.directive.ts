import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostBinding('style.color') color: string = 'white';

  constructor() {}

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.color = 'orange';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.color = 'white';
  }
}
