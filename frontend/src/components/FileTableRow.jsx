import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedDriveState } from '../store'
import Icon from './controls/Icon'
import Dropdown from './controls/Dropdown'
import { downloadURI, getFileIcon } from '../helpers'
import useDocs from '../store/actions/docs'
import Storage from '../store/local'


const FileTableRow = ({ file }) => {

    const { downloadDoc, deleteDoc, updateDoc } = useDocs()
    const [selectedDrive, setSelectedDrive] = useRecoilState(selectedDriveState)

    const handleClick = () => {
        if (selectedDrive && selectedDrive.uuid === file.uuid)
            setSelectedDrive()
        else {
            setSelectedDrive(file)
        }
    }

    const handleDownload = async () => {
        await downloadDoc(file)
    }

    const handleDelete = async () => {
        await deleteDoc(file)
    }

    const handleEncrypt = async () => {
        await updateDoc(file, {
            encrypted: true,
            password: Storage.get('password')
        })
    }

    const handleDecrypt = async () => {
        await updateDoc(file, {
            decrypted: true,
            password: Storage.get('password')
        })
    }

    return <tr key={file.id} onClick={handleClick} className={file?.uuid === selectedDrive?.uuid ? 'selected' : ''}>
        <td></td>
        <td>
            <div className="flex items-center  cursor-pointer">
                <Icon name={getFileIcon(file.name)} size="18" />
                <span style={{ marginLeft: '10px' }}>
                    <a href={file.url}>{file.name}</a>
                </span>
            </div>
        </td>
        <td>
            {file.is_private &&
                <span className="material-icons" style={{ color: '#777' }}>
                    lock
                </span>
            }
        </td>
        <td>{file.created_at}</td>
        <td>{file.size || null} ko</td>
        <td>
            <Dropdown>
                <Dropdown.Button className="btn">
                    <span className="material-icons" style={{ color: '#555' }}>
                        more_horiz
                    </span>
                </Dropdown.Button>
                <Dropdown.Content className="dropdown right-10">
                    <Dropdown.Item className="dropdown-item flex" onClick={handleDownload}>
                        <Icon name="download" className="text-primary" size={18} />
                        <span style={{ margin: '0 2px' }}>Скачать</span>
                    </Dropdown.Item>

                    {file.is_private ?
                        <Dropdown.Item className="dropdown-item flex" onClick={handleEncrypt}>
                            <Icon name="unlock" className="text-primary" size={18} />
                            <span style={{ margin: '0 2px' }}>Расшифровать</span>
                        </Dropdown.Item> : <Dropdown.Item className="dropdown-item flex"
                            onClick={handleDecrypt}>
                            <Icon name="lock" className="text-primary" size={18} />
                            <span style={{ margin: '0 2px' }}>Зашифровать</span>
                        </Dropdown.Item>}
                    <Dropdown.Item className="dropdown-item flex" onClick={handleDelete}>
                        <Icon name="trash" className="text-primary" size={18} />
                        <span style={{ margin: '0 2px' }}>Удалить</span>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </td>
    </tr>
}

export default FileTableRow
