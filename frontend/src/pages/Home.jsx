import React from 'react'
import MainLayout from '../components/layouts/Main'
import FileTableRow from '../components/FileTableRow'
import FolderTableRow from '../components/FolderTableRow'
import Toolbar from '../components/partials/Toolbar'

const folders = [
    {
        "id": 1,
        "uuid": '3ee-1',
        "name": 'Programming',
        'created_at': '10/08/2012'
    }, {
        "id": 2,
        "uuid": '3ee-2',
        "name": 'Documents',
        'created_at': '10/08/2012'
    },
]
const files = [
    {
        "id": 1,
        "uuid": '3ee-3',
        "name": 'doc.xls',
        "size": '239 Ko',
        'created_at': '10/08/2012'
    },
    {
        "id": 2,
        "uuid": '3ee-4',
        "name": 'aorrkk.doc',
        "size": '1025 Ko',
        'created_at': '02/11/2021'
    },
    {
        "id": 3,
        "uuid": '3ee-5',
        "name": 'aorrkk.ppt',
        "size": '1025 Ko',
        'is_private': true,
        'created_at': '02/11/2021'
    },
    {
        "id": 4,
        "uuid": '3ee-6',
        "name": 'Je me la vie.pdf',
        "size": '1025 Ko',
        'created_at': '02/11/2021'
    }
]
const Home = () => {

    return <MainLayout>

        <div className="container">
            <Toolbar />
            <table className="table">
                <thead>
                    <th></th>
                    <th>Name</th>
                    <th>Sharing</th>
                    <th>Last modified</th>
                    <th>Size</th>
                    <th></th>
                </thead>
                <tbody>
                    {folders.map(folder => <FolderTableRow key={folder.id} folder={folder} />)}
                    {files.map(file => <FileTableRow key={file.id} file={file} />)}
                </tbody>
            </table>
        </div>
    </MainLayout>
}

export default Home