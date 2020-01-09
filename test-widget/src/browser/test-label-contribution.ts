import { LabelProviderContribution } from "@theia/core/lib/browser";
import { injectable } from "inversify";
import URI from "@theia/core/lib/common/uri";

@injectable()
export class TestLabelContribution implements LabelProviderContribution {
  canHandle(element: object): number {
    console.log(element instanceof URI);
    if (element instanceof URI) return 1000;
    return 0;
  }

  getIcon(element: object): string {
    var uri = element as URI;
    console.log("getIcon(" + uri.displayName + ")");

    if (uri.displayName === "packages") {
      console.log("getIcon(" + uri.displayName + ")");
      return "martini-server-icon";
    }
    if (uri.displayName === "examples" || uri.displayName === "Test") {
      console.log("getIcon(" + uri.displayName + ")");
      return "martini-package-icon";
    }

    return "";
  }

  getName(element: object): string {
    var uri = element as URI;

    if (uri.displayName === "packages") {
      console.log("getName(" + uri.displayName + ")");
      return "local";
    }

    return uri.displayName;
  }
}
