import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  CheckboxComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-create-activity',
  standalone: true,
  imports: [
    ComboBoxComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonIconComponent,
  ],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss',
})
export class CreateActivityComponent {
  selectedActivity: { name: string; value: any }[] = [];
  optionActivity: { name: string; value: any }[] = [
    {
      name: 'Data Cleaning',
      value: 'Removing null values and correcting errors',
    },
    {
      name: 'Data Transformation',
      value: 'Converting data types and normalizing values',
    },
    {
      name: 'Data Aggregation',
      value: 'Summarizing data into meaningful statistics',
    },
    {
      name: 'Data Visualization',
      value: 'Creating charts and graphs to represent data',
    },
    {
      name: 'Data Analysis',
      value: 'Identifying patterns and insights from data',
    },
    {
      name: 'Data Mining',
      value: 'Discovering hidden patterns in large datasets',
    },
    { name: 'Data Collection', value: 'Gathering data from various sources' },
    {
      name: 'Data Storage',
      value: 'Saving data in databases or other storage systems',
    },
    {
      name: 'Data Validation',
      value: 'Ensuring data accuracy and consistency',
    },
    {
      name: 'Data Integration',
      value: 'Combining data from different sources',
    },
  ];
}
