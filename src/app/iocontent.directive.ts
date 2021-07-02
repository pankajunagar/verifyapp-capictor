// import { Directive, ElementRef } from "@angular/core";
// import { Platform } from "ionic-angular";

// @Directive({
//     selector: 'ion-content'
//   })
//   export class MobilewebContentDirective {
  
//     minHeight = {
//       ios: 50,
//       md: 56
//     }
  
//     constructor(
//       private el: ElementRef,
//       private plt: Platform
//     ) {
      
//     }
  
//     ngOnInit() {
//       if(this.plt.is('mobileweb') || this.plt.is('desktop')) {
//         const observer = new MutationObserver(mutations => {
//           for(let i = 0; i < mutations.length; i++) {
//             const children = this.el.nativeElement.shadowRoot.children;
//             let main:HTMLElement | null = null;
//             let background:HTMLElement | null = null;
//             for(let i = 0; i < children.length; i++) {
//               if(children[i].tagName === 'MAIN') {
//                 main = children[i];
//               }
//               if(children[i].id === 'background-content') {
//                 background = children[i];
//               }
//             }
  
//             if(background) {
//               background.style.position = 'fixed';
//             }
  
//             if(main) {
//               //default setting for body scroll
//               observer.disconnect();
//               main.style.position = 'relative';
//               main.style.bottom = 'initial';
//               main.style.overflowY = 'hidden';
//               main.style.touchAction = 'manipulation';
              
//               main.style.width = '100%';
//               main.style.marginLeft = 'auto';
//               main.style.marginRight = 'auto';
  
//               const header = this.el.nativeElement.previousSibling;
//               const footer = this.el.nativeElement.nextSibling;
  
//               if(header) {
//                 //header
//                 main.style.marginTop = (this.plt.is('ios') ? this.minHeight.ios : this.minHeight.md) + 'px';
//               } else {
//                 //tab (temperatory)
//                 main.style.marginTop = (this.plt.is('ios') ? this.minHeight.ios : this.minHeight.md) + 'px';
//               }
//               if(footer) {
//                 main.style.paddingBottom = (this.plt.is('ios') ? this.minHeight.ios : this.minHeight.md) + 'px';
//               }
//               //reset scroll (should add some more functions)
//               window.scrollTo(0, 0);
//               break;
//             }
//           }
//         });
//         observer.observe(this.el.nativeElement.shadowRoot, {childList: true});
//       }
//     }
//   }