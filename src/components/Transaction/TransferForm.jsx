import React from "react";

function TransferForm()
{
    return(
        <form style={{width:"500px"}}>
            <div class="mb-3">
                <label class="form-label">Enter Current Date</label>
                <input type="date" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">Enter Amount</label>
                <input type="number" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">From</label>
                <input type="number" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">To</label>
                <input type="number" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">Yaha par image vala laga do hardik</label>
                <input type="text" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">Note</label>
                <input type="text" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default TransferForm;