import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Oauth2Service from 'src/app/services/oauth2/oauth2.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css'],
})
export class AuthorizedComponent implements OnInit {
  code = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private oauth2Service: Oauth2Service,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.code = data['code'];
      console.log(this.code);
      if (this.code == undefined) {
        console.log('code not generated.');
      }
      const code_verifier = this.tokenService.getVerifier();

      console.log('verifier -> ' + code_verifier);
      this.tokenService.deleteVerifier();
      this.getToken(this.code, code_verifier);
    });
  }

  getToken(code: string, code_verifier: string): void {
    this.oauth2Service.getToken(code, code_verifier).subscribe((data) => {
      this.tokenService.setTokens(data['access_token'], data['refresh_token']);
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    }),
      (err: any) => {
        console.log(err);
      };
  }
}
