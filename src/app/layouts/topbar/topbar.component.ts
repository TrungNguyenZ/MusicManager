import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventService } from '../../core/services/event.service';

//Logout
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../core/services/token-storage.service';

// Language
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

import { CartModel } from './topbar.model';
import { cartData } from './data';
import { LanguageService } from 'src/app/core/services/language.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { GlobalComponent } from '../../global-component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  element: any;
  mode: string | undefined;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;
  userData: any;
  cartData!: CartModel[];
  total = 0;
  cart_length: any = 0;
  listLang = [
    { text: 'Tiếng Việt', flag: 'assets/images/flags/vn.svg', lang: 'vn' },
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },

  ];
  constructor(public languageService: LanguageService,
    public _cookiesService: CookieService, public translate: TranslateService, private authService: AuthenticationService,
    private router: Router, private TokenStorageService: TokenStorageService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.userData = this.TokenStorageService.getUser();
    this.element = document.documentElement;

    this.cookieValue = this._cookiesService.get('lang');
    this.languageService.setLanguage(this.cookieValue)
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/vn.svg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }

    // Fetch Data
    this.cartData = cartData;
    this.cart_length = this.cartData.length;
    this.cartData.forEach((item) => {
      var item_price = item.quantity * item.price
      this.total += item_price
    });
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
    window.location.reload()
  }
  /**
   * Logout the user
   */
  logout() {
    // if (environment.defaultauth === 'firebase') {
    //   this.authService.logout();
    // } else {
    //   this.authFackservice.logout();
    // }
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Show user profile information
   */
  showUserInfo() {
    this.authService.getUserInfo().subscribe(
      (response) => {
        if (response && response.isSuccess) {
          this.modalService.showUserProfile(response.data);
        } else {
          console.error('Không thể lấy thông tin người dùng.');
        }
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    );
  }

  /**
   * Get user avatar URL from localStorage or return default
   */
  getUserAvatarUrl(): string {
    const userImageUrl = localStorage.getItem('userImageUrl');
    if (userImageUrl) {
      // Nếu là URL tuyệt đối (http/https) thì dùng trực tiếp
      if (userImageUrl.startsWith('http')) {
        return userImageUrl;
      }
      // Nếu là đường dẫn tương đối thì kết hợp với API base URL
      return GlobalComponent.API_URL + userImageUrl;
    }
    // Trả về avatar mặc định nếu không có
    return 'assets/images/users/avatar-1.jpg';
  }

}
