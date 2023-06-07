// Tout composant de votre application qui devra utiliser l’état de votre application devra souscrire au Store via des ‘selectors’.
// Une fois que le composant est souscrit au Store, il devra par exemple modifier l’état du ‘Store’ via une action.

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewCup } from '../../../model/newCup.model';
import { CupService } from 'src/app/service/cup.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import { CupAction } from 'src/app/store/cup/cup.action';
import { CupSelector } from 'src/app/store/cup/cup.selectors';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-cup',
  templateUrl: './create-cup.component.html',
  styleUrls: ['./create-cup.component.scss'],
})
export class CreateCupComponent implements OnInit, OnDestroy {
  userForm = new FormGroup({
    name: new FormControl<string | null>('Name', [Validators.required]),
    date: new FormControl<string | null>('2023-01-19', [Validators.required]),
    volume: new FormControl<number | null>(4, [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
    color: new FormControl<string | null>('BLEU', [Validators.required]),
  });

  loading = false;

  constructor(private toastr: ToastrService, private store: Store) {
    this.store
      .select(CupSelector.getCreateLoading)
      .subscribe((value) => (this.loading = value));
  }

  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {}

  getMessage(control: FormControl): string {
    if (control.errors?.['required']) {
      return 'Le champs est obligatoire';
    } else if (control.errors?.['min']) {
      return `Le champs doit être supérieur à ${control.errors?.['min'].min}`;
    } else if (control.errors?.['max']) {
      return `Le champs doit être inférieur à ${control.errors?.['max'].max}`;
    } else {
      return '';
    }
  }

  validate(): void {
    if (this.userForm.valid) {
      const value = this.userForm.value;
      const cup = new NewCup(
        value.name!,
        value.date!,
        value.volume!,
        value.color!
      );

      this.userForm.disable();
      this.store
        .dispatch(new CupAction.Create(cup))
        .pipe(takeUntil(this.destroy$)) // pour detruire la souscription lors de la destruction du composant
        .subscribe({
          next: () => {
            this.toastr.success('Cup Créée');
            this.userForm.enable();
            // TODO this.userForm.reset();
          },

          error: () => {
            this.toastr.error("La cup n'a pas pu être créée.");
            this.userForm.enable();
          },
        });
    }
  }
}
