import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css'],

})
export class ShowBookComponent implements OnInit {

  constructor(private service: SharedService, private fb: FormBuilder, private router: Router) { }
  BookList: any = [];
  ModalTitle: string = ""
  ActivateAddBookComp: Boolean = false;
  book: any;
  filteredOptions: any = [];
  BookNameFilter?: string;
  AuthorFilter?: string;
  PriceFilterLower?: number;
  PriceFilterUpper?: number;
  PublishingDateFilter?: string;
  BookListWOFilter: any = [];
  formGroup!: FormGroup;
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'bookName': [''], 'Author': [''], 'PriceFilterLower': 0, 'PriceFilterUpper': 0
    })
    this.formGroup.get('bookName')!.valueChanges.subscribe((response: any) => {
      console.log(response);
      if (response)
        this.filterDataBookName(response);
      else
        this.filteredOptions = []
    });
    this.formGroup.get('Author')!.valueChanges.subscribe((response: any) => {
      console.log(response);
      if (response)
        this.filterDataAuthor(response);
      else
        this.filteredOptions = []
    });

    this.refreshBookList();
  }

  addClick() {
    this.book = {
      BookId: 0, BookName: "", Author: "", Price: 10, PublishingDate: ""
    }
    this.ModalTitle = "Add Book";
    this.ActivateAddBookComp = true;
  }
  closeClick() {
    this.ActivateAddBookComp = false;
    this.refreshBookList();
  }
  deleteClick(item: any) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
    if (userInfo.Type == "admin") {
      if (confirm("Are you sure?")) {
        this.service.deleteBookList(item.BookID).subscribe(data => {
          alert(data.toString());
          this.refreshBookList();
        });
      }
    }
    else
    {
      alert("Users can't delete, sign in as administrator");
    }
    

  }
  refreshBookList() {
    this.service.getBookList().subscribe(data => {
      this.BookList = data;
      this.filteredOptions = data;
      this.BookListWOFilter = data;
    });
  }
  FilterFn() {
    var BookNameFilter = this.BookNameFilter;
    var AuthorFilter = this.AuthorFilter;
    var PriceFilterLower = this.PriceFilterLower;
    var PriceFilterUpper = this.PriceFilterUpper;
    var PublishingDateFilter = this.PublishingDateFilter;
    this.BookList = this.BookListWOFilter.filter(function (el: any) {
      return el.BookName.toString().toLowerCase().includes(BookNameFilter?.toString().trim().toLowerCase()) ||
        el.Author.toString().toLowerCase().includes(AuthorFilter?.toString().trim().toLowerCase())

    });
  }
  filterDataBookName(enteredData: any) {
    this.filteredOptions = this.BookList.filter((item: any) => {
      return item.BookName.toString().toLowerCase().includes(enteredData.toLowerCase())
    });
  }
  filterDataAuthor(enteredData: any) {
    this.filteredOptions = this.BookList.filter((item: any) => {
      return item.Author.toString().toLowerCase().includes(enteredData.toLowerCase())
    });
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
