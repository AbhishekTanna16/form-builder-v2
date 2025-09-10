import { useState } from "react";
import type { FC } from "react";
import type { FormElement } from "../types";
import { Edit2, ArrowUp, ArrowDown, Trash2, CheckCircle } from "lucide-react";

interface CanvasProps {
  elements: FormElement[];
  onUpdate: (id: string, props: Record<string, any>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
}

const Canvas: FC<CanvasProps> = ({ elements, onUpdate, onDelete, onMove }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {elements.map((el, idx) => {
        const isEditing = editingId === el.id;

        return (
          <div
            key={el.id}
            className="p-4 border rounded-md shadow-sm relative group bg-white hover:shadow-md transition"
          >
            {/* Display Mode */}
            {!isEditing && (
              <div>
                {el.type === "header" && (
                  <h2 className="text-xl font-bold">{el.props.text}</h2>
                )}
                {el.type === "button" && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    {el.props.label}
                  </button>
                )}
                {el.type === "input" && (
                  <div>
                    <label className="block mb-1">{el.props.label}</label>
                    <input
                      type="text"
                      placeholder={el.props.placeholder}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </div>
                )}
                {el.type === "textfield" && (
                  <div>
                    <label className="block mb-1">{el.props.label}</label>
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                    />
                  </div>
                )}
                {el.type === "textarea" && (
                  <div>
                    <label className="block mb-1">{el.props.label}</label>
                    <textarea
                      placeholder={el.props.placeholder}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </div>
                )}
                {el.type === "radio" && (
                  <div className="flex flex-col gap-1">
                    <label className="block mb-1">{el.props.label}</label>
                    {(el.props.options || ["Option 1", "Option 2"]).map(
                      (opt: string, i: number) => (
                        <label key={i} className="flex items-center gap-2">
                          <input type="radio" name={el.id} />
                          {opt}
                        </label>
                      )
                    )}
                  </div>
                )}
                {el.type === "select" && (
                  <div>
                    <label className="block mb-1">{el.props.label}</label>
                    <select className="border rounded px-2 py-1 w-full">
                      {(el.props.options || ["Option 1", "Option 2"]).map(
                        (opt: string, i: number) => (
                          <option key={i}>{opt}</option>
                        )
                      )}
                    </select>
                  </div>
                )}
                {el.type === "file" && (
                  <div>
                    <label className="block mb-1">{el.props.label}</label>
                    <input
                      type="file"
                      className="border px-2 py-1 rounded w-full"
                    />
                  </div>
                )}

                {el.type === "section" && (
                  <div className="p-4 border rounded bg-gray-50">
                    <h4 className="font-bold mb-2">{el.props.label}</h4>
                    <div className="text-sm text-gray-600">
                      Section content goes here...
                    </div>
                  </div>
                )}

                {el.type === "table" && (
                  <div>
                    <label className="block mb-1">{el.props.label}</label>
                    <table className="border border-gray-300 w-full text-sm">
                      <tbody>
                        {Array.from({ length: el.props.rows }).map((_, r) => (
                          <tr key={r}>
                            {Array.from({ length: el.props.cols }).map(
                              (_, c) => (
                                <td key={c} className="border px-2 py-1">
                                  Cell {r + 1}-{c + 1}
                                </td>
                              )
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Edit Mode */}
            {isEditing && (
              <div className="space-y-2">
                {el.type === "header" && (
                  <input
                    type="text"
                    value={el.props.text}
                    onChange={(e) =>
                      onUpdate(el.id, { ...el.props, text: e.target.value })
                    }
                    className="text-xl font-bold border px-2 py-1 w-full"
                  />
                )}
                {el.type === "button" && (
                  <input
                    type="text"
                    value={el.props.label}
                    onChange={(e) =>
                      onUpdate(el.id, { ...el.props, label: e.target.value })
                    }
                    className="px-4 py-2 border rounded text-center w-full"
                  />
                )}
                {el.type === "input" && (
                  <>
                    <input
                      type="text"
                      value={el.props.label || ""}
                      onChange={(e) =>
                        onUpdate(el.id, { ...el.props, label: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                      placeholder="Input label"
                    />
                    <input
                      type="text"
                      value={el.props.placeholder || ""}
                      onChange={(e) =>
                        onUpdate(el.id, {
                          ...el.props,
                          placeholder: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                      placeholder="Input placeholder"
                    />
                  </>
                )}
                {el.type === "textfield" && (
                  <input
                    type="text"
                    value={el.props.label || ""}
                    onChange={(e) =>
                      onUpdate(el.id, { ...el.props, label: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                    placeholder="Text field label"
                  />
                )}
                {el.type === "textarea" && (
                  <>
                    <input
                      type="text"
                      value={el.props.label || ""}
                      onChange={(e) =>
                        onUpdate(el.id, { ...el.props, label: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                      placeholder="Textarea label"
                    />
                    <input
                      type="text"
                      value={el.props.placeholder || ""}
                      onChange={(e) =>
                        onUpdate(el.id, {
                          ...el.props,
                          placeholder: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                      placeholder="Textarea placeholder"
                    />
                  </>
                )}
                {el.type === "radio" && (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={el.props.label || ""}
                      onChange={(e) =>
                        onUpdate(el.id, { ...el.props, label: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                      placeholder="Radio group label"
                    />
                    {(el.props.options || ["Option 1", "Option 2"]).map(
                      (opt: string, i: number) => (
                        <input
                          key={i}
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...(el.props.options || [])];
                            newOpts[i] = e.target.value;
                            onUpdate(el.id, { ...el.props, options: newOpts });
                          }}
                          className="border px-2 py-1 rounded"
                        />
                      )
                    )}
                  </div>
                )}
                {el.type === "select" && (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={el.props.label || ""}
                      onChange={(e) =>
                        onUpdate(el.id, { ...el.props, label: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                      placeholder="Select label"
                    />
                    {(el.props.options || ["Option 1", "Option 2"]).map(
                      (opt: string, i: number) => (
                        <input
                          key={i}
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...(el.props.options || [])];
                            newOpts[i] = e.target.value;
                            onUpdate(el.id, { ...el.props, options: newOpts });
                          }}
                          className="border px-2 py-1 rounded"
                        />
                      )
                    )}
                  </div>
                )}

                {el.type === "file" && (
                  <input
                    type="text"
                    value={el.props.label}
                    onChange={(e) =>
                      onUpdate(el.id, { ...el.props, label: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                    placeholder="File upload label"
                  />
                )}

                {el.type === "section" && (
                  <input
                    type="text"
                    value={el.props.label}
                    onChange={(e) =>
                      onUpdate(el.id, { ...el.props, label: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                    placeholder="Section title"
                  />
                )}

                {el.type === "table" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={el.props.label}
                      onChange={(e) =>
                        onUpdate(el.id, { ...el.props, label: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                      placeholder="Table label"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={el.props.rows}
                        onChange={(e) =>
                          onUpdate(el.id, {
                            ...el.props,
                            rows: Number(e.target.value),
                          })
                        }
                        className="border px-2 py-1 rounded w-1/2"
                        placeholder="Rows"
                        min={1}
                      />
                      <input
                        type="number"
                        value={el.props.cols}
                        onChange={(e) =>
                          onUpdate(el.id, {
                            ...el.props,
                            cols: Number(e.target.value),
                          })
                        }
                        className="border px-2 py-1 rounded w-1/2"
                        placeholder="Cols"
                        min={1}
                      />
                    </div>
                  </div>
                )}

                {/* Save button */}
                <button
                  onClick={() => handleSave()}
                  className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <CheckCircle size={16} />
                  Save
                </button>
              </div>
            )}

            {/* Hover Controls */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => setEditingId(el.id)}
                className="p-1 bg-yellow-400 rounded hover:bg-yellow-500"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onMove(el.id, "up")}
                disabled={idx === 0}
                className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                title="Move Up"
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={() => onMove(el.id, "down")}
                disabled={idx === elements.length - 1}
                className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                title="Move Down"
              >
                <ArrowDown size={16} />
              </button>
              <button
                onClick={() => onDelete(el.id)}
                className="p-1 bg-red-500 rounded hover:bg-red-600 text-white"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;
