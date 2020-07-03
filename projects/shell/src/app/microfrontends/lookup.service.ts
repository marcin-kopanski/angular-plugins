import { Injectable } from '@angular/core';
import { Microfrontend } from './microfrontend';

@Injectable({ providedIn: 'root' })
export class LookupService {
    lookup(): Promise<Microfrontend[]> {
        return Promise.resolve([
            {
                // For Loading
                remoteEntry: 'http://localhost:5000/mfe1/mfe1RemoteEntry.js',
                remoteName: 'mfe1',
                exposedModule: 'Module',
                
                // For Routing
                displayName: 'Flights',
                routePath: 'flights',
                ngModuleName: 'FlightsModule'
            },
            {
                // For Loading
                remoteEntry: 'http://localhost:5000/mfe2/mfe2RemoteEntry.js',
                remoteName: 'mfe2',
                exposedModule: 'Module',
                
                // For Routing
                displayName: 'Bookings',
                routePath: 'bookings',
                ngModuleName: 'BookingsModule'
            },
            {
                // For Loading
                remoteEntry: 'http://localhost:5000/mfe3/mfe3RemoteEntry.js',
                remoteName: 'mfe2',
                exposedModule: 'Module',
                
                // For Routing
                displayName: 'Bookings2',
                routePath: 'bookings2',
                ngModuleName: 'BookingsModule'
            }        
        ] as Microfrontend[]);
    }
}