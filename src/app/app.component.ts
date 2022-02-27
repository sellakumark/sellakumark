import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import * as ScrollMagic from 'scrollmagic';
import { AppService, IEmail } from './app.service';

@Component({
  selector: 'sk-profile',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnInit {

  public title: string = 'sellakumark';
  public currentPage: string = 'about';
  public form: FormGroup;
  public submitted: boolean = false;

  constructor(private appService: AppService, private fb: FormBuilder) { }

  public ngAfterViewInit(): void {
    $('.progress').each(function () {
      new ScrollMagic.Scene({
        triggerElement: '.progress',
        triggerHook: 'onEnter',
        duration: 300
      })
        .addTo(new ScrollMagic.Controller())
        .on("enter", function (e) {
          var progressBar = $('.progress-bar');
          progressBar.each(function (indx) {
            $(this).css({ 'width': $(this).attr('aria-valuenow') + '%', 'z-index': '2' });
          });
        });
    });
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.sendEmail(this.form.value);
    this.form.reset();
    this.submitted = false;
  }

  public sendEmail(message: IEmail): void {
    this.appService.sendEmail(message).subscribe((response: any) => {
      console.log(response);
    }, (error: any) => {
      console.log(error);
    });
  }

  public onPageClick(e: Event): void {
    e.preventDefault();
    this.currentPage = (e.target as HTMLAnchorElement).getAttribute('href').replace('#', '');
  }

}

