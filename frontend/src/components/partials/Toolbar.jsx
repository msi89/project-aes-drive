import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDriveState } from '../../store'
import Icon from '../controls/Icon'
import Dropdown from '../controls/Dropdown'
import Modal from '../controls/Modal'
import Button from '../controls/Button'
import { MainContext } from '../layouts/Main'
import useDrives, { useCreateFolder } from '../../store/actions/drives'

const Toolbar = () => {

    const selectedDrive = useRecoilValue(selectedDriveState)
    const folderModal = React.useRef()
    const inputFile = React.useRef()
    const [newFolder, setNewFolder] = React.useState("")
    const { uploadModal, setDropFiles } = React.useContext(MainContext)
    const { createFolder, loading } = useCreateFolder()
    const { currentFolder, getFolder } = useDrives()

    const handleFolderChange = (e) => {
        setNewFolder(e.target.value)
    }

    const HandleUploadFile = (e) => {
        setDropFiles(Array.from(e.target.files))
        uploadModal.current.open()
    }

    const handleSaveFolder = async () => {
        await createFolder({
            name: newFolder,
            parent: currentFolder.id
        })
        folderModal.current.close()
        await getFolder(currentFolder.id)
        setNewFolder('')
    }

    return <>
        <input type="file" ref={inputFile} multiple
            style={{ visibility: 'hidden', position: 'absolute' }}
            onChange={HandleUploadFile} />
        <div className="toolbar flex">

            <Dropdown>
                <Dropdown.Button className="btn">
                    <Icon name="plus" className="text-primary" />
                    <span style={{ margin: '0 2px' }}>Добавить</span>
                    <Icon name="arrow_down" size="10" fill="#555" />
                </Dropdown.Button>
                <Dropdown.Content className="dropdown">
                    <Dropdown.Item className="dropdown-item flex" onClick={() => folderModal.current.open()}>
                        <Icon name="folder" fill="#92CEFF" size="18" />
                        <span style={{ marginLeft: '5px', fontSize: '13px' }}>Папка</span>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>

            <button className="btn" onClick={() => inputFile.current.click()}>
                <Icon name="upload" className="text-primary" size={18} />
                <span style={{ margin: '0 2px' }}>Загрузить</span>
            </button>
            {selectedDrive?.id && <div className="flex">
                {/* <button className="btn">
                    <Icon name="download" className="text-primary" size={18} />
                    <span style={{ margin: '0 2px' }}>Скачать</span>
                </button>
                <button className="btn">
                    <Icon name="lock" className="text-primary" size={18} />
                    <span style={{ margin: '0 2px' }}>Зашифровать</span>
                </button>
                <button className="btn">
                    <Icon name="unlock" className="text-primary" size={18} />
                    <span style={{ margin: '0 2px' }}>Расшифровать</span>
                </button>
                <button className="btn">
                    <Icon name="trash" className="text-primary" size={18} />
                    <span style={{ margin: '0 2px' }}>Удалить</span>
                </button> */}
            </div>}

        </div>
        <Modal refId={folderModal} width={300}>
            <Modal.Header>
                <div>Папка</div>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col" style={{ margin: "20px" }}>
                    <input type="text" className="input"
                        placeholder="Введите название вашей папки"
                        value={newFolder}
                        onChange={handleFolderChange}
                    />
                    <div className="flex justify-end">
                        <Button className="btn btn-primary flex btn-loader "
                            disabled={newFolder.length === 0} style={{ margin: '15px 0' }}
                            loading={loading}
                            onClick={handleSaveFolder}>
                            Добавить
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default Toolbar