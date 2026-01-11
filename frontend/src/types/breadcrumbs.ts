import { Ancestor } from "./folder";

export interface BreadcrumbsProps {
  ancestors: Ancestor[];
  currentName: string;
}
