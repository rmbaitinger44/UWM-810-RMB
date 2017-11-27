import {inject, bindable, bindingMode} from 'aurelia-framework';
import Flatpickr from 'flatpickr';
@inject(Element)
export class FlatPickerCustomElement {
@bindable({defaultBindingMode: bindingMode.twoWay}) value;
constructor(element) {
  this.element = element;
}
bind() {
            const defaultConfig = {
                	altInput: true,
                	altFormat: "F j, Y",
        wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        }
    //runs after HTML has been created
    attached() {
                this.flatpickr = new Flatpickr(this.element.querySelector('.aurelia-flatpickr'), this._config);
         }
        //date from flat picker is selected as set 
        onChange(selectedDates, dateStr, instance) {
                this.value = selectedDates[0] 
        }
        valueChanged() {
                if (!this.flatpickr) {
                    return;
                }
                if (this.value === this.flatpickr.selectedDates[0]){
                    return;
                }
                let newDate = this.value ? this.value : undefined;      
                this.flatpickr.setDate(newDate);
            }
            }
                    
