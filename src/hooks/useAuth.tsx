import { onAuthStateChanged } from 'firebase/auth';
import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setUser } from '../app/slices/AuthSlice';
import { firebaseAuth } from '../utils/FirebaseConfig';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
      const unsubsucribe = onAuthStateChanged(firebaseAuth, (currentUser)=>{
        if(!currentUser) navigate("/login");
        else{
          dispatch(
            setUser({
              uid:currentUser.uid,
              email:currentUser.email,
              name:currentUser.displayName,
            })
          );
        }
      });
      return () => unsubsucribe();
  },[dispatch,navigate]);
}

export default useAuth
