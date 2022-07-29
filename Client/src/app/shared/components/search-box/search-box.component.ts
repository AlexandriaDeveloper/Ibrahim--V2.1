import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, debounceTime, distinctUntilChanged, tap, Observable, map } from 'rxjs';
import { Param } from '../../models/params';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],

})
export class SearchBoxComponent implements OnInit, AfterViewInit {
  @ViewChild('element') element: ElementRef;
  @Output('searchEvent') SearchEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('clearEvent') CloseEvent: EventEmitter<Param> = new EventEmitter<Param>();
  @Input('placeHolder') placeHolder;
  @Input('elementName') elementName: string = '';
  @Input('label') label: string;
  @Input('param') Param: Param;
  closeIcon: boolean = false
  ngAfterViewInit(): void {

    var element$ = fromEvent(this.element.nativeElement, 'keyup')
      .pipe(debounceTime(600), distinctUntilChanged(), map((x: any) => {

        if (x?.srcElement?.value === '') {
          this.closeIcon = false
        }
        else {
          this.closeIcon = true;
          Object.defineProperty(this.Param, 'pageIndex', { value: 0 });
        }
        this.Param = Object.defineProperty(this.Param, this.elementName, { value: x?.srcElement?.value });
        return this.Param;
      })
      );
    const val = { elementId: this.elementName, param: this.Param, elementValue: element$ };


    this.SearchEvent.emit(val);
  }


  elementObservable: Observable<any>;
  ngOnInit(): void {

  }
  clearSearch() {


    Object.defineProperty(this.Param, 'pageIndex', { value: 0 });

    Object.defineProperty(this.Param, this.elementName, { value: null });



    this.element.nativeElement.value = '';
    this.closeIcon = false;

    this.CloseEvent.emit(this.Param);



  }






}
export interface searchElement {
  elementId: string,
  param: Param,
  elementValue: Observable<any>
}
