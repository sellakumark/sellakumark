import { AfterViewInit, Component } from '@angular/core';
import Typed from 'typed.js';

declare let AOS: any;
declare let GLightbox: any;
declare let Isotope: any;
declare let Swiper: any;
declare let Waypoint: any;

@Component({
  selector: 'sk-profile',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'sellakumark';

  constructor() { }

  public ngAfterViewInit(): void {
    /** Easy selector helper function */
    const select = (el: string, all: boolean = false): HTMLElement | HTMLElement[] => {
      el = el.trim();
      if (all) {
        return [...[].slice.call(document.querySelectorAll(el))];
      } else {
        return document.querySelector(el) as HTMLElement;
      }
    };

    /** Easy event listener function */
    const on = (type: string, el: string, listener: any, all: boolean = false) => {
      let selectEl: HTMLElement | HTMLElement[] = select(el, all);
      if (selectEl) {
        if (selectEl instanceof Array) {
          selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
          selectEl.addEventListener(type, listener);
        }
      }
    };

    /** Easy on scroll event listener */
    const onscroll = (el: HTMLElement | Document, listener: EventListener) => {
      el.addEventListener('scroll', listener);
    };

    /** Navbar links active state on scroll */
    let navbarLinks: HTMLElement | HTMLElement[] = select('#navbar .scrollto', true);
    const navbarLinksActive: EventListener = (e: Event): void => {
      e.preventDefault();
      let position: number = window.scrollY + 200;
      let links: HTMLElement[] = navbarLinks instanceof Array ? navbarLinks : [navbarLinks];
      links.forEach((link: any) => {
        if (!link.hash) return;
        let section: HTMLElement = select(link.hash) as HTMLElement;
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };
    window.addEventListener('load', navbarLinksActive);
    onscroll(document, navbarLinksActive);

    /** Scrolls to an element with header offset */
    const scrollto = (el: string): void => {
      let elementPos: number = (select(el) as HTMLElement).offsetTop;
      window.scrollTo({ top: elementPos, behavior: 'smooth' });
    }

    /** Back to top button */
    let backToTop: HTMLElement = select('.back-to-top') as HTMLElement;
    if (backToTop) {
      const toggleBackToTop: EventListener = (e: Event): void => {
        e.preventDefault();
        if (window.scrollY > 100) {
          backToTop.classList.add('active');
        } else {
          backToTop.classList.remove('active');
        }
      };
      window.addEventListener('load', toggleBackToTop);
      onscroll(document, toggleBackToTop);
    }

    /** Mobile nav toggle */
    on('click', '.mobile-nav-toggle', (e: Event) => {
      (select('body') as HTMLElement).classList.toggle('mobile-nav-active');
      (e.target as HTMLElement).classList.toggle('bi-list');
      (e.target as HTMLElement).classList.toggle('bi-x');
    });

    /** Scroll with offset on links with a class name .scrollto */
    on('click', '.scrollto', (e: Event) => {
      const target: HTMLAnchorElement = e.currentTarget as HTMLAnchorElement;
      if (select(target.hash)) {
        e.preventDefault();
        let body: HTMLElement = select('body') as HTMLElement;
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active');
          let navbarToggle: HTMLElement = select('.mobile-nav-toggle') as HTMLElement;
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
        scrollto(target.hash);
      }
    }, true);

    /** Scroll with offset on page load with hash links in the url */
    window.addEventListener('load', () => {
      if (window.location.hash && select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    });

    /** Preloader */
    let preloader: HTMLElement = select('#preloader') as HTMLElement;
    if (preloader) {
      window.addEventListener('load', () => { preloader.remove(); });
    }

    /** Hero type effect */
    const typed: HTMLElement = select('.typed') as HTMLElement;
    if (typed) {
      let typedStrings: string[] = typed.getAttribute('data-typed-items').split(',');
      new Typed('.typed', {
        strings: typedStrings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }

    /** Skills animation */
    const skillsContent: HTMLElement = select('.skills-content') as HTMLElement;
    if (skillsContent) {
      new Waypoint({
        element: skillsContent,
        offset: '80%',
        handler: () => {
          const progress: HTMLElement[] = select('.progress .progress-bar', true) as HTMLElement[];
          progress.forEach((el) => { el.style.width = el.getAttribute('aria-valuenow') + '%'; });
        }
      })
    }

    /** Portfolio isotope and filter */
    window.addEventListener('load', () => {
      const portfolioContainer: HTMLElement = select('.portfolio-container') as HTMLElement;
      if (portfolioContainer) {
        const portfolioIsotope = new Isotope(portfolioContainer, { itemSelector: '.portfolio-item' });
        const portfolioFilters: HTMLElement[] = select('#portfolio-flters li', true) as HTMLElement[];
        on('click', '#portfolio-flters li', function (e: Event) {
          e.preventDefault();
          portfolioFilters.forEach(function (el: HTMLElement) { el.classList.remove('filter-active'); });
          (e.target as HTMLElement).classList.add('filter-active');
          portfolioIsotope.arrange({ filter: (e.target as HTMLElement).getAttribute('data-filter') });
          portfolioIsotope.on('arrangeComplete', () => { AOS.refresh(); });
        }, true);
      }
    });

    /** Initiate portfolio lightbox */
    GLightbox({ selector: '.portfolio-lightbox' });

    /** Initiate portfolio details lightbox */
    GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh'
    });

    /** Portfolio details slider */
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });

    /** Testimonials slider */
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });

    /** Animation on scroll */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  }
}
