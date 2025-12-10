import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase.js";
import { getDoc, collection } from "firebase/firestore";
import { useEffect } from "react";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const id = searchParams.get("id");

    useEffect(() => {
        const userCollection = collection(db, 'users');
        const verifyEmail = async () => {
            try {
                userQuerySnapshot = await getDoc(userCollection, id);
                if(userQuerySnapshot.exists()) {
                    const userData = userQuerySnapshot.data();
                    if(userData.emailVerificationToken === token) {
                        userData.verifyEmail(true);
                        alert("email verified successfully");
                    }
                }
            } catch (error) {
                
            }
        }
    }, [])
    return(
        <>
        <h1>Verifying email...</h1>
        </>
    )
}

export default VerifyEmail;