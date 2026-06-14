import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import $ from 'jquery';
import * as ScrollMagic from 'scrollmagic';

interface IFields {
  label?: string;
  value?: string;
  title?: string;
  icon?: string;
  url?: string;
  options?: IFields[];
}

@Component({
  selector: 'sk-profile',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly currentPage = signal('about');
  readonly pages = signal<IFields[]>([
    { label: 'About', value: 'about' },
    { label: 'Resume', value: 'resume' },
    { label: 'Blog', value: 'blog' }
  ]);
  readonly profileLinks = signal<IFields[]>([
    { label: 'May 29, 1991', title: 'Birthday', icon: 'icon-calendar2', url: '' },
    { label: 'Chennai, Tamil Nadu, India', title: 'Location', icon: 'icon-map-pin', url: '' },
    { label: 'sellakumark', title: 'LinkedIn', icon: 'icon-linkedin2', url: 'https://www.linkedin.com/in/sellakumark' },
    { label: 'sellakumark@outlook.com', title: 'Email', icon: 'icon-mail', url: 'mailto:sellakumark@outlook.com' },
    { label: '+91 (999) 709-9985', title: 'Mobile', icon: 'icon-phone', url: 'tel:+919997099985' },
    { label: 'sellakumark_1', title: 'Skype', icon: 'icon-skype', url: 'skype:sellakumark_1' },
    { label: 'Download CV', title: 'Download CV', icon: 'icon-download', url: 'assets/sellakumark.pdf' }
  ]);
  readonly developmentSkills = signal<IFields[]>([
    { label: 'Product Development', value: 'Developing the modern component library with high-quality at a professional level.', icon: 'assets/icons/icon-design.svg' },
    { label: 'Web Development', value: 'Developing high-quality websites and web application at the professional level.', icon: 'assets/icons/icon-dev.svg' },
    { label: 'Full Stack Development', value: 'Developing RESTful API services using Express and Node.js at the professional level.', icon: 'assets/icons/icon-app.svg' },
    { label: 'Team Management', value: 'Maintain component library support and handle the team members efficiently.', icon: 'assets/icons/icon-photo.svg' }
  ]);
  readonly technicalSkills = signal<IFields[]>([
    { label: 'Web Product Development', value: '100' },
    { label: 'JavaScript', value: '100' },
    { label: 'TypeScript', value: '95' },
    { label: 'Angular', value: '90' },
    { label: 'React', value: '60' },
    { label: 'Node.js', value: '50' },
    { label: '.Net (C#)', value: '50' },
    { label: 'Full Stack Development', value: '50' },
    { label: 'GitHub Actions', value: '50' },
    { label: 'Jenkins', value: '50' }
  ]);
  readonly experiences = signal<IFields[]>([
    {
      label: 'Infosys Limited',
      value: 'May 2022 — Present',
      options: [
        {
          label: 'Senior Consultant',
          value: 'May 2022 — Present',
          url: 'Providing leadership and technical guidance to development teams, ensuring the successful delivery of large-scale applications using agile methodologies and innovative solutions while fostering collaboration and improving business performance.'
        }
      ]
    },
    {
      label: 'Syncfusion Software Private Limited',
      value: 'Dec 2014 — Apr 2022',
      options: [
        {
          label: 'Product Manager',
          value: 'Jan 2020 - Apr 2022',
          url: 'Responsible for the planning, execution, and delivery of software product releases on a quarterly basis, ensuring high quality and adherence to timelines through effective collaboration with development and testing teams.'
        },
        {
          label: 'Team Lead',
          value: 'Jun 2018 - Dec 2019',
          url: 'Responsibility includes leading and managing technical development, support, and testing teams while employing Agile methodologies to optimize team performance and maintain product quality.'
        },
        {
          label: 'Software Engineer',
          value: 'Dec 2014 - May 2018',
          url: 'Developing and implementing web-based reusable components, enhancing user interfaces, and ensuring efficient application development by focusing on component reusability and maintaining high standards for performance and compatibility.'
        }
      ]
    }
  ]);
  readonly educations = signal<IFields[]>([
    { label: 'Master of Computer Application', value: '2014', url: 'Completed Master of Computer Application degree with an aggregate of 7.9 CGPA.' },
    { label: 'Bachelor of Computer Application', value: '2011', url: 'Completed Bachelor of Computer Application degree with an aggregate of 7.1 CGPA.' },
    { label: 'Higher Secondary Course Certificate', value: '2008', url: 'Completed Higher Secondary Course Certificate with an aggregate of 8.6 CGPA.' },
    { label: 'Secondary School Leaving Certificate', value: '2006', url: 'Completed Secondary School Leaving Certificate with an aggregate of 7.1 CGPA.' }
  ]);
  readonly blogs = signal<IFields[]>([
    {
      label: 'Sending Emails and Reminders in Blazor Scheduler',
      title: '25',
      value: 'Feb 2021',
      icon: 'https://www.syncfusion.com/blogs/wp-content/uploads/2020/12/How-to-Send-Emails-and-Reminders-for-Events-in-Blazor-Scheduler.png',
      url: 'https://www.syncfusion.com/blogs/post/how-to-send-emails-and-reminders-for-events-in-blazor-scheduler.aspx'
    },
    {
      label: 'Synchronize Blazor Resource Scheduler with RESTful Services',
      title: '17',
      value: 'Nov 2021',
      icon: 'https://www.syncfusion.com/blogs/wp-content/uploads/2021/11/Easily-Synchronize-Blazor-Resource-Scheduler-with-Restful-Services.png',
      url: 'https://www.syncfusion.com/blogs/post/easily-synchronize-blazor-resource-scheduler-with-restful-services.aspx'
    }
  ]);

  onPageClick(event: Event, page: IFields): void {
    event.preventDefault();
    this.currentPage.set(page.value!);

    if (page.value === 'resume') {
      setTimeout(() => this.initializeProgressBar());
    }
  }

  initializeProgressBar(): void {
    $('.progress').each(() => {
      const instance = new ScrollMagic.Scene({ triggerElement: '.progress', triggerHook: 'onEnter', duration: 300 });
      instance.addTo(new ScrollMagic.Controller()).on('enter', () =>
        $('.progress-bar').each((_index: number, element: HTMLElement) => {
          $(element).css({ width: $(element).attr('aria-valuenow') + '%', 'z-index': '2' });
        })
      );
    });
  }
}
