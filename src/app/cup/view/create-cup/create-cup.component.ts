import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewCup } from '../../../model/newCup.model';
import { CupService } from 'src/app/service/cup.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import { CupAction } from 'src/app/store/cup/cup.action';

@Component({
  selector: 'app-create-cup',
  templateUrl: './create-cup.component.html',
  styleUrls: ['./create-cup.component.scss'],
})
export class CreateCupComponent implements OnInit {
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

  constructor(
    private cupService: CupService,
    private japelleCommeJeVeux: ToastrService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(CupAction.Create);
  }

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
    // console.log(this.userForm.value)
    // console.log(this.userForm.dirty)
    // console.log(this.userForm.value.name);
    // console.log(this.userForm.controls.name.value);
    // console.log(this.userForm.controls.name.dirty);
    // console.log(this.userForm.controls.name.errors);
    // console.log(this.userForm.controls.volume.errors);

    console.log(this.userForm.invalid);
    if (this.userForm.valid) {
      const value = this.userForm.value;
      const cup = new NewCup(
        value.name!,
        value.date!,
        value.volume!,
        value.color!
      );

      this.store.dispatch(new CupAction.Create(cup));
      this.loading = true;
      this.userForm.disable();
      this.cupService.createCup(cup).subscribe({
        next: () => {
          this.japelleCommeJeVeux.success('Cup Créée');
          this.loading = false;
          this.userForm.enable();
          this.userForm.reset();
        },

        error: () => {
          console.log('error');
          this.japelleCommeJeVeux.error("La cup n'a pas pu être créée.");
          this.loading = false;
          this.userForm.enable();
        },
      });
    }
  }
}
