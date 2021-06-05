import React from 'react';
import AppLayout from '../common/AppLayout';
import { StyledCard, StyledTable, Wrapper } from './styles';
import { UserInfo } from '../../store/auth/types';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { UploadedContent } from '../../store/post/types';

interface props {
  user: UserInfo;
  uploadRef: React.RefObject<HTMLInputElement>;
  uploaded: UploadedContent[];
  onClickUpload: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeUpload: (e: any) => void;
  onDragEnd: (result: DropResult) => void;
}

const Upload = ({
  user,
  uploadRef,
  uploaded,
  onClickUpload,
  onChangeUpload,
  onDragEnd,
}: props) => {
  return (
    <AppLayout>
      <Wrapper>
        <div>
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
                  {uploaded?.map((item, index) => (
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
      </Wrapper>
    </AppLayout>
  );
};

export default Upload;
