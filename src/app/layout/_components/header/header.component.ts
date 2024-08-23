import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { Subject, takeUntil, zip } from "rxjs";
import { Ui5ThemingService } from "@ui5/theming-ngx";
import { I18nService } from "@ui5/webcomponents-ngx/i18n";
import {
  ShellBarComponent,
  Ui5WebcomponentsModule,
} from "@ui5/webcomponents-ngx";

import { AppService } from "../../../services/services";
import { THEMES, LANGUAGES } from "../../../constants/constants";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "pros-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  componentUnsubscribe: Subject<boolean> = new Subject();
  isDataAvailable = false;

  selectedTheme = "sap_horizon";
  currentTheme = "sap_horizon";
  themeDialogOpen = false;
  themes = THEMES;
  i18nService = inject(I18nService);

  selectedLanguage = this.i18nService.currentLanguage();
  currentLanguage = this.i18nService.currentLanguage();
  languageDialogOpen = false;
  languages = LANGUAGES;

  user!: User;

  @ViewChild("profileSettingsPopover") profileSettingsPopover:
    | ElementRef
    | undefined;

  constructor(
    private appService: AppService,
    private ui5ThemingService: Ui5ThemingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.userProfile().subscribe({
      next: (next) => {
        this.user = next || new User();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy() {
    this.componentUnsubscribe.next(true);
    this.componentUnsubscribe.complete();
  }

  switchLanguage() {
    this.i18nService.setLanguage(
      this.selectedLanguage ? this.selectedLanguage : "en"
    );
    this.currentLanguage = this.selectedLanguage;
    this.setLanguageDialogOpen();
    this.shellbarMenuClicked();
  }

  setLanguageDialogOpen() {
    this.languageDialogOpen = !this.languageDialogOpen;
    this.selectedLanguage = this.currentLanguage;
  }

  setSelectedLanguage(languageName: string | undefined) {
    if (languageName != undefined) {
      this.selectedLanguage = languageName;
    }
  }

  switchTheme() {
    this.ui5ThemingService
      .setTheme(this.selectedTheme)
      .pipe(takeUntil(this.componentUnsubscribe))
      .subscribe();
    this.currentTheme = this.selectedTheme;
    this.setThemeDialogOpen();
    this.shellbarMenuClicked();
  }

  setThemeDialogOpen() {
    this.themeDialogOpen = !this.themeDialogOpen;
    this.selectedTheme = this.currentTheme;
  }

  setSelectedTheme(themeName: string | undefined) {
    if (themeName != undefined) {
      this.selectedTheme = themeName;
    }
  }

  shellbarMenuClicked() {
    var element = document.getElementById("shellbar") as ShellBarComponent;
    if (element.closeOverflow) element.closeOverflow();
  }

  handleProfileClick(event: any) {
    (this.profileSettingsPopover as any)?.elementRef?.nativeElement?.showAt(
      event?.detail?.targetRef
    );
  }

  handleProfileSettingsSelect(event: any) {
    const selectedKey = event.detail.item.getAttribute('data-key');
    if(selectedKey === 'sign-out') {
        localStorage.clear();
        this.router.navigate(['auth']);
    }
}

  public get initials() {
    const fName = this.user?.fname || "";
    const lName = this.user?.lname || "";
    const primaryEmail = this.user?.pemail || "";
    if ((fName && fName.length >= 1) || (lName && lName.length >= 1)) {
      return (fName[0] ? fName[0] : "") + (lName[0] ? lName[0] : "");
    } else {
      return primaryEmail && primaryEmail[0] ? primaryEmail[0] : "?";
    }
  }
}
