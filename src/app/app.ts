import { Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './shared/components/navbar/navbar';
import {Footer} from './shared/components/footer/footer';
import {SweetAlert2LoaderService} from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Navbar, Footer],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {


}
