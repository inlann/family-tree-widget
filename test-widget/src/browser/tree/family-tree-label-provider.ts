import { LabelProviderContribution } from "@theia/core/lib/browser";
import { FamilyMemberNode } from "./family-tree";

import { injectable } from "inversify";

@injectable()
export class FamilyTreeLabelProvider implements LabelProviderContribution {
  canHandle(element: object): number {
    return FamilyMemberNode.is(element) ? 1 : 0;
  }

  getName(node: FamilyMemberNode): string {
    return node.familyMember.name;
  }
}
