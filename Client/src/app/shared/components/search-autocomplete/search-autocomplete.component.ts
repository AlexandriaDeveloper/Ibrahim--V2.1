import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, map, merge, Observable } from 'rxjs';
import { Param } from '../../models/params';

@Component({
  selector: 'app-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss']
})
export class SearchAutocompleteComponent implements OnInit, AfterViewInit {
  @Input('param') param: Param;
  filterdOptions: any[];
  @Input('options') options: [];
  @Output('onSelectOption') selectedOption: any = new EventEmitter<any>();
  @Output('onClear') clearOption = new EventEmitter<any>();
  @ViewChild('element') element: ElementRef;
  filterdOptionsObservable: Observable<any[]>;
  close: boolean = false;
  constructor() { }
  ngAfterViewInit(): void {
    //if (this.element) {
    let filteredOptionsKeyupEvent = fromEvent(this?.element?.nativeElement, ("keyup"))
    let filteredOptionsfocuseEvent = fromEvent(this?.element?.nativeElement, ("focus"))

    this.filterdOptionsObservable = merge(filteredOptionsKeyupEvent, filteredOptionsfocuseEvent)
      .pipe(map((val: any) => {
        this.close = val.target.value === '' ? false : true;
        return this._filter(val.target.value || '')
      }));
    this.filterdOptionsObservable.subscribe();
    // }

  }

  ngOnInit(): void {
  }
  autocompleteSelectionChange(ev) {
    console.log(ev);

    this.selectedOption.emit(ev);
  }
  displayWithFun(ev) {


    const index = this.filterdOptions.findIndex(x => x.id == ev);


    return this.filterdOptions[index] ? this.filterdOptions[index]?.name : '';



  }
  clearSearch() {
    this.element.nativeElement.value = null;
    this.clearOption.emit();
  }

  private _filter(value: string): any[] {
    this.filterdOptions = this.options;

    if (value === ' ' || value === '') {
      this.filterdOptions = this.options;
      console.log(this.filterdOptions);

      return this.filterdOptions;
    }
    const filterValue = value.toLowerCase();
    this.filterdOptions = this.filterdOptions.filter(option => option?.name.startsWith(filterValue));
    return this.filterdOptions;
  }
}
