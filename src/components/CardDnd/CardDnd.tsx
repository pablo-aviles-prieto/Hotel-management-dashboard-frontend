import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

interface RoomTypes {
  id: number;
  photo: string;
  roomNumber: string;
  roomName: string;
  bedType: string;
  roomFloor: string;
  facilities: string[];
  ratePerNight: number;
  status: string;
  offerPrice: null;
}

interface ICardDnd {
  id: number;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  data: RoomTypes;
  renderData: (
    data: RoomTypes,
    ref: React.RefObject<HTMLElement>,
    dragOpacity: 0 | 1,
    handlerId: any
  ) => JSX.Element;
}

export const CardDnd: React.FC<ICardDnd> = ({
  id,
  index,
  moveCard,
  data,
  renderData,
}) => {
  const ref = useRef<HTMLElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex: number = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect: DOMRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop() {
      console.log(`Element with ID ${id} dropped`);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    options: {
      dropEffect: 'move',
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const dragOpacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return renderData(data, ref, dragOpacity, handlerId);
};
