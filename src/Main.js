import React, { useEffect, useState } from 'react'
import { firestore, auth } from './firebase'
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { Container, Row, Col } from 'react-bootstrap';
import { Table, Header, Icon, Button } from 'semantic-ui-react';

function Main() {

    const navigate = useNavigate();


    // Populate the attendance data
    const [attendanceData, setAttendanceData] = useState(null);
    const [yesCount, setYesCount] = useState(null);

    const getAttendance = async () => {
        const querySnapshot = await getDocs(collection(firestore, "guests"));
        let guestMap = {
            attendingArr: [],
            not_attendingArr: [],
        }
        querySnapshot.forEach((doc) => {
            if (doc.id === "attending") {
                guestMap.attendingArr = doc.data().guestArr;
            }
            if (doc.id === "not_attending") {
                guestMap.not_attendingArr = doc.data().guestArr;
            }
        });

        // Get number of guests ATTENDING
        let attendingCount = 0
        guestMap.attendingArr.forEach((party) => {
            if (party.partyCount >= 0) {
                attendingCount += party.partyCount;
            }
            else {
                attendingCount += 1;
            }
        })

        setAttendanceData(guestMap);
        setYesCount(attendingCount);
        setIsLoading(false);
    }

        
    // Sign out current firebase user
    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            navigate('/')
        })
        .catch(error => alert(error.message));
    }


    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAttendance();
    }, [])

    if (isLoading) {
        return (
            <div>
                LOADING
            </div>
        )
    }

    else {
        return (
            <div>
                <Container className='MainContainer'>

                    <Container className='PageHeader'>
                        <Button onClick={handleSignOut}>Logout</Button>
                        <Row>
                            <Col><h1><u>Melanie Quince: RSVP Responses</u></h1></Col>
                        </Row>
                        <Row>
                            <Col><h3 style={{ marginTop: '10px' }}><span style={{ color: 'blue' }}>{yesCount}</span> out of <span style={{ color: 'blue', textDecoration: 'underline' }}>200</span> seats are taken.</h3></Col>
                        </Row>
                    </Container>

                    {/* Container for attending table */}
                    <Container style={{ marginTop: '20px' }}>
                        <Row style={{ flexDirection: 'row', display: 'flex' }}>
                            <Col>
                               <h3 style={{
                                    textAlign: 'start', borderStyle: 'solid', borderWidth: 2,
                                    borderColor: '#f2f2f2', padding: '10px', borderRadius: 5, backgroundColor: '#e6e6e6'
                                }}>Attending: <span style={{ color: 'blue' }}>{`${yesCount}`}</span>
                                </h3>
                                <Table className='TableContainer' style={{ textAlign: 'center' }} celled padded>
                                    <Table.Header className='HideOnMobile'>
                                        <Table.Row>
                                            <Table.HeaderCell singleLine>Name</Table.HeaderCell>
                                            <Table.HeaderCell>Party Size</Table.HeaderCell>
                                            <Table.HeaderCell>Email/Phone</Table.HeaderCell>
                                            <Table.HeaderCell>Is Attending?</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {attendanceData.attendingArr.map(item => (
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4' textAlign='center'>
                                                        {item.name}
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell style={{ color: 'blue', fontWeight: 'bold' }} singleLine>{item.partyCount}</Table.Cell>
                                                <Table.Cell singleLine>{item.email}</Table.Cell>
                                                <Table.Cell textAlign='center'>
                                                    <Icon color='green' name='check'></Icon>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </Col>
                        </Row>
                    </Container>

                    {/* Container for NOT attending table */}
                    <Container style={{ marginTop: '20px', paddingBottom: '20px' }}>
                        <Row style={{ flexDirection: 'row', display: 'flex' }}>
                            <Col>
                                <h3 style={{
                                    textAlign: 'start', borderStyle: 'solid', borderWidth: 2,
                                    borderColor: '#f2f2f2', padding: '10px', borderRadius: 5, backgroundColor: '#e6e6e6', width: '100%'
                                }}>NOT Attending:
                                </h3>
                                <Table className='TableContainer' style={{ textAlign: 'center' }} celled padded>
                                    <Table.Header className='HideOnMobile'>
                                        <Table.Row>
                                            <Table.HeaderCell singleLine>Name</Table.HeaderCell>
                                            <Table.HeaderCell>Party Size</Table.HeaderCell>
                                            <Table.HeaderCell>Email/Phone</Table.HeaderCell>
                                            <Table.HeaderCell>Is Attending?</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {attendanceData.not_attendingArr.map(item => (
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4' textAlign='center'>
                                                        {item.name}
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell singleLine>{'n/a'}</Table.Cell>
                                                <Table.Cell singleLine>{item.email}</Table.Cell>
                                                <Table.Cell textAlign='center'>
                                                    <Icon color='red' name='close'></Icon>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>

                            </Col>
                        </Row>
                    </Container>

                </Container>
            </div>
        )
    }


}

export default Main