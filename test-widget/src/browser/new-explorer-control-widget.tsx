
import * as React from 'react';
import { injectable } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser';
import { ExplorerControlComponent } from './components';

@injectable()
export class NewExplorerControlWidget extends ReactWidget{
    constructor(
    ) {
        super();
        this.addClass('new-explorer-control-widget');
    }
    protected render(): React.ReactNode {
        return <ExplorerControlComponent/>;
    }
}
