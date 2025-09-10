import type { FC } from "react";
import type { FormElement } from "../../types";

interface HeaderControlProps {
  element: FormElement;
  onUpdate: (id: string, props: Record<string, any>) => void;
}

const HeaderControl: FC<HeaderControlProps> = ({ element, onUpdate }) => {
  return (
    <div>
      <input
        type="text"
        value={element.props.text}
        onChange={(e) =>
          onUpdate(element.id, { ...element.props, text: e.target.value })
        }
        className="border p-1 rounded w-full mb-2"
      />
      <h3 className="text-xl font-bold">{element.props.text}</h3>
    </div>
  );
};

export default HeaderControl;
