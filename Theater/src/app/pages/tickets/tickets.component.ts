import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Show } from 'src/app/shared/models/Show';
import { Ticket } from 'src/app/shared/models/Ticket';
import { TicketShowLink } from 'src/app/shared/models/TicketShowLink';
import { ShowService } from 'src/app/shared/services/show.service';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  shows: Array<Show> = [];
  tickets: Array<Ticket> = [];
  items: Array<TicketShowLink> = [];


  user: firebase.default.User = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

  constructor(
    private ticketService: TicketService,
    private showService: ShowService) { }

  ngOnInit(): void {
    let asd = this.showService.getShows();
    asd.subscribe((shows: any) => {
      console.log(shows);
      this.shows = shows;
      this.updateData();
    });

    console.log(this.user);
    this.ticketService.getAllForUser(this.user.uid).subscribe((tickets: any) => {
      console.log(tickets);
      this.tickets = tickets;
      this.updateData();
    });
  }

  updateData() {
    this.items = [];
    this.shows.forEach(element => {
      let ticket = this.tickets.find(x => x.show_id == element.id);
      if (ticket) {
        this.items.push({
          show: element,
          ticket: ticket
        });
      }
    });
  }

  delete(ticket: Ticket) {
    this.ticketService.delete(ticket.id).then(() => {
      console.log('Ticket deleted');
    }).catch(error => {
      console.error(error);
    });
  }

  increment(ticket: Ticket) {
    ticket.number++;
    this.ticketService.update(ticket);
  }

  decrease(ticket: Ticket) {
    if (ticket.number < 2) {
      this.delete(ticket);
    } else {
      ticket.number--;
      this.ticketService.update(ticket);
    }

  }

}
