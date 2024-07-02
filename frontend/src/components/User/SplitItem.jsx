import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Box,
  Switch, // Import Switch component from Material-UI
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Refresh as RefreshIcon } from "@mui/icons-material"; // Import RefreshIcon from Material-UI/icons
import "./SplitItem.css";
import UserNav from "./UserNav";

const SplitItem = () => {
  const { groupId } = useParams();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [yourShare, setYourShare] = useState("");
  const [borrowers, setBorrowers] = useState([{ user: "", amount: "" }]);
  const [members, setMembers] = useState([]);
  const [balancesData, setBalancesData] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isSplitMode, setIsSplitMode] = useState(true); // State for split/settle mode
  const [userId, setUserId] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Separate loading state for user profile
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        const response = await axios.get('https://monagex-backend.vercel.app/api/profile/getProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserId(response.data.user._id);
      } catch (error) {
        setError('Error fetching user profile');
      } finally {
        setLoadingUser(false); // Update loading state after fetching user profile
      }
    };

    fetchUserProfile();
  }, []);


  useEffect(() => {
    const fetchOweData = async () => {
      if (!userId) return;
      const token = localStorage.getItem("jwt");

      try {
        const response = await axios.post(
          `https://monagex-backend.vercel.app/api/balance/owe`,
          {
            id: userId,
            groupId: groupId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalancesData(response.data);
      } catch (error) {
        console.error("Error fetching balances data:", error);
        toast.error("Error fetching balances data:");
      }
    };

    fetchOweData();
  }, [userId, groupId]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const response = await axios.get(
          `https://monagex-backend.vercel.app/api/transactionHistory/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setTransactionHistory(response.data);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        toast.error("Error fetching transaction history:");
      }
    };

    fetchTransactionHistory();
  }, [groupId]);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      if (!userId) return;
      const token = localStorage.getItem("jwt");
      try {
        const response = await axios.post(
          "https://monagex-backend.vercel.app/api/groups/getMembers",
          {
            id: groupId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const filteredMembers = response.data.members.filter(
          (member) => member.id !== userId
        );
        setMembers(filteredMembers);
      } catch (error) {
        console.error("Error fetching group members:", error);
        toast.error("Failed to fetch group members");
      }
    };

    fetchGroupMembers();
  }, [userId, groupId]);

  const handleBorrowerChange = (index, value, property) => {
    const updatedBorrowers = [...borrowers];
    updatedBorrowers[index][property] = value;
    setBorrowers(updatedBorrowers);
  };

  const handleAddBorrower = () => {
    setBorrowers([...borrowers, { user: "", amount: "" }]);
  };

  const handleSplit = async () => {
    if (!userId) return;
    const token = localStorage.getItem("jwt");
    try {
      const borrowersData = {};
      borrowers.forEach((borrower) => {
        if (borrower.user && borrower.amount) {
          borrowersData[borrower.user] = parseFloat(borrower.amount);
        }
      });

      const response = await axios.post(
        `https://monagex-backend.vercel.app/api/split/${groupId}`,
        {
          description: description,
          borrowers: borrowersData,
          id: userId,
          amount,
          yourShare,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });

      // Reset form after successful split
      setDescription("");
      setYourShare("");
      setAmount("");
      setBorrowers([{ user: "", amount: "" }]);
    } catch (error) {
      console.error("Error splitting debts:", error);
      toast.error("Failed to split debts");
    }
  };

  const handleSettle = async () => {
    if (!userId) return;
    const token = localStorage.getItem("jwt");
    try {
      const lendersData = {};
      borrowers.forEach((borrower) => {
        if (borrower.user && borrower.amount) {
          lendersData[borrower.user] = parseFloat(borrower.amount);
        }
      });

      const response = await axios.post(
        `https://monagex-backend.vercel.app/api/settle/${groupId}`,
        {
          description: description,
          lenders: lendersData,
          id: userId,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });

      // Reset form after successful settle
      setDescription("");
      setAmount("");
      setBorrowers([{ user: "", amount: "" }]);
    } catch (error) {
      console.error("Error settling debts:", error);
      toast.error("Failed to settle debts");
    }
  };

  const handleSimplifyDebts = async () => {
    if (!userId || !groupId) return;
    const token = localStorage.getItem("jwt");

    try {
      const response = await axios.post(
        `https://monagex-backend.vercel.app/api/simplifyDebts/${groupId}`,
        {
          groupId: groupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Debts simplified successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error("Error toggling simplify debts:", error);
      toast.error("Failed to toggle simplify debts");
    }
  };

  const getBackgroundColor = (amount) => {
    if (amount > 0) {
      return "lightgreen";
    } else if (amount < 0) {
      return "lightcoral";
    } else {
      return "yellow";
    }
  };
  if (loadingUser) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching user profile fails
  }
  return (
    <>
    <UserNav  />
    <div className="root">

      <Container
        maxWidth="lg"
        style={{
          marginTop: "1.5rem",
          backgroundImage: 'url("/images/cbg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid container spacing={3}>
          {/* Split/Settle Card */}
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ textAlign: "center" }}
                >
                  Split/Settle
                </Typography>
                
<Box display="flex" alignItems="center" mb={2}>
  <Typography>Split</Typography>
  <Switch
    checked={!isSplitMode}
    onChange={() => setIsSplitMode((prev) => !prev)}
    color="primary"
  />
  <Typography>Settle</Typography>
</Box>

                
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    
{isSplitMode && (
  <TextField
    fullWidth
    margin="normal"
    label="Your Share"
    type="number"
    value={yourShare}
    onChange={(e) => setYourShare(e.target.value)}
  />
)}

                    {borrowers.map((borrower, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={6}>
                          <FormControl fullWidth margin="normal">
                            <InputLabel>{isSplitMode?'Borrower':'Lender'}</InputLabel>
                            <Select
                              value={borrower.user}
                              onChange={(e) =>
                                handleBorrowerChange(
                                  index,
                                  e.target.value,
                                  "user"
                                )
                              }
                            >
                              {members.map((member) => (
                                <MenuItem key={member.id} value={member.id}>
                                  {member.username}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            margin="normal"
                            label="Amount"
                            type="number"
                            value={borrower.amount}
                            onChange={(e) =>
                              handleBorrowerChange(
                                index,
                                e.target.value,
                                "amount"
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={handleAddBorrower}
                    >
                      {isSplitMode?'Add Borrower':'Add Lender'}
                    </Button>
                    <Divider style={{ margin: "2rem 0" }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
<Button
  variant="contained"
  color={isSplitMode ? 'primary' : 'secondary'}
  fullWidth
  onClick={isSplitMode ? handleSplit : handleSettle}
  style={{ marginTop: "1rem",marginLeft:"8rem"}}
>
  {isSplitMode ? "Split" : "Settle"}
</Button>

                      </Grid>
                    </Grid>
                  </>
                
              </CardContent>
            </Card>
          </Grid>

          {/* Balances Card */}
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ textAlign: "center", marginBottom: "1rem" }}
                  >
                    Balances
                  </Typography>

                  <Button
                          // fullWidth
                          variant="contained"
                          onClick={handleSimplifyDebts}
                          color="primary"
                          style={{ textAlign: "center", marginBottom: "1rem" , padding:'0.4rem' , borderRadius:'1.2rem' , width:'40%' }}
                        >SmartSplit
                  </Button>
                </Box>

                {/* Display balancesData */}
                <div>
                  {balancesData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: "1rem",
                        backgroundColor: "#f9f9f9",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {Object.entries(item).map(([key, value]) => (
                        <Typography
                          variant="body1"
                          key={key}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.5rem 1rem",
                          }}
                        >
                          <span>{key}</span>
                          <span
                            style={{
                              backgroundColor: getBackgroundColor(value),
                              borderRadius: "4px",
                              padding: "0.5rem 1rem",
                            }}
                          >
                            {"₹" + value}
                          </span>
                        </Typography>
                      ))}
                      <Divider style={{ margin: "0.5rem 0" }} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Transaction History Card */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Transaction History
                </Typography>
                {transactionHistory.map((transaction) => (
                  <Box
                    key={transaction._id}
                    mb={2}
                    p={2}
                    style={{
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Description: {transaction.description}
                    </Typography>
                    <Typography variant="body1">
                      Amount: ₹{transaction.amount}
                    </Typography>
                    <Typography variant="body2">
                      Date: {transaction.createdAt}
                    </Typography>
                    <Typography variant="body3">
                      Members: {transaction.from + " ->"} {transaction.to}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
</>
  );
};
export default SplitItem;
