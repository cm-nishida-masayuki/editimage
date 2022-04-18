import { VFC } from "react";
import { ObjectProps } from "../types/Props";

export type Props = {
  obj: ObjectProps;
};

// Rect + RectPresenter にリファクタリングする
export const Rect: VFC<Props> = ({
  obj: { xStart, xEnd, yStart, yEnd, bg },
}) => {
  let x, y, w, h: number;

  if (xStart < xEnd) {
    x = xStart;
    w = xEnd - xStart;
  } else {
    x = xEnd;
    w = xStart - xEnd;
  }

  if (yStart < yEnd) {
    y = yStart;
    h = yEnd - yStart;
  } else {
    y = yEnd;
    h = yStart - yEnd;
  }

  return <rect x={x} y={y} width={w} height={h} fill={bg} />;
};
