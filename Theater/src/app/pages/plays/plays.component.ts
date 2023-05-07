import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Show } from 'src/app/shared/models/Show';
import { User } from 'src/app/shared/models/User';
import { ShowService } from 'src/app/shared/services/show.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss']
})
export class PlaysComponent implements OnInit {
  shows?: Array<Show>;
  user?: User;


  constructor(
    private router: Router,
    private showSercice: ShowService,
    private ticketService: TicketService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.showSercice.getShows().subscribe((shows: any) => {
      console.log(shows);
      this.shows = shows;
    });

    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe((data) => {
      this.user = data;
    }, (error) => {
      console.error(error);
    });
  }

  async addTicket(show: Show) {
    if (this.user) {
      console.log(show);
      let obs = this.ticketService.getSpecific(show.id, this.user.id);
      let bool = false;
      await obs.toPromise().then((data) => {
        console.log(data?.size);
        if (data && data?.size > 0) {
          console.log('Ticket already exists');
          bool = true;
        } else {
          console.log('Ticket does not exist');
        }
      });

      if (bool) {
        //this.ticketService.update(show, this.user);
      } else {
        this.ticketService.addTicket(show, this.user);
      }
      this.router.navigateByUrl('/tickets');
    }
  }
}
