import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('1.25s cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('1.25s ease-out', style({ transform: 'translateX(100%)' }))
  ])
]);

export const slideInOutTopToDown = trigger('slideInOutTopToDown', [
  transition(':enter', [
    style({ transform: 'translateY(-160%)', opacity: 0 }),
    animate('0.6s ease-in', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.6s ease-out', style({ transform: 'translateY(-160%)', opacity: 0 }))
  ])
]);

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.6s ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.4s ease-out', style({ opacity: 0 }))
  ])
]);

export const fadeSlideIn = trigger('fadeSlideIn', [
  transition(':enter', [
    style({ opacity: 5, transform: 'translateX(90px)', }),
    animate('600ms cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({ opacity: 1, transform: 'translateX(0px)' }))
    //animate('500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const listStagger = (duration: string) => trigger('listStagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger('100ms', [
        animate(duration, style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);