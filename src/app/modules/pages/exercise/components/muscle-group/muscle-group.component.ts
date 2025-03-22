import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MUSCLE_TYPE } from 'src/app/core/enums/muscle-type.enum';

@Component({
  selector: 'app-muscle-group',
  templateUrl: './muscle-group.component.html',
  styleUrl: './muscle-group.component.scss',
})
export class MuscleGroupComponent {
  muscleType: string = '';
  MUSCLE_TYPE = MUSCLE_TYPE;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      // console.log(params);
      this.muscleType = params['muscleType'] ?? 'shoulder';

      console.log('muscleType', this.muscleType);
    });
  }
}
