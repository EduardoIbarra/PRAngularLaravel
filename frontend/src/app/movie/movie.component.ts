import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/Movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movie$: Promise<Movie> | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
  ) { 
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie = async() => {
    let routeParamId: string | number | null = this.activatedRoute.snapshot!.paramMap.get('id');
    if (routeParamId) {
      routeParamId = parseInt(routeParamId);
      this.movie$ = this.movieService.getMovieById(routeParamId);
    }
  }

}
