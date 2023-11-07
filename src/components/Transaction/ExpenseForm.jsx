import React from "react";

function ExpenseForm()
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
                <label class="form-label">Choose Cateogary</label>
                <input type="" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">Select Payment Method</label>
                <input type="" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">Payee</label>
                <input type="text" class="form-control" />
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

export default ExpenseForm;