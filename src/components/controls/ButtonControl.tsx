import type { FC } from "react";
import type { FormElement } from "../../types";

interface ButtonControlProps {
  element: FormElement;
  onUpdate: (id: string, props: Record<string, any>) => void;
}

const ButtonControl: FC<ButtonControlProps> = ({ element, onUpdate }) => {
  return (
    <div>
      <input
        type="text"
        value={element.props.label}
        onChange={(e) =>
          onUpdate(element.id, { ...element.props, label: e.target.value })
        }
        className="border p-1 rounded w-full mb-2"
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        {element.props.label}
      </button>
    </div>
  );
};

export default ButtonControl;
