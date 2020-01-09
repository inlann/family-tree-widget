import { CompositeTreeNode, ContextMenuRenderer, TreeProps, TreeWidget } from "@theia/core/lib/browser";
import { inject, injectable, postConstruct } from "inversify";
import { FamilyMember, FamilyMemberNode } from "./family-tree";
import { FamilyTreeModel } from "./family-tree-model";

@injectable()
export class FamilyTreeWidget extends TreeWidget {
  static readonly ID = "family-tree:widget";
  static readonly LABEL = "Family";

  constructor(
    @inject(TreeProps) readonly props: TreeProps,
    @inject(FamilyTreeModel) readonly model: FamilyTreeModel,
    @inject(ContextMenuRenderer) contextMenuRenderer: ContextMenuRenderer
  ) {
    super(props, model, contextMenuRenderer);
    const members: FamilyMember[] = [
      {
        name: "member 1",
        children: [
          {
            name: "child1",
            children: []
          },
          {
            name: "child2",
            children: []
          }
        ]
      },
      {
        name: "member 2",
        children: [
          {
            name: "child3",
            children: []
          },
          {
            name: "child4",
            children: []
          }
        ]
      }
    ];
    this.model.root = {
      id: "family-tree-root",
      name: "Family Tree Root",
      children: members.map(member => FamilyMemberNode.toNode(member)),
      visible: true,
      parent: undefined
    } as CompositeTreeNode;
  }

  @postConstruct()
  protected async init(): Promise<void> {
    this.id = FamilyTreeWidget.ID;
    this.title.label = FamilyTreeWidget.LABEL;
    this.title.caption = FamilyTreeWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = "fa fa-window-maximize"; // example widget icon.
    this.update();
  }
}
