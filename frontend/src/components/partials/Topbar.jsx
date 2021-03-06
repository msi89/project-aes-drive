import { navigate } from '@reach/router'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { authUserState } from '../../store'
import useAuthUser from '../../store/actions/auth'
import Storage from '../../store/local'
import Dropdown from '../controls/Dropdown'
import { MainContext } from '../layouts/Main'


const Topbar = () => {

    const authUser = useRecoilValue(authUserState)
    const { logout } = useAuthUser()

    const { settingsModal } = React.useContext(MainContext)

    const username = React.useMemo(() => {
        return authUser?.first_name || authUser?.last_name
    }, [authUser])

    const usfirst = React.useMemo(() => {
        const usr = authUser?.first_name || authUser?.last_name
        if (usr?.length > 0) {
            return username[0].toUpperCase()
        }
        return usr
    }, [authUser])

    const handleLogout = () => {
        Storage.reset()
        navigate('/login')
    }

    return <div className="topbar">
        <div className="search-box">
            <span className="material-icons">
                search
            </span>
            <input type="text" placeholder="поиск файлов..." />
        </div>
        <div className="nav">
            <a href="" className="btn btn-icon">
                <span className="material-icons">
                    notifications
                </span>
            </a>
            <button onClick={() => settingsModal.current.open()} className="btn btn-icon">
                <span className="material-icons">
                    settings
                </span>
            </button>

            <Dropdown>
                <Dropdown.Button className="profile">
                    <span>{username}</span>
                    <div className="shape-rounded center">{usfirst}</div>
                </Dropdown.Button>
                <Dropdown.Content className="dropdown">
                    <Dropdown.Item className="dropdown-item flex" onClick={handleLogout}>
                        <span style={{ marginLeft: '5px', fontSize: '13px' }}>Выити</span>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>


            {/* <button className="btn btn-icon">
                <span className="material-icons">
                    menu_open
                </span>
            </button> */}

        </div>
    </div>
}

export default Topbar