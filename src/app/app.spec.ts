import { ComponentFixture, TestBed } from '@angular/core/testing';
import $ from 'jquery';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the app component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize currentPage signal with "about"', () => {
      expect(component.currentPage()).toBe('about');
    });

    it('should initialize pages signal with correct data', () => {
      const pages = component.pages();
      expect(pages.length).toBe(3);
      expect(pages[0].label).toBe('About');
      expect(pages[0].value).toBe('about');
      expect(pages[1].label).toBe('Resume');
      expect(pages[1].value).toBe('resume');
      expect(pages[2].label).toBe('Blog');
      expect(pages[2].value).toBe('blog');
    });

    it('should initialize profileLinks signal with 7 items', () => {
      const links = component.profileLinks();
      expect(links.length).toBe(7);
      expect(links[0].label).toBe('May 29, 1991');
      expect(links[0].title).toBe('Birthday');
      expect(links[2].label).toBe('sellakumark');
      expect(links[2].title).toBe('LinkedIn');
    });

    it('should initialize developmentSkills signal with 4 items', () => {
      const skills = component.developmentSkills();
      expect(skills.length).toBe(4);
      expect(skills[0].label).toBe('Product Development');
      expect(skills[1].label).toBe('Web Development');
      expect(skills[2].label).toBe('Full Stack Development');
      expect(skills[3].label).toBe('Team Management');
    });

    it('should initialize technicalSkills signal with 10 items', () => {
      const skills = component.technicalSkills();
      expect(skills.length).toBe(10);
      expect(skills[0].label).toBe('Web Product Development');
      expect(skills[0].value).toBe('100');
      expect(skills[3].label).toBe('Angular');
      expect(skills[3].value).toBe('90');
    });

    it('should initialize experiences signal with 2 companies', () => {
      const exp = component.experiences();
      expect(exp.length).toBe(2);
      expect(exp[0].label).toBe('Infosys Limited');
      expect(exp[1].label).toBe('Syncfusion Software Private Limited');
    });

    it('should initialize educations signal with 4 degrees', () => {
      const edu = component.educations();
      expect(edu.length).toBe(4);
      expect(edu[0].label).toBe('Master of Computer Application');
      expect(edu[1].label).toBe('Bachelor of Computer Application');
    });

    it('should initialize blogs signal with 2 blog posts', () => {
      const blogs = component.blogs();
      expect(blogs.length).toBe(2);
      expect(blogs[0].label).toContain('Blazor Scheduler');
      expect(blogs[1].label).toContain('Resource Scheduler');
    });
  });

  describe('onPageClick Method', () => {
    it('should prevent default event behavior', () => {
      const mockEvent = new Event('click');
      const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault');

      const page = { label: 'About', value: 'about' };
      component.onPageClick(mockEvent, page);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should update currentPage signal when clicking on "about" page', () => {
      const mockEvent = new Event('click');
      const page = { label: 'About', value: 'about' };

      component.onPageClick(mockEvent, page);

      expect(component.currentPage()).toBe('about');
    });

    it('should update currentPage signal when clicking on "resume" page', () => {
      const mockEvent = new Event('click');
      const page = { label: 'Resume', value: 'resume' };
      component.onPageClick(mockEvent, page);
      expect(component.currentPage()).toBe('resume');
    });

    it('should update currentPage signal when clicking on "blog" page', () => {
      const mockEvent = new Event('click');
      const page = { label: 'Blog', value: 'blog' };
      component.onPageClick(mockEvent, page);
      expect(component.currentPage()).toBe('blog');
    });

    it('should call initializeProgressBar when resume page is clicked', async () => {
      const initializeProgressBarSpy = vi.spyOn(component, 'initializeProgressBar');
      const mockEvent = new Event('click');
      const page = { label: 'Resume', value: 'resume' };
      component.onPageClick(mockEvent, page);
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(initializeProgressBarSpy).toHaveBeenCalled();
    });

    it('should not call initializeProgressBar when about page is clicked', async () => {
      const initializeProgressBarSpy = vi.spyOn(component, 'initializeProgressBar');
      const mockEvent = new Event('click');
      const page = { label: 'About', value: 'about' };
      component.onPageClick(mockEvent, page);
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(initializeProgressBarSpy).not.toHaveBeenCalled();
    });

    it('should not call initializeProgressBar when blog page is clicked', async () => {
      const initializeProgressBarSpy = vi.spyOn(component, 'initializeProgressBar');
      const mockEvent = new Event('click');
      const page = { label: 'Blog', value: 'blog' };
      component.onPageClick(mockEvent, page);
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(initializeProgressBarSpy).not.toHaveBeenCalled();
    });

    it('should handle page with non-null value correctly', () => {
      const mockEvent = new Event('click');
      const page = { label: 'Custom', value: 'custom-value' };
      component.onPageClick(mockEvent, page);
      expect(component.currentPage()).toBe('custom-value');
    });
  });

  describe('initializeProgressBar Method', () => {
    afterEach(() => {
      // Clean up DOM
      $('.progress').remove();
    });

    it('should execute without errors when progress elements exist', () => {
      // Create mock progress elements in the DOM
      const progressDiv = $('<div class="progress"><div class="progress-bar" aria-valuenow="75"></div></div>');
      $('body').append(progressDiv);

      expect(() => {
        component.initializeProgressBar();
      }).not.toThrow();
    });

    it('should execute when no progress elements exist', () => {
      expect(() => {
        component.initializeProgressBar();
      }).not.toThrow();
    });

    it('should find progress elements in the DOM', () => {
      // Create mock progress elements in the DOM
      const progressDiv = $('<div class="progress"><div class="progress-bar" aria-valuenow="75"></div></div>');
      $('body').append(progressDiv);

      const progressElements = $('.progress');
      expect(progressElements.length).toBeGreaterThan(0);
    });
  });

  describe('Signal Reactivity', () => {
    it('should track changes to currentPage signal', () => {
      const initialValue = component.currentPage();
      component.currentPage.set('resume');

      expect(component.currentPage()).toBe('resume');
      expect(component.currentPage()).not.toBe(initialValue);
    });

    it('should maintain immutability of pages signal', () => {
      const initialPages = component.pages();
      const pagesArray = [...initialPages];

      expect(component.pages()).toEqual(pagesArray);
    });

    it('should update signal when set is called', () => {
      component.currentPage.set('blog');
      expect(component.currentPage()).toBe('blog');

      component.currentPage.set('resume');
      expect(component.currentPage()).toBe('resume');

      component.currentPage.set('about');
      expect(component.currentPage()).toBe('about');
    });
  });

  describe('Interface Compliance', () => {
    it('should have all required signals', () => {
      expect(component.currentPage).toBeDefined();
      expect(component.pages).toBeDefined();
      expect(component.profileLinks).toBeDefined();
      expect(component.developmentSkills).toBeDefined();
      expect(component.technicalSkills).toBeDefined();
      expect(component.experiences).toBeDefined();
      expect(component.educations).toBeDefined();
      expect(component.blogs).toBeDefined();
    });

    it('should have all required methods', () => {
      expect(component.onPageClick).toBeDefined();
      expect(component.initializeProgressBar).toBeDefined();
      expect(typeof component.onPageClick).toBe('function');
      expect(typeof component.initializeProgressBar).toBe('function');
    });
  });

  describe('Experiences Data', () => {
    it('should have correct experience structure for Infosys', () => {
      const experiences = component.experiences();
      const infosys = experiences[0];

      expect(infosys.label).toBe('Infosys Limited');
      expect(infosys.value).toBe('May 2022 — Present');
      expect(infosys.options).toBeDefined();
      expect(infosys.options?.[0].label).toBe('Senior Consultant');
    });

    it('should have multiple positions in Syncfusion experience', () => {
      const experiences = component.experiences();
      const syncfusion = experiences[1];

      expect(syncfusion.options?.length).toBe(3);
      expect(syncfusion.options?.[0].label).toBe('Product Manager');
      expect(syncfusion.options?.[1].label).toBe('Team Lead');
      expect(syncfusion.options?.[2].label).toBe('Software Engineer');
    });
  });

  describe('Profile Links Validation', () => {
    it('should have correct profile link URLs', () => {
      const links = component.profileLinks();
      const linkedinLink = links.find((link) => link.title === 'LinkedIn');
      const emailLink = links.find((link) => link.title === 'Email');
      const mobileLink = links.find((link) => link.title === 'Mobile');

      expect(linkedinLink?.url).toContain('linkedin.com');
      expect(emailLink?.url).toContain('mailto:');
      expect(mobileLink?.url).toContain('tel:');
    });

    it('should have download CV link with correct path', () => {
      const links = component.profileLinks();
      const cvLink = links.find((link) => link.title === 'Download CV');

      expect(cvLink?.url).toBe('assets/sellakumark.pdf');
    });
  });
});
