import React, { useEffect, useState } from 'react'
import { firestore } from './firebase' 
import { getDocs, collection } from 'firebase/firestore';

function Main() {


    // Populate the attendance data
    const [attendanceData, setAttendanceData] = useState(null);
    const [yesCount, setYesCount] = useState(null);
    const [noCount, setNoCount] = useState(null);
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
            attendingCount += party.partyCount;
        })

        // Get number of guests NOT ATTENDING
        let not_attendingCount = 0
        guestMap.not_attendingArr.forEach((party) => {
            not_attendingCount += party.partyCount;
        })

        setAttendanceData(guestMap);
        setYesCount(attendingCount);
        setNoCount(not_attendingCount);
    }


    useEffect(() => {
        getAttendance();
    }, [])

    return (
        <div>
            Main
        </div>
    )
}

export default Main