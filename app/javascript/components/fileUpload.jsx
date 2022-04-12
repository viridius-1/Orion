import React, {useRef} from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import PropTypes from 'prop-types';
import {getDroppedOrSelectedFiles} from 'html5-file-selector';

const FileUpload = (props) => {
  const fileParams = ({meta}) => {
    return {url: `/campaigns/${campaignId}/creatives`}
  }



  const {
    creatives,
    campaignId,
    handleDeleteCreative,
    handleOnFileChange
  } = props;

  const getFilesFromEvent = e => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then(chosenFiles => {
        resolve(
          chosenFiles.map(f => f.fileObject)
        )
      })
    })
  }
  const inputElement = useRef(null);

  const selectFileInput = ({accept, onFiles, files, getFilesFromEvent}) => {
    return (
      <div className="drag-area">
        <div className="icon">
          <i className="fas fa-images"/>
        </div>
        <span className="header">Drag & Drop</span>
        <span className="header">or <span className="button" onClick={() => {
          inputElement.current.click()
        }}>browse</span>
        </span>
        <input
          ref={inputElement}
          style={{display: 'none'}}
          type="file"
          accept={accept}
          multiple
          onChange={e => {
            getFilesFromEvent(e).then(chosenFiles => {
              onFiles(chosenFiles)
            })
          }}
        />
        <span className="support">Supports: Images, Videos, Audio</span>
      </div>
    )
  }

  const getIcon = (creative) => {
    if (creative.filetype === 'image') {
      return <img src={creative.file.url} alt='Unable to load file'/>;
    } else if (creative.filetype === 'video') {
      return <span className='blue'><i className="fas fa-video"/></span>;
    } else if (creative.filetype === 'audio') {
      return <span className='mustard'><i className="fas fa-music"/></span>;
    } else if (creative.filetype === 'document') {
      return <span className='green'><i className="fas fa-file-spreadsheet"/></span>;
    } else {
      return <span className='red' title='Unable to load file'><i className="fas fa-exclamation-triangle"/></span>;
    }
  }

  return (
    <div className='file-upload'>
      <ul className='creatives'>
        {creatives.map((creative, index) => (
          <li key={index} className='file' title={creative.name}>
            <i className="fas fa-times remove-file" onClick={() => handleDeleteCreative(creative.id, index)}/>
            <div className='icon'>
              {getIcon(creative)}
            </div>
            <div className='details'>
              <span>{creative.shortname}</span>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <Dropzone
          onChangeStatus={handleOnFileChange}
          InputComponent={selectFileInput}
          getUploadParams={fileParams}
          getFilesFromEvent={getFilesFromEvent}
          submitButtonDisabled={true}
          canRemove={false}
          accept="text/csv,image/*,audio/*,video/*,application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          maxFiles={5}
          maxSize={50000000}
          inputContext="Drop A File"
          styles={{}}
        />
      </div>
    </div>
  )
};

FileUpload.propTypes = {
  creatives: PropTypes.array.isRequired,
  campaignId: PropTypes.number.isRequired,
  handleDeleteCreative: PropTypes.func.isRequired,
  handleOnFileChange: PropTypes.func.isRequired
}

export default FileUpload;
