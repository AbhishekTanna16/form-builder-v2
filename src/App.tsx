import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Preview from "./components/Preview";

import { v4 as uuid } from "uuid";
import type { ElementType, FormElement } from "./types";

function App() {
  const [elements, setElements] = useState<FormElement[]>([]);
  const [isPreview, setIsPreview] = useState(false);

  const handleAdd = (type: ElementType) => {
    const newElement: FormElement = {
      id: uuid(),
      type,
      props:
        type === "header"
          ? { text: "New Header" }
          : type === "button"
          ? { label: "Click Me" }
          : type === "paragraph"
          ? { text: "New paragraph..." }
          : type === "radio"
          ? {
              label: "Radio Group",
              options: ["Option 1", "Option 2"],
              name: "radioGroup",
            }
          : type === "select"
          ? { label: "Select Option", options: ["Option 1", "Option 2"] }
          : type === "textarea"
          ? { label: "Message", placeholder: "Enter long text..." }
          : type === "textfield"
          ? { label: "Text Field", placeholder: "Enter text" }
          : type === "input"
          ? { label: "Input", placeholder: "Enter text..." }
          : type === "table"
          ? { label: "Table", rows: 2, cols: 2 }
          : type === "section"
          ? { label: "Section Title" }
          : type === "file"
          ? { label: "Upload File" }
          : {},
    };
    setElements([...elements, newElement]);
  };

  const handleUpdate = (id: string, props: Record<string, any>) => {
    setElements((els) =>
      els.map((el) => (el.id === id ? { ...el, props } : el))
    );
  };

  const handleDelete = (id: string) => {
    setElements((els) => els.filter((el) => el.id !== id));
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    setElements((els) => {
      const idx = els.findIndex((el) => el.id === id);
      if (idx === -1) return els;

      const newEls = [...els];
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= newEls.length) return els;

      [newEls[idx], newEls[swapIdx]] = [newEls[swapIdx], newEls[idx]];
      return newEls;
    });
  };

  const handleClear = () => setElements([]);
  const handleSave = () => setIsPreview(true);
  const handleEdit = () => setIsPreview(false);

  const handleCopyHtml = () => {
    const html = document.getElementById("preview-form")?.innerHTML || "";
    navigator.clipboard.writeText(html);
    alert("✅ Form HTML copied to clipboard!");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {!isPreview && (
        <div className="w-1/6 border-r bg-white shadow-md">
          <Sidebar
            onAdd={handleAdd}
            onClear={handleClear}
            onSave={handleSave}
          />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex items-start justify-center p-8">
        <div className="w-full min-h-[80vh] bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 shadow-sm">
          {!isPreview ? (
            <Canvas
              elements={elements}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          ) : (
            <Preview
              elements={elements}
              onEdit={handleEdit}
              onCopyHtml={handleCopyHtml}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
