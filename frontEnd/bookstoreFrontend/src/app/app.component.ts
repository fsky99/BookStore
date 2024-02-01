import { Component } from '@angular/core';
import { BookService } from './book.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bookstoreFrontend';
  LOR: any[] = [];

  constructor(private booksService: BookService , private http: HttpClient) {}

  ngOnInit() {
    this.getAllLORBooks();
  }

  getAllLORBooks() {
    this.booksService.getAllLORBooks().subscribe(
      (book: any) => {
        let newBook = {
          title: book.title,
          pubDate: book.first_publish_year,
          author: book.author_name,
        };
        console.log(newBook);
        this.LOR.push(newBook);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }



  goToGitHub(){
    window.location.href = 'https://github.com/fsky99'
  }

}
