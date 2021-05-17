import { ApplicationShell, BaseWidget, Message, Panel, PanelLayout, StatefulWidget, Widget } from '@theia/core/lib/browser';
import { inject, injectable, interfaces } from 'inversify';
import TrackableWidgetProvider = ApplicationShell.TrackableWidgetProvider;
import { EXPLORER_VIEW_CONTAINER_ID, EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS } from '@theia/navigator/lib/browser';
import { NewExplorerControlWidget } from './new-explorer-control-widget';
import { FamilyTreeWidget } from './tree/family-tree-widget';

interface NewExplorerWidgetState {
    readonly familyTree: {
        readonly widget: FamilyTreeWidget,
    }
}

const TITLE_TEXT = 'New Explorer Control and Navigator';

@injectable()
export class NewExplorerWidget extends BaseWidget implements TrackableWidgetProvider, StatefulWidget{
    public readonly id = EXPLORER_VIEW_CONTAINER_ID;

    static createWidget(parent: interfaces.Container): NewExplorerWidget {
        const childContainer = parent.createChild();

        childContainer.bind(NewExplorerWidget).toSelf();
        childContainer.bind(NewExplorerControlWidget).toSelf();
        childContainer.bind(FamilyTreeWidget).toDynamicValue(({ container }) => FamilyTreeWidget.createWidget(container));

        return childContainer.get(NewExplorerWidget);
    }

    constructor(
        @inject(NewExplorerControlWidget) private readonly explorerControlWidget: NewExplorerControlWidget,
        @inject(FamilyTreeWidget) private readonly familyTreeWidget: FamilyTreeWidget,
    ) {
        super();
        this.addClass('new-explorer-manage-widget');

        this.title.caption = TITLE_TEXT;
        this.title.label = TITLE_TEXT;
        this.title.iconClass = EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS.iconClass || 'navigator-icon';
        this.title.closable = true;

        this.toDispose.pushAll([
            this.explorerControlWidget,
            this.familyTreeWidget,
        ]);

        const layout = new PanelLayout();
        this.layout = layout;

        layout.addWidget(this.explorerControlWidget);

        const dividerWidget = new Widget({ node: document.createElement('hr') });
        dividerWidget.addClass('new-explorer-widget-divider');
        layout.addWidget(dividerWidget);

        const familyTreePanel = new Panel();
        familyTreePanel.addWidget(this.familyTreeWidget);
        familyTreePanel.addClass('family-tree-widget');
        layout.addWidget(familyTreePanel);
    }

    protected onBeforeAttach(msg: Message): void {
        super.onBeforeAttach(msg);
        this.update();
    }

    protected onUpdateRequest(msg: Message): void {
        super.onUpdateRequest(msg);
        this.explorerControlWidget.update();
        this.familyTreeWidget.update();
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        this.familyTreeWidget.activate();
    }

    public getTrackableWidgets(): Widget[] {
        return [
            this.familyTreeWidget
        ];
    }

    public restoreState(oldState: unknown): void {
    }

    public storeState(): NewExplorerWidgetState {
        return {
            familyTree: {
                widget: this.familyTreeWidget
            }
        };
    }
}
