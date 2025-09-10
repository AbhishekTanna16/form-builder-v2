import type { FC } from "react";
import type { ElementType } from "../types";
import {
  Heading,
  Type,
  MousePointerClick,
  TextCursorInput,
  List,
  ListChecks,
  SquarePen,
  Eraser,
  Save,
  Table,
  FolderOpen,
  LayoutPanelLeft,
} from "lucide-react";

interface SidebarProps {
  onAdd: (type: ElementType) => void;
  onClear: () => void;
  onSave: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onAdd, onClear, onSave }) => {
  const components = [
    { type: "header", label: "Header", icon: Heading },
    { type: "paragraph", label: "Paragraph", icon: Type },
    { type: "button", label: "Button", icon: MousePointerClick },
    { type: "input", label: "Input", icon: TextCursorInput },
    { type: "textfield", label: "Text Field", icon: Type },
    { type: "textarea", label: "Text Area", icon: SquarePen },
    { type: "radio", label: "Radio Group", icon: ListChecks },
    { type: "select", label: "Select", icon: List },
    { type: "file", label: "File Upload", icon: FolderOpen },
    { type: "section", label: "Section", icon: LayoutPanelLeft },
    { type: "table", label: "Table", icon: Table },
  ];

  return (
    <div className="p-6 flex flex-col gap-4 h-full bg-white">
      <h2 className="text-xl font-bold mb-2">Form Builder</h2>

      {/* Components List */}
      <div className="flex flex-col divide-y border rounded-md overflow-hidden shadow-sm">
        {components.map(({ type, label, icon: Icon }) => (
          <button
          
            key={type}
            onClick={() => onAdd(type as ElementType)}
            className="flex items-center gap-3 px-4 py-2 hover:bg-violet-100 text-left transition"
          >
            <Icon size={18} className="text-violet-600" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={onClear}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow"
        >
          <Eraser size={16} />
          Clear
        </button>
        <button
          onClick={onSave}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow"
        >
          <Save size={16} />
          Save
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
