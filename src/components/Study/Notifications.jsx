import React, { useRef, useState } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'

function Notifications(props) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const renderIcon = str => {
        // return <i class="fas fa-thumbs-down"></i>
        console.log(str)
        if (str.includes('Completed')) return <i class="fas fa-thumbs-up"></i>
        else if (str.includes('Failed'))
            return <i class="fas fa-thumbs-down"></i>
        else return <i class="fab fa-creative-commons-sampling"></i>
    }

    return (
        <>
            <span
                data-toggle="tooltip"
                data-placement="top"
                title={`New ${props.data.length} notications`}
                class="badge badge-pill badge-info"
                onClick={handleShow}
                style={{ cursor: 'pointer' }}
            >
                {props.data.length}
            </span>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Message</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((notification, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {notification.message} {index + 1}
                                        </td>
                                        <td style={{ alignContent: 'center' }}>
                                            {renderIcon(notification.message)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Notifications
