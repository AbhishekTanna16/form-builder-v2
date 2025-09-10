export type ElementType =
  | "header"
  | "paragraph"
  | "button"
  | "input"
  | "textfield"
  | "textarea"
  | "radio"
  | "select"
  | "table"
  | "section"
  | "file";

export interface FormElement {
  id: string;
  type: ElementType;
  props: Record<string, any>;
}
