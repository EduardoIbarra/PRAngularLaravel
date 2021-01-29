import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  public movieForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router,
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
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Valid?', form.value);
    console.log('Title', form.value.title);
    console.log('Email', form.value.year);
    console.log('Cover', form.value.cover);
    console.log('Synopsis', form.value.synopsis);
    this.movieService.createMovie(form.value).then(res => {
      console.log(res);
      alert('Guardado con éxito!');
      this.router.navigateByUrl('/movies');
    }).catch(err => {
      alert('An error has happened');
      console.log(err);
    });
  }

}
