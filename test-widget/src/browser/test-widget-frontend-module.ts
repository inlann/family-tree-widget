import {
    bindViewContribution,
    FrontendApplicationContribution,
    WidgetFactory,
} from "@theia/core/lib/browser";
import { ContainerModule } from "inversify";
import "../../src/browser/style/index.css";
import { EXPLORER_VIEW_CONTAINER_ID } from '@theia/navigator/lib/browser';
import { FamilyTreeWidgetContribution } from "./tree/family-tree-contribution";
import { FamilyTreeWidget } from "./tree/family-tree-widget";
import { NewExplorerWidget } from "./new-explorer-widget";

export default new ContainerModule(bind => {
    bindViewContribution(bind, FamilyTreeWidgetContribution);
    bind(FrontendApplicationContribution).toService(FamilyTreeWidgetContribution);
    bind(WidgetFactory)
        .toDynamicValue(ctx => ({
            id: FamilyTreeWidget.ID,
            createWidget: () => FamilyTreeWidget.createWidget(ctx.container)
        }))
        .inSingletonScope();

    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: EXPLORER_VIEW_CONTAINER_ID,
        createWidget: async () => NewExplorerWidget.createWidget(container)
    }));
});
