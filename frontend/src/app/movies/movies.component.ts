import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies: Promise<Movie[]> | undefined;
  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.movies = this.movieService.getAllMovies();
    console.log(this.movies);
  }

}
