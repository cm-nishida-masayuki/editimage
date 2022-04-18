import React, { ChangeEvent, FC, MouseEvent, useState } from "react";
import { Rect } from "./components/Rect";
import { ObjectProps } from "./types/Props";

type ClientPoint = {
  clientX: number;
  clientY: number;
};

type State = {
  objects: Array<ObjectProps>;
  inDraw: boolean;
  backgroudImageUrl?: string;
};

export const App: FC = () => {
  const svgRef: React.RefObject<SVGSVGElement> = React.createRef();
  const [state, setState] = useState<State>({
    objects: [],
    inDraw: false,
    backgroudImageUrl: undefined,
  });

  const getCoords = ({ clientX, clientY }: ClientPoint) => {
    const { top, left } = svgRef.current!.getBoundingClientRect();
    return { x: clientX - left, y: clientY - top };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (state.inDraw) {
      const { x: xEnd, y: yEnd } = getCoords(e);

      setState((state) => {
        if (state.objects) {
          const lastObject = state.objects.slice(-1)[0];

          const newObject = {
            ...lastObject,
            xEnd: xEnd,
            yEnd: yEnd,
          };

          const newState = {
            ...state,
            objects: [...state.objects.slice(0, -1), newObject],
          };
          return newState;
        }
        return state;
      });
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    // const { shiftKey } = e;
    const { x: xStart, y: yStart } = getCoords(e);

    const obj: ObjectProps = {
      id: Date.now(),
      bg: `rgb(${[
        Math.random() * 255,
        Math.random() * 255,
        Math.random() * 255,
      ]})`,
      xStart,
      yStart,
      xEnd: xStart,
      yEnd: yStart,
    };

    setState((state) => {
      const newState = {
        ...state,
        inDraw: true,
        objects: [...state.objects, obj],
      };
      return newState;
    });
  };

  const onMouseUp = (e: MouseEvent) => {
    setState((state) => {
      return {
        ...state,
        inDraw: false,
      };
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    const reader = new FileReader();

    reader.onload = (e) => {
      setState((state) => {
        return {
          ...state,
          backgroudImageUrl: e.target?.result?.toString(),
        };
      });
    };

    reader.readAsDataURL(file);
  };

  const editorStyle = {
    width: "900px",
    height: "500px",
    margin: "0 auto",
  };

  const canvasStyle = {
    backgroundColor: "#eee",
    display: "block",
    width: "100%",
    height: "500px",
  };

  return (
    <div style={editorStyle}>
      <button>aaa</button>
      <input
        type="file"
        accept="image/*"
        multiple={false}
        onChange={onChange}
      />
      <div>
        <svg
          style={canvasStyle}
          ref={svgRef}
          onMouseMove={onMouseMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <image href={state.backgroudImageUrl} />
          {state.objects.map((obj) => (
            <Rect obj={obj} />
          ))}
        </svg>
      </div>
    </div>
  );
};
