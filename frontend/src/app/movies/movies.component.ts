import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies$: Promise<Movie[]> | undefined;
  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  removeById = (id: number | undefined) => {
    if (!id) {
      return;
    }
    if(confirm('Seguro que desea eliminar esta película?')) {
      this.movieService.deleteMovieById(id).then(res => alert('Eliminado con éxito')).catch(err => {
        alert('Ocurrió un error, contacte a soporte');
        console.log(err);
      }).finally(() => this.getMovies());
    }
  }

  getMovies = () => {
    this.movies$ = this.movieService.getAllMovies();
  }

}
