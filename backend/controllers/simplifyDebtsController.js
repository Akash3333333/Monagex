const Group = require('../models/Group');

// Class representing a pair of integers
class Pair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

// Comparator for ascending order sorting of pairs based on values
class AscCmp {
    compare(p1, p2) {
        return p1.value - p2.value;
    }
}

// Comparator for descending order sorting of pairs based on values
class DscCmp {
    compare(p1, p2) {
        return p2.value - p1.value;
    }
}

// Class implementing the solution algorithm
class Solution {
    constructor(group) {
        this.minQ = [];
        this.maxQ = [];
        this.debtsToUpdate = {};

        // Initialize debtsToUpdate for each member in the group
        group.members.forEach(memberId => {
            const debtorId = memberId;
            this.debtsToUpdate[debtorId] = {};

            // Initialize debtsToUpdate for each creditor (excluding oneself)
            group.members.forEach(creditorId => {
                if (!memberId.equals(creditorId)) {
                    this.debtsToUpdate[debtorId][creditorId] = 0;
                }
            });
        });
    }

    // Fills the priority queues with positive and negative amounts
    constructMinMaxQ(amount) {
        for (const userId in amount) {
            if (amount.hasOwnProperty(userId)) {
                const amountValue = amount[userId];
                if (amountValue === 0) continue;
                if (amountValue > 0) {
                    this.maxQ.push(new Pair(userId, amountValue));
                } else {
                    this.minQ.push(new Pair(userId, amountValue));
                }
            }
        }
        this.minQ.sort(new DscCmp().compare);
        this.maxQ.sort(new AscCmp().compare);
    }

    // Solves transactions until both queues are empty
    solveTransaction(group) {
        while (this.minQ.length > 0 && this.maxQ.length > 0) {
            const maxCreditEntry = this.maxQ.pop();
            const maxDebitEntry = this.minQ.pop();

            const transaction_val = maxCreditEntry.value + maxDebitEntry.value;

            let debtor = maxDebitEntry.key;
            let creditor = maxCreditEntry.key;
            let owed_amount;

            if (transaction_val === 0) {
                owed_amount = maxCreditEntry.value;
            } else if (transaction_val < 0) {
                owed_amount = maxCreditEntry.value;
                maxDebitEntry.value = transaction_val;
                this.minQ.push(maxDebitEntry);
                this.minQ.sort(new DscCmp().compare);
            } else {
                owed_amount = -maxDebitEntry.value;
                maxCreditEntry.value = transaction_val;
                this.maxQ.push(maxCreditEntry);
                this.maxQ.sort(new AscCmp().compare);
            }

            // Accumulate changes in debts
            console.log(`Person ${debtor} pays ${owed_amount} to Person ${creditor}`);

            if (this.debtsToUpdate[debtor][creditor]) {
                this.debtsToUpdate[debtor][creditor] += owed_amount;
                this.debtsToUpdate[creditor][debtor] -= owed_amount; // Update the reverse debt
            } else {
                this.debtsToUpdate[debtor][creditor] += owed_amount;
                this.debtsToUpdate[creditor][debtor] -= owed_amount; // Update the reverse debt
            }
        }
    }

    // Calculate debts using transactionHistory and simplify them
    simplifyDebts(group) {
        const n = group.members.length;

        // Initialize an object to store debts with user IDs as keys
        const amount = {};

        // Initialize the amount object with each member's ID and amount 0
        group.members.forEach(member => {
            amount[member._id] = 0;
        });

        // Calculate the net amount each member owes or is owed
        group.transactionHistory.forEach(transaction => {
            amount[transaction.from._id] -= transaction.amount;
            amount[transaction.to._id] += transaction.amount;
        });

        // Fill in both queues minQ and maxQ using amount array
        this.constructMinMaxQ(amount);

        // Solve the transaction using minQ, maxQ, and amount array
        this.solveTransaction(group);

        // Update group's owe field based on accumulated changes
        for (let debtorId in this.debtsToUpdate) {
            const debtorEntry = group.owe.find(entry => entry.user.equals(debtorId));

            for (let creditorId in this.debtsToUpdate[debtorId]) {
                const settledAmount = this.debtsToUpdate[debtorId][creditorId];

                // Update debtor's owe entry
                let debtorDebt = debtorEntry.debts.find(debt => debt.user.equals(creditorId));
                if (debtorDebt) {
                    debtorDebt.amount = settledAmount;
                }
            }
        }

        // Send email notification about debt simplification (To be implemented)
        // For sending email, you can implement a method here or call a separate utility function

        // Return simplified group object (optional)
        return group;
    }
}

// Controller function to simplify debts
exports.simplifyDebts = async (req, res) => {
    const { groupId } = req.params;
console.log(groupId)
    try {
        // Find the group by groupId
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Initialize and run the solution algorithm
        const solution = new Solution(group);
        const simplifiedGroup = solution.simplifyDebts(group);

        // Save updated group
        await simplifiedGroup.save();

        res.status(200).json({ message: 'Debts simplified successfully', group: simplifiedGroup });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
