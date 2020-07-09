import {Component, ViewChild, ViewContainerRef, ComponentRef, Injector, ComponentFactoryResolver, EventEmitter} from '@angular/core';
import { loadRemoteModule } from '../../federation-utils';
import { LookupService } from '../microfrontends/lookup.service';

@Component({
  selector: 'test-cmp',
  templateUrl: './test.component.html'
})
export class TestComponent {
    @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

    pluginComponent: ComponentRef<any>;

    answerFromPlugin: string = "No answer";

    component = this;

    constructor(private injector: Injector,
        private cfr: ComponentFactoryResolver, private lookupService: LookupService) { }

    public send(): void {

    }

    public async create(): Promise<void> {
        const microfrontends = await this.lookupService.pluginLookup();
        if (microfrontends.length > 0) {
            const factory: any = await loadRemoteModule(microfrontends[0]).then(m => m[microfrontends[0].ngModuleName]);
            console.log(factory.ɵmod);

            const compFactory = this.cfr.resolveComponentFactory(factory.ɵmod.declarations[0]);
            console.log("compFactory", compFactory);
            const compRef = this.vc.createComponent(
                compFactory, null, this.injector);
            
            console.log(compRef);
            const component: any = compRef.instance;
            // Input
            component.pluginInput = "Plugin created";

            // Output
            // const event = new EventEmitter<string>();
            // event.subscribe(this.receiveEvent.bind(this, event));
            (<EventEmitter<string>>component.pluginOutput).subscribe(event => this.receiveEvent(event));
        }
    }

    public receiveEvent(answer: any): void {
        console.log('receiveEvent', answer)
        this.answerFromPlugin = answer;
    }
}