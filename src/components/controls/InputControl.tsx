import type { FC } from "react";
import type { FormElement } from "../../types";

interface InputControlProps {
  element: FormElement;
  onUpdate: (id: string, props: Record<string, any>) => void;
}

const InputControl: FC<InputControlProps> = ({ element, onUpdate }) => {
  return (
    <div>
      <input
        type="text"
        value={element.props.placeholder}
        onChange={(e) =>
          onUpdate(element.id, {
            ...element.props,
            placeholder: e.target.value,
          })
        }
        className="border p-1 rounded w-full mb-2"
      />
      <input
        type="text"
        placeholder={element.props.placeholder}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default InputControl;
