import React, { useEffect, useState } from 'react';
import {  Grid } from '@mui/material';
import './Friend.css';
import SingleUser from './SingleUser';
import axios from 'axios';
import Request from './Request';
import { toast } from 'react-toastify';
import FriendList from './FriendList';


const Notifications = (props) => {

  const [allUser,setAllUser]=useState([]);
  const [request,setRequest]=useState([]);
  const [friend,setFriend]=useState([]);
  // const { id, friendId } = useParams();

  useEffect(() => {
    // Fetch the list of users from your backend when the component mounts
    axios.get(`http://localhost:5000/api/friend-requests/getfriends`)
      .then((selectedUsers) =>
      {
        const arr=selectedUsers.data.data;
        // console.log(arr);
        setAllUser(arr);
        // console.log(arr);

        for(let i=0;i<arr.length;i++)
        {
          // console.log(arr[i].email +" "+props.userEmail);
          // console.log(arr[i].friends);
          if(arr[i].email===props.userEmail)
          {
            //  console.log(arr[i].friends);
             
            setFriend(()=>
            {
              const nums=[];

              for(let k=0;k<arr[i].friends.length;k++)
              {
                
                for(let j=0;j<selectedUsers.data.data.length;j++)
                {
                  // console.log(selectedUsers.data.data[j]._id);
                  if(selectedUsers.data.data[j]._id===arr[i].friends[k])
                  {
                    nums.push(selectedUsers.data.data[j]);
                    break;
                  }
                }
              }
              return nums;
            })

            const nums=[];
            for(let k=0;k<arr[i].requests.length;k++)
            {
              for(let j=0;j<selectedUsers.data.data.length;j++)
              {
                if(selectedUsers.data.data[j]._id===arr[i].requests[k])
                {
                  nums.push(selectedUsers.data.data[j]);
                  break;
                }
              }
            }

            setRequest((prev)=>
            {
              // console.log(nums);
              return nums;
            })
          }
        }
        toast('Friend request accepted successfully', { position: 'top-center' });
      })
      .catch(error => console.error('Error fetching users:', error));
      
      // Show error notification
      toast.error("Error in sending Friend Request", { position: 'top-center' });
  }, [props.userEmail]);

  // console.log(request);

  return (
    <div className="friend-container">
      {/* <Grid container spacing={2} padding={2} className='grid-container'>
        {friend.map((friend) => (
          <SingleUser userEmail={props.userEmail} setSelectedUsers={props.setSelectedUsers} friend={friend} />
        ))}
      </Grid> */}
      <FriendList userEmail={props.userEmail}/>
      <h1>Total User</h1>
      <Grid container spacing={2} padding={2} className='grid-container'>
        {allUser.map((friend) => (
          <SingleUser userEmail={props.userEmail} setSelectedUsers={props.setSelectedUsers} friend={friend} />
        ))}
      </Grid>
      <h1>Request</h1>
      <Grid container spacing={2} padding={2} className='grid-container'>
        {request.map((friend) => (
          <Request userEmail={props.userEmail} setSelectedUsers={props.setSelectedUsers} friend={friend} />
        ))}
      </Grid>
    </div>
  );
};

export default Notifications;