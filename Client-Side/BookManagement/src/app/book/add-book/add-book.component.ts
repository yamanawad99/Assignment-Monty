import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private service:SharedService) { }


  @Input() book: any;
  BookId?: string;
  BookName?: string;
  Author?: string;
  Price?: string;
  PublishingDate?: string;

  ngOnInit(): void {
    this.BookId = this.book.BookId;
    this.BookName = this.book.BookName;
    this.Author = this.book.Author;
    this.Price = this.book.Price;
    this.PublishingDate = this.book.PublishingDate;

  }
  addBook() {
    var val = {
      BookId: this.BookId, 
      BookName: this.BookName, 
      Author: this.Author, 
      Price:this.Price, 
      PublishingDate:this.PublishingDate
    };
    this.service.addBookList(val).subscribe(res=>
      {
        alert(res.toString());
      })
  }
}
