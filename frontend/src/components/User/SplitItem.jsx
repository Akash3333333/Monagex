import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SplitItem.css';
import axios from 'axios';
import UserNav from './UserNav';
import Footer from '../Footer';

function SplitItem() {
  const id = useParams().gid;
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [grpName, setGrpName] = useState('');
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.user && response.data.user._id) {
          setUserId(response.data.user._id);
        } else {
          console.error('User ID not available in response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSplit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/split/split/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount, id: userId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to split amount');
      }
  
      const data = await response.json();
      console.log(data.message);
      toast('Split successful', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
      // Redirect or navigate on successful split
      navigate('/split');
    } catch (error) {
      console.error('Error splitting amount:', error);
      toast.error('Error splitting amount', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    }
  };
  const handleSettle = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/split/settle/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount, id: userId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to settle amount');
      }
  
      const data = await response.json();
      console.log(data.message);
      toast('Settle successful', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
  
      // Redirect or navigate on successful settle
      navigate('/split');
    } catch (error) {
      console.error('Error settling amount:', error);
      toast.error('Error settling amount', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    }
  };
  

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/split/getmember', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }

        const data = await response.json();
        console.log('Member Data:', data.members);
        setMembers(data.members);
        setGrpName(data.name);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchMember();
  }, [id]);

  return (
    <>
        <UserNav/>
    <div className='container'>
      <h1 className='heading'>{grpName}</h1>
      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owe</th>
            <th>Lent</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
              let x = 0;
              let y = 0;
              
              for (let i = 0; i < member.groups.length; i++) {
                  if (member.groups[i].group === id) {
                x = member.groups[i].owe;
                y = member.groups[i].lent;
                break;
            }
        }

        return (
            <tr key={member._id}>
                <td>{member.username}</td>
                <td>{x}</td>
                <td>{y}</td>
              </tr>
            );
        })}
        </tbody>
      </table>

      {/* Additional code for input and buttons */}
      <div className="input-section">
        <button className="split-button" onClick={() => handleSplit()}>
          Split
        </button>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          />
        <button className="settle-button" onClick={() => handleSettle()}>
          Settle
        </button>
      </div>
    </div>
      <Footer className='footer1' style={{ position:'absolute' , bottom: '0' }} />
          </>
  );
}

export default SplitItem;
