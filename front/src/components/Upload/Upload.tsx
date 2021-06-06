import React from 'react';
import AppLayout from '../common/AppLayout';
import { StyledCard, StyledTable, Wrapper } from './styles';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { Picture } from '../../store/post/types';
import useInput from '../../lib/hooks/useInput';

interface props {
  uploadRef: React.RefObject<HTMLInputElement>;
  picture: Picture[];
  onClickUpload: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeUpload: (e: any) => void;
  onDragEnd: (result: DropResult) => void;
  onClickShare: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => (content: string) => void;
}

const Upload = ({
  uploadRef,
  picture,
  onClickUpload,
  onChangeUpload,
  onDragEnd,
  onClickShare,
}: props) => {
  const [content, onChangeContent] = useInput('');

  return (
    <AppLayout>
      <Wrapper>
        <div className="left">
          <form encType="multipart/form-data">
            <div>
              <input
                type="file"
                name="file"
                multiple
                hidden
                ref={uploadRef}
                onChange={onChangeUpload}
              />
              <button className="upload-button" onClick={onClickUpload}>
                이미지 또는 동영상 추가
              </button>
            </div>
          </form>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <StyledTable
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {picture?.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={String(item.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <StyledCard
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        >
                          <img
                            src={`http://localhost:3065/${item.src}`}
                            alt={item.src}
                          />
                        </StyledCard>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </StyledTable>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="right">
          <textarea
            cols={70}
            rows={15}
            placeholder="오늘 어떤 일이 있었나요?"
            value={content}
            onChange={onChangeContent}
          />
          <button onClick={(e) => onClickShare(e)(content)}>공유</button>
        </div>
      </Wrapper>
    </AppLayout>
  );
};

export default Upload;
