import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = environment.urlEndPoint;
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllMovies = async (): Promise<Movie[]> => {
    return await this.httpClient.get(`${this.url}movies`).toPromise() as Promise<Movie[]>;
  }

  getMovieById = async (id: number): Promise<Movie> => {
    return await this.httpClient.get(`${this.url}movies/${id}`).toPromise() as Promise<Movie>;
  }
}
