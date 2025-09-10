import type { FC } from "react";
import type { FormElement } from "../types";

interface PreviewProps {
  elements: FormElement[];
  onEdit: () => void;
  onCopyHtml: () => void;
}

const Preview: FC<PreviewProps> = ({ elements, onEdit, onCopyHtml }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Form Preview</h2>

      <div id="preview-form" className="space-y-4">
        {elements.map((el) => (
          <div key={el.id} className="flex flex-col gap-2">
            {el.type === "header" && (
              <h3 className="text-xl font-semibold text-gray-900">
                {el.props.text}
              </h3>
            )}

            {el.type === "textfield" && (
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  {el.props.label || "Label"}
                </label>
                <input
                  type="text"
                  placeholder={el.props.placeholder}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-violet-400"
                />
              </div>
            )}

            {el.type === "input" && (
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  {el.props.label || "Label"}
                </label>
                <input
                  type="text"
                  placeholder={el.props.placeholder}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-violet-400"
                />
              </div>
            )}

            {el.type === "textarea" && (
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  {el.props.label || "Label"}
                </label>
                <textarea
                  placeholder={el.props.placeholder}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-violet-400"
                  rows={4}
                />
              </div>
            )}

            {el.type === "radio" && (
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  {el.props.label || "Label"}
                </label>
                <div className="flex flex-col mt-1 gap-1">
                  {(el.props.options || []).map((opt: string, idx: number) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={el.props.name}
                        className="accent-violet-500"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {el.type === "select" && (
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  {el.props.label || "Label"}
                </label>
                <select className="border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-violet-400">
                  {(el.props.options || []).map((opt: string, idx: number) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              </div>
            )}

            {el.type === "file" && (
              <div className="flex flex-col">
                <label className="font-medium">{el.props.label || "Upload File"}</label>
                <input
                  type="file"
                  className="border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
            )}

            {el.type === "section" && (
              <div className="p-4 border rounded bg-gray-50 flex flex-col gap-2">
                <label className="font-bold text-gray-800">
                  {el.props.label || "Section"}
                </label>
                {/* Make section editable */}
                <textarea
                  className="border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-violet-400"
                  placeholder="Enter section content..."
                  rows={3}
                />
              </div>
            )}

            {el.type === "table" && (
              <div>
                <label className="font-medium">{el.props.label || "Table"}</label>
                <table className="border border-gray-300 w-full mt-1 text-sm">
                  <tbody>
                    {Array.from({ length: el.props.rows || 2 }).map((_, r) => (
                      <tr key={r}>
                        {Array.from({ length: el.props.cols || 2 }).map((_, c) => (
                          <td key={c} className="border px-2 py-1">
                            {/* Make table cells editable */}
                            <input
                              type="text"
                              className="w-full border-none focus:ring-0 px-1 py-0.5"
                              placeholder={`Cell ${r + 1}-${c + 1}`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {el.type === "button" && (
              <button className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition w-fit">
                {el.props.label || "Submit"}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          ✏️ Edit Form
        </button>
        <button
          onClick={onCopyHtml}
          className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition"
        >
          📋 Copy HTML
        </button>
      </div>
    </div>
  );
};

export default Preview;
