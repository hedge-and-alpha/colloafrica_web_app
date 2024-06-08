import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ca-mgr-intro',
  templateUrl: './mgr-intro.component.html',
  styleUrl: './mgr-intro.component.css',
})
export class MgrIntroComponent {
  showOverlay = true;

  @ViewChild('video', { static: true, read: ElementRef })
  videoRef!: ElementRef<HTMLVideoElement>;

  ngOnInit() {}

  onPlayClick() {
    this.videoRef.nativeElement.play();
    this.showOverlay = false;
  }

  onError(event: Event) {
    console.log(event);
  }
}
