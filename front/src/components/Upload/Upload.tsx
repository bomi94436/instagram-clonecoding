import React, { useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import { StyledCard, StyledTable, Wrapper } from './styles';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { UploadedPicture } from '../../store/post/types';
import useInput from '../../lib/hooks/useInput';
import {
  BsChevronExpand,
  BsDashCircle,
  BsFillCameraVideoFill,
  BsImageFill,
} from 'react-icons/all';

interface props {
  uploadRef: React.RefObject<HTMLInputElement>;
  pictures: UploadedPicture[];
  onClickUpload: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeUpload: (e: any) => void;
  onDragEnd: (result: DropResult) => void;
  onClickShare: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => (content: string) => void;
  onClickRemovePicture: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => (pictureId: number) => void;
}

const Upload = ({
  uploadRef,
  pictures,
  onClickUpload,
  onChangeUpload,
  onDragEnd,
  onClickShare,
  onClickRemovePicture,
}: props) => {
  const [content, onChangeContent] = useInput('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                  {pictures?.map((picture, index) => (
                    <Draggable
                      key={picture.id}
                      draggableId={String(picture.id)}
                      index={index}
                      disableInteractiveElementBlocking
                    >
                      {(provided, snapshot) => (
                        <StyledCard
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        >
                          <button>
                            <BsChevronExpand />
                          </button>

                          {picture.type === 'image' ? (
                            <div className="picture">
                              <img
                                src={`http://localhost:3065/${picture.src}`}
                                alt={picture.src}
                              />
                              <BsImageFill className="icon" />
                            </div>
                          ) : (
                            <div className="picture">
                              <video
                                disablePictureInPicture
                                preload="metadata"
                                src={`http://localhost:3065/${picture.src}#t=0.5`}
                                controlsList="nodownload"
                              />
                              <BsFillCameraVideoFill className="icon" />
                            </div>
                          )}

                          <button
                            onClick={(e) => onClickRemovePicture(e)(picture.id)}
                          >
                            <BsDashCircle />
                          </button>
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
