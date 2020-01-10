import {
  bindViewContribution,
  createTreeContainer,
  FrontendApplicationContribution,
  TreeWidget,
  WidgetFactory,
  TreeImpl,
  Tree
} from "@theia/core/lib/browser";
import { ContainerModule, interfaces } from "inversify";
import "../../src/browser/style/index.css";
import { TestWidgetContribution } from "./test-widget-contribution";
import { TestWidgetWidget } from "./test-widget-widget";
import { FamilyTreeWidgetContribution } from "./tree/family-tree-contribution";
import { FamilyTreeWidget } from "./tree/family-tree-widget";
import { FamilyTree } from "./tree/family-tree";

export default new ContainerModule(bind => {
  bindViewContribution(bind, TestWidgetContribution);
  bind(FrontendApplicationContribution).toService(TestWidgetContribution);
  bind(TestWidgetWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue(ctx => ({
      id: TestWidgetWidget.ID,
      createWidget: () => ctx.container.get<TestWidgetWidget>(TestWidgetWidget)
    }))
    .inSingletonScope();

  bindViewContribution(bind, FamilyTreeWidgetContribution);
  bind(FrontendApplicationContribution).toService(FamilyTreeWidgetContribution);
  bind(WidgetFactory)
    .toDynamicValue(ctx => ({
      id: FamilyTreeWidget.ID,
      createWidget: () => createFamilyTreeWidget(ctx.container)
    }))
    .inSingletonScope();
});

export function createFamilyTreeWidget(
  parent: interfaces.Container
): FamilyTreeWidget {
  const child = createTreeContainer(parent);

  child.unbind(TreeImpl);
  child.bind(FamilyTree).toSelf();
  child.rebind(Tree).toService(FamilyTree);

  child.unbind(TreeWidget);
  child.bind(FamilyTreeWidget).toSelf();

  return child.get(FamilyTreeWidget);
}
