import React, { useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { updateUser } from '../services/UserService';
import { loginUser } from '../services/UserService'; // Importing loginUser from UserService
import AuthService from '../services/AuthService';

const UserProfile = () => {
    const user = AuthService.getUser();
    const [editableFields, setEditableFields] = useState({
        name: false,
        email: false,
        address: false,
        phoneNumber: false,
        oldPassword: false,
        newPassword: false
    });
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        oldPassword: '',
        newPassword: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [previousData, setPreviousData] = useState({});

    const handleEdit = (field) => {
        setEditableFields({ ...editableFields, [field]: true });
        setPreviousData({ ...previousData, [field]: formData[field] });
    };

    const handleCancelEdit = (field) => {
        setEditableFields({ ...editableFields, [field]: false });
        setFormData({ ...formData, [field]: previousData[field] });
    };

    const handleUpdate = async (field) => {
        try {
            const updatedData = { [field]: formData[field] };
            await updateUser(user.id, updatedData);
            setEditableFields({ ...editableFields, [field]: false });
        } catch (error) {
            setModalMessage('Error updating user details. Please try again later.');
            setShowModal(true);
            setFormData({ ...formData, [field]: previousData[field] });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = async () => {
        try {
            await loginUser({ email: user.email, password: formData.oldPassword }); // Login to verify old password
            await updateUser(user.id, { password: formData.newPassword }); // Update the password
            setEditableFields({ ...editableFields, oldPassword: false, newPassword: false });
        } catch (error) {
            setModalMessage('Incorrect old password. Please try again.');
            setShowModal(true);
            setFormData({ ...formData, oldPassword: '', newPassword: '' });
        }
    };

    return (
        <Card className="p-4">
            <Card.Title>User Profile</Card.Title>
            <hr className="my-4" />
            <Form>
                <Form.Group controlId="formBasicName" className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    {editableFields.name ? (
                        <div className="d-flex">
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                            <Button variant="success" onClick={() => handleUpdate('name')} className="ms-2">Update</Button>
                            <Button variant="secondary" onClick={() => handleCancelEdit('name')} className="ms-2">Cancel</Button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <Form.Control type="text" name="name" value={formData.name} readOnly />
                            <Button variant="outline-primary" onClick={() => handleEdit('name')} className="ms-2">Edit</Button>
                        </div>
                    )}
                </Form.Group>
                

                <Form.Group controlId="formBasicEmail" className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    {editableFields.email ? (
                        <div className="d-flex">
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                            <Button variant="success" onClick={() => handleUpdate('email')} className="ms-2">Update</Button>
                            <Button variant="secondary" onClick={() => handleCancelEdit('email')} className="ms-2">Cancel</Button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <Form.Control type="email" name="email" value={formData.email} readOnly />
                            <Button variant="outline-primary" onClick={() => handleEdit('email')} className="ms-2">Edit</Button>
                        </div>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicAddress" className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    {editableFields.address ? (
                        <div className="d-flex">
                            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
                            <Button variant="success" onClick={() => handleUpdate('address')} className="ms-2">Update</Button>
                            <Button variant="secondary" onClick={() => handleCancelEdit('address')} className="ms-2">Cancel</Button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <Form.Control type="text" name="address" value={formData.address} readOnly />
                            <Button variant="outline-primary" onClick={() => handleEdit('address')} className="ms-2">Edit</Button>
                        </div>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicPhoneNumber" className='mb-3'>
                    <Form.Label>Phone Number</Form.Label>
                    {editableFields.phoneNumber ? (
                        <div className="d-flex">
                            <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                            <Button variant="success" onClick={() => handleUpdate('phoneNumber')} className="ms-2">Update</Button>
                            <Button variant="secondary" onClick={() => handleCancelEdit('phoneNumber')} className="ms-2">Cancel</Button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} readOnly />
                            <Button variant="outline-primary" onClick={() => handleEdit('phoneNumber')} className="ms-2">Edit</Button>
                        </div>
                    )}
                </Form.Group>

                {editableFields.changePassword && (
                    <>
                        <Form.Group controlId="formBasicOldPassword" className='mb-3'>
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicNewPassword" className='mb-3'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                        </Form.Group>
                        <div className="d-flex mb-3">
                            <Button variant="success" onClick={handlePasswordChange} className="ms-auto">Update</Button>
                            <Button variant="secondary" onClick={() => setEditableFields({ ...editableFields, changePassword: false })} className="ms-2">Cancel</Button>
                        </div>
                    </>
                )}

                {!editableFields.changePassword && (
                    <Button variant="outline-primary" onClick={() => setEditableFields({ ...editableFields, changePassword: true })} className="ms-2 mt-3 mb-3">Change Password</Button>
                )}
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default UserProfile;
