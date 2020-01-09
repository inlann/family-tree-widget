import {
  createTreeContainer,
  Tree,
  TreeImpl,
  TreeModel,
  TreeModelImpl,
  TreeWidget,
  LabelProviderContribution
} from "@theia/core/lib/browser";
import { interfaces } from "inversify";
import FamilyTree from "./family-tree";
import { FamilyTreeModel } from "./family-tree-model";
import { FamilyTreeWidget } from "./family-tree-widget";
import { FamilyTreeLabelProvider } from "./family-tree-label-provider";

export function createFamilyTreeWidget(
  parent: interfaces.Container
): FamilyTreeWidget {
  const child = createTreeContainer(parent);

  child.unbind(TreeImpl);
  child.bind(FamilyTree).toSelf();
  child.rebind(Tree).toService(FamilyTree);

  child.unbind(TreeModelImpl);
  child.bind(FamilyTreeModel).toSelf();
  child.rebind(TreeModel).toService(FamilyTreeModel);

  child.unbind(TreeWidget);
  child.bind(FamilyTreeWidget).toSelf();

  child.bind(LabelProviderContribution).to(FamilyTreeLabelProvider);

  return child.get(FamilyTreeWidget);
}
