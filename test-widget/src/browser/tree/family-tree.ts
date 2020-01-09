import {
  CompositeTreeNode,
  ExpandableTreeNode,
  SelectableTreeNode,
  TreeImpl,
  TreeNode
} from "@theia/core/lib/browser";

import { injectable } from "inversify";

@injectable()
export default class FamilyTree extends TreeImpl {
  async resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
    if (FamilyMemberNode.is(parent)) {
      const memberNode = parent as FamilyMemberNode;

      if (!memberNode.children) return [];
      return memberNode.familyMember.children.map(child =>
        FamilyMemberNode.toNode(child, parent)
      );
    }
    return Array.from(parent.children);
  }
}

export interface FamilyMember {
  name: string;
  children: FamilyMember[];
}

export interface FamilyMemberNode
  extends SelectableTreeNode,
    ExpandableTreeNode {
  familyMember: FamilyMember;
}

export namespace FamilyMemberNode {
  export function is(node: object | undefined): node is FamilyMemberNode {
    return !!node && "familyMember" in node;
  }

  export function toNode(
    member: FamilyMember,
    parent: CompositeTreeNode | undefined = undefined
  ): FamilyMemberNode {
    const node: FamilyMemberNode = {
      id: member.name,
      name: member.name,
      familyMember: member,
      selected: false,
      visible: true,
      expanded: false,
      children: [],
      parent
    };
    return node;
  }
}
