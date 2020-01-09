import {
  bindViewContribution,
  FrontendApplicationContribution,
  WidgetFactory
} from "@theia/core/lib/browser";
import { ContainerModule } from "inversify";
import "../../src/browser/style/index.css";
// import "../../src/browser/welcome/welcome.css";
import { TestWidgetContribution } from "./test-widget-contribution";
import { TestWidgetWidget } from "./test-widget-widget";
import { createFamilyTreeWidget, FamilyTreeWidget } from "./tree";
import { FamilyTreeWidgetContribution } from "./tree/family-tree-widget-contribution";
// import { WelcomeDataProvider, WelcomeDataProviderImpl } from "./welcome/welcome-data-provider";
// import { WelcomeViewContribution } from "./welcome/welcome-view-contribution";
// import { WelcomeWidget } from "./welcome/welcome-widget";

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

  // bindViewContribution(bind, WelcomeViewContribution);
  // bind(WelcomeWidget).toSelf();
  // bind(WidgetFactory).toDynamicValue(context => ({
  //   id: WelcomeWidget.ID,
  //   createWidget: () => context.container.get<WelcomeWidget>(WelcomeWidget)
  // }));
  // bind(WelcomeDataProvider).to(WelcomeDataProviderImpl).inSingletonScope;

  bindViewContribution(bind, FamilyTreeWidgetContribution);
  bind(FamilyTreeWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue(ctx => ({
      id: FamilyTreeWidget.ID,
      createWidget: () => createFamilyTreeWidget(ctx.container)
    }))
    .inSingletonScope();
});
