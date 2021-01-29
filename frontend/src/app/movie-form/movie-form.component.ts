import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  public movieForm: FormGroup;
  public movie$: Promise<Movie> | undefined;
  public editing: boolean = false;
  private routeParamId: string | number | null = 0;
  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      year: ['', [Validators.required]],
      cover: ['https://i.pinimg.com/originals/44/31/bd/4431bd4cc9381ba8fe482e83367f3a49.jpg',
       [Validators.required]],
      synopsis: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  ngOnInit(): void {
    this.getMovie();
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Valid?', form.value);
    console.log('Title', form.value.title);
    console.log('Email', form.value.year);
    console.log('Cover', form.value.cover);
    console.log('Synopsis', form.value.synopsis);
    const call = (this.editing) 
      ? this.movieService.updateMovie(this.routeParamId, form.value) 
      : this.movieService.createMovie(form.value);
    call.then(res => {
      console.log(res);
      alert('Guardado con éxito!');
      this.router.navigateByUrl('/movies');
    }).catch(err => {
      alert('An error has happened');
      console.log(err);
    });
  }

  getMovie = async() => {
    this.routeParamId = this.activatedRoute.snapshot!.paramMap.get('id');
    if (this.routeParamId) {
      this.routeParamId = parseInt(this.routeParamId);
      if (this.routeParamId === 0) {
        this.editing = false;
        return;
      }
      this.editing = true;
      this.movieService.getMovieById(this.routeParamId).then(res => {
        this.movieForm.setValue({
          title: res.title,
          synopsis: res.synopsis,
          year: res.year,
          cover: res.cover,
        });
        console.log(res);
      }).catch(err => {
        alert('An error has happened');
        console.log(err);
      });
    }
  }

}
