import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-main-central-creer-event',
  templateUrl: './main-central-creer-event.component.html',
  styleUrls: ['./main-central-creer-event.component.css']
})
export class MainCentralCreerEventComponent implements OnInit {

  public errorMessage = '';
  public isFormFailed = false;

  constructor(
    private tokenService : TokenStorageService,
    private eventService : EventService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  creerEvent(name: string, starting_date: string, ending_date: string, description: string, statut: string, category:string){
    this.errorMessage = '';
    this.isFormFailed = false;

    const username: string = this.tokenService.getUser().username;

    if (name == "") {
      this.errorMessage += 'nom de l\'event à remplir';
      this.isFormFailed = true;
    }
    if (description == "") {
      this.errorMessage += 'description a replir\n';
      this.isFormFailed = true;
    }
    if (this.isFormFailed) return;


    this.eventService.createOne(name, new Date (starting_date), new Date (ending_date), new Date(), description, username, statut, category).subscribe(
      data => {
        //this.tokenStorage.saveToken(data.accessToken);
        //this.tokenStorage.saveUser(data);
        window.location.reload();
      },
      err => {
        this.errorMessage += err.error.message;

      }
    );
  }
}
