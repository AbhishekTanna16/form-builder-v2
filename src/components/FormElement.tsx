import type { FC } from "react";
import type { FormElement } from "../types";

interface Props {
  element: FormElement;
  preview?: boolean;
}

const FormElementView: FC<Props> = ({ element, preview }) => {
  const { type, props } = element;

  if (type === "header")
    return <h2 className="text-2xl font-bold">{props.text}</h2>;

  if (type === "button")
    return <button className="btn-blue">{props.label}</button>;

  if (type === "input")
    return (
      <input
        type="text"
        placeholder={props.placeholder}
        className="border px-3 py-2 rounded w-full"
        disabled={preview}
      />
    );

  if (type === "textfield")
    return (
      <div>
        <label className="block mb-1">{props.label}</label>
        <input
          type="text"
          placeholder={props.placeholder}
          className="border px-3 py-2 rounded w-full"
          disabled={preview}
        />
      </div>
    );

  if (type === "textarea")
    return (
      <textarea
        placeholder={props.placeholder}
        className="border px-3 py-2 rounded w-full"
        disabled={preview}
      />
    );

  if (type === "radio")
    return (
      <div>
        {props.options.map((opt: string, idx: number) => (
          <label key={idx} className="flex items-center gap-2">
            <input
              type="radio"
              name={props.name}
              disabled={preview}
              className="accent-blue-500"
            />
            {opt}
          </label>
        ))}
      </div>
    );

  if (type === "select")
    return (
      <select className="border px-3 py-2 rounded w-full" disabled={preview}>
        {props.options.map((opt: string, idx: number) => (
          <option key={idx}>{opt}</option>
        ))}
      </select>
    );

  return null;
};

export default FormElementView;
