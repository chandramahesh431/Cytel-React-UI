import React, { useState, useRef, useEffect } from 'react'
import { Navbar, Overlay, Popover, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as signalR from '@microsoft/signalr'
import Notifications from './Study/Notifications'
//import * as signalR from '@aspnet/signalr';

const CytelLogo = require('../assets/images/Cytel-Logo.png').default

function Header() {
    const [show, setShow] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [target, setTarget] = useState(null)
    const [toolTip, setToolTip] = useState()
    const userIcon = useRef(null)

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:44391/notifications')
            .build()
        connection.start().then(function() {
            console.log('SignalR connected:')
        })
        connection.start().catch(function(err) {
            return console.error('SignalR not connected:', err.toString())
        })
        connection.on('Send', message => {
            console.log('length', notifications)
            setNotifications(prevState => [...prevState, ...message])
            console.log(message)
        })
        console.log('connection', connection)
    }, [])

    const handleClick = event => {
        setShow(!show)
        setTarget(event.target)
    }

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home" className="no-padding">
                    <img className="logo" src={CytelLogo} alt="Logo" />
                </Navbar.Brand>

                <Navbar.Collapse className="justify-content-end">
                    <Notifications
                        title="Notifications"
                        data={notifications}
                    ></Notifications>
                    <FontAwesomeIcon className="user-icon fa-lg" icon="bell" />
                    <div ref={userIcon}>
                        <FontAwesomeIcon
                            className="user-icon fa-lg"
                            onClick={handleClick}
                            icon="user"
                        />
                        <Overlay
                            show={show}
                            target={target}
                            placement="bottom"
                            container={userIcon.current}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained">
                                <Popover.Title as="h3">User Name</Popover.Title>
                                <Popover.Content>
                                    <strong>Holy guacamole!</strong>
                                    Check this info.........
                                </Popover.Content>
                            </Popover>
                        </Overlay>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
