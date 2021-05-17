import * as React from 'react';

export class ExplorerControlComponent extends React.Component{
    private readonly COMPONENT_CLASS: string = 'new-explorer-control';
    public render(): JSX.Element{
        return(
            <div className={this.COMPONENT_CLASS}>
                New Explorer Controls Here !
            </div>
        );
    }
}
