import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @Input() pluginInput: string;
  @Output() pluginOutput: EventEmitter<string> = new EventEmitter<string>();

  answerValue: string = "No answer";

  public send(): void {
    console.log(this.pluginOutput);
    this.pluginOutput.emit(this.answerValue);
  }

  public show(): void {

  }
}
